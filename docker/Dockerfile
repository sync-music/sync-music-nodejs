FROM node:13.3-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /home/node/

COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build; exit 0

CMD ["yarn", "start"]

EXPOSE 80
