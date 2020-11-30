FROM node:lts-buster-slim as modules

RUN apt-get update \
  && mkdir /update-service

COPY package*.json /update-service/
WORKDIR /update-service
RUN npm ci

FROM node:lts-buster-slim

RUN apt-get update \
  && apt-get install git -y \
  && mkdir /update-service

VOLUME /app

COPY --from=modules /update-service/node_modules /update-service/node_modules 