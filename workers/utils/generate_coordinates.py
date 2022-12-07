import requests
import json


result = {}
number_of_good_coordinates = 0
parsed = {}
with open('coordinates_to_country_code.json', 'r') as f:
    parsed = json.load(f)
new = {}
for key, value in parsed.items():
    if value not in new.keys():
        new[value] = []
    new[value].append(key)
with open('coordinates_to_country_code_v2.json', 'w') as f:
    json.dump(new, f)

exit()
for lamb in range(-90, 90, 5):
    for phi in range(-90, 90, 5):
        r = requests.get(
            f'https://api.opencagedata.com/geocode/v1/json?key=92369c2946df4fae82dd4132059eae78&q={phi} {lamb}&pretty=1')
        j = json.loads(r.text)
        if not j.get('results') or not j['results'][0].get('components') or not \
                j['results'][0]['components'].get('country_code'):
            # if j.get('results'):
                # print('bug:', json.dumps(j, indent=4, sort_keys=True))
            continue
        number_of_good_coordinates += 1
        result[f'{lamb} {phi}'] = j['results'][0]['components']['country_code']
        print(number_of_good_coordinates, f'{lamb}, {phi}')
with open('coordinates_to_country_code.json', 'w') as f:
    json.dump(result, f)
