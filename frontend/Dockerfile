FROM node:18.7.0-alpine

WORKDIR /games_sales_frontend

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm run build
CMD ["npm", "start"]
