import os
import requests
import pandas as pd
import json

from dotenv import load_dotenv


load_dotenv()
def get_env_var(var_name):
    try:
        return os.getenv(var_name)
    except KeyError:
        error_msg = f'Set the {var_name} environment variable'
        raise KeyError(error_msg)


def get_access_token():
    data = {
        'username': get_env_var('ADMIN_EMAIL'),
        'password': get_env_var('ADMIN_PASSWORD'),
        'grant_type': 'password',
        'client_id': get_env_var('DJANGO_CLIENT_ID'),
        'client_secret': get_env_var('DJANGO_CLIENT_SECRET')
    }

    req = requests.post(
        url=URL+'/auth/token/',
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    return json.loads(req.text)['access_token']


URL = get_env_var('BASE_API_URL')
FILE_PATH = 'samples.json'
NUM_OF_SAMPLES = 100
ACCESS_TOKEN = get_access_token()


def get_samples():
    with open(FILE_PATH, 'r') as f:
        data = json.load(f)
        return data['samples'][:NUM_OF_SAMPLES]


def post_sale(sale):
    req = requests.post(
        url=URL+'/sales/',
        data=json.dumps(sale, indent=2),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {ACCESS_TOKEN}'
        }
    )
    if not req.ok:
        print(f'{req}: {sale["game"]["name"]}')
    return req


def post_sales(sales):
    for sale in sales:
        post_sale(sale)


def get_sales():
    req = requests.get(url=URL)
    return req.json()


if __name__ == '__main__':
    samples = get_samples()
    post_sales(samples)
