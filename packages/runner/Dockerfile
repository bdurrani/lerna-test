FROM node:lts-buster-slim

RUN apt-get update \
  && npm i -g lerna

VOLUME /app
WORKDIR /app

CMD ["npm", "run", "start:runner"]