import requests
import pandas as pd
import json


# ? xD
URL = "http://localhost:8000/api/v1/sales/"
FILE_PATH = 'samples.json'
NUM_OF_SAMPLES = 30


def get_samples():
    with open(FILE_PATH, 'r') as f:
        data = json.load(f)
        return data['samples'][:NUM_OF_SAMPLES]


def post_sale(sale):
    req = requests.post(
        url=URL,
        data=json.dumps(sale, indent=2),
        headers={
            'Content-Type': 'application/json',
        }
    )
    if not req.ok:
        print(req)
    return req


def post_sales(sales):
    for sale in sales:
        post_sale(sale)


def get_sales():
    req = requests.get(url=URL)
    return req.json()


if __name__ == '__main__':
    samples = get_samples()
    print(json.dumps(samples, indent=4))
