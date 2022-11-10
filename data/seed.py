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
        'username': USERNAME,
        'password': PASSWORD,
        'grant_type': 'password',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }

    req = requests.post(
        url=URL+'/auth/token/',
        data=json.dumps(data),
        headers={'Content-Type': 'application/json'}
    )

    return json.loads(req.text)['access_token']


DOMAIN = 'PA'

if DOMAIN == 'localhost':
    URL = get_env_var('BASE_API_URL_LOCAL')
    USERNAME = get_env_var('ADMIN_EMAIL_LOCAL')
    PASSWORD = get_env_var('ADMIN_PASSWORD_LOCAL')
    CLIENT_ID = get_env_var('DJANGO_CLIENT_ID_LOCAL')
    CLIENT_SECRET = get_env_var('DJANGO_CLIENT_SECRET_LOCAL')
elif DOMAIN == 'PA':
    URL = get_env_var('BASE_API_URL_PA')
    USERNAME = get_env_var('ADMIN_EMAIL_PA')
    PASSWORD = get_env_var('ADMIN_PASSWORD_PA')
    CLIENT_ID = get_env_var('DJANGO_CLIENT_ID_PA')
    CLIENT_SECRET = get_env_var('DJANGO_CLIENT_SECRET_PA')

FILE_PATH = 'samples.json'
SAMPLES_FROM = 10
SAMPLES_TO = 1000
ACCESS_TOKEN = get_access_token()


def get_samples():
    with open(FILE_PATH, 'r') as f:
        data = json.load(f)
        return data['samples'][SAMPLES_FROM:SAMPLES_TO]


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
