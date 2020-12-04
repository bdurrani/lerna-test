FROM node:lts-buster-slim

RUN apt-get update \
  && apt-get install -y procps

WORKDIR /app

CMD ["npm", "run", "start:api"]