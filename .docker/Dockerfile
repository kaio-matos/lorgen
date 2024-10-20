FROM node:20

RUN apt-get update; apt-get install -y fontconfig
RUN fc-cache -f -v

RUN corepack enable pnpm
RUN corepack use pnpm@9.7.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
CMD [ "cat" ]
