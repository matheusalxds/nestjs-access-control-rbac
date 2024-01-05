#FROM node:18-alpine AS builder
#WORKDIR /app
#COPY . .
#RUN yarn install
#RUN yarn build
#
#FROM node:18-alpine AS final
#WORKDIR /app
#COPY --from=builder ./app/dist ./dist
#COPY package.json .
#COPY yarn.lock .
#RUN yarn install --production
#CMD [ "yarn", "start:prod" ]

FROM node:18-alpine As development
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3333
ENV NODE_ENV=${PORT}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD [ "yarn", "start:prod" ]
