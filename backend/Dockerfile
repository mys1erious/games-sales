FROM python:3.9-slim-buster

ENV PYTHONBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings.local

WORKDIR /games_sales_backend

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
