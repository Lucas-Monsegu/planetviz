from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth
import subprocess
import datetime
import os
import dateutil.parser
import sys

backupFileName = datetime.datetime.now().strftime('%Y-%m-%d') + \
    '_planetviz.archive'
res = subprocess.call(['mongodump', '--db', 'planetvizDB',
                       '--gzip', '--archive'+'='+backupFileName])
if (res != 0):
    print('Error while MongoDump', file=sys.stderr)
    exit(res)
gauth = GoogleAuth()
# Try to load saved client credentials
gauth.LoadCredentialsFile("mycreds.txt")
if gauth.credentials is None:
    # Authenticate if they're not there
    gauth.LocalWebserverAuth()
elif gauth.access_token_expired:
    # Refresh them if expired
    gauth.Refresh()
else:
    # Initialize the saved creds
    gauth.Authorize()
# Save the current credentials to a file
gauth.SaveCredentialsFile("mycreds.txt")

drive = GoogleDrive(gauth)


backup = drive.CreateFile()
backup.SetContentFile(backupFileName)
backup.Upload()

file_list = drive.ListFile(
    {'q': "'root' in parents and trashed=false"}).GetList()
previous_dump = []
for file1 in file_list:
    if file1['title'].endswith('_planetviz.archive'):
        file1.FetchMetadata()
        previous_dump.append(file1)
toDelete = (None, None)
if len(previous_dump) < 3:
    exit(0)
for dump in previous_dump:
    date = dateutil.parser.parse(dump['createdDate'])
    if toDelete[0] == None or date < toDelete[1]:
        toDelete = (dump, date)
toDelete[0].Delete()
os.remove(backupFileName)
