FROM node:14
WORKDIR /usr/src/survey-pet-api
COPY ./package.json .
RUN npm install --only=prod
