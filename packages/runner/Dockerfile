FROM node:lts-buster-slim

RUN apt-get update \
  && apt-get install -y procps \
  && npm i -g lerna

VOLUME /app
WORKDIR /app

CMD ["npm", "run", "start:runner"]