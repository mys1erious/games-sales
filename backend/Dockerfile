FROM python:3.9-slim-buster

ENV PYTHONBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings.docker
ENV DJANGO_SECRET_KEY=_-3i^-#f$$%myp^#!xtp-9dsgc7^yhin#$$q34$$_4vg4e3mf-+
ENV DATABASE_NAME=postgres
ENV DATABASE_USER=postgres
ENV DATABASE_PASSWORD=postgres

WORKDIR /games_sales_backend

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
