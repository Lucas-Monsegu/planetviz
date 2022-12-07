import schedule
import time
import temperatureW
import os
import getpass
from crontab import CronTab
from utils.alerter import TryAlert


@TryAlert
def main():
    import os
    dirname, filename = os.path.split(os.path.abspath(__file__))
    cron = CronTab(user=getpass.getuser())
    daily = cron.new(command='python3 ' + '/'.join([dirname, 'daily.py']))
    daily.day.every(1)

    monthly = cron.new(command='python3 ' + '/'.join([dirname, 'monthly.py']))
    monthly.months.every(1)

    yearly = cron.new(command='python3 ' + '/'.join([dirname, 'yearly.py']))
    yearly.months.every(12)

    dataCollection = cron.new(
        command='python3 ' + '/'.join([dirname, 'data_collection.py']))
    dataCollection.hour.on(10, 14, 16)
    cron.write()


if __name__ == "__main__":
    main()
