# -- BUILD --
FROM node:16 as build

WORKDIR /app

COPY package*.json .
COPY . .

RUN npm ci
RUN npm run build

# -- RELEASE --
FROM nginx:stable-alpine as release

COPY --from=build /app/build /usr/share/nginx/html
# copy .env.example as .env to the relase build
COPY --from=build /app/.env.example /usr/share/nginx/html/.env
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf

RUN apk add --update nodejs
RUN apk add --update npm
RUN npm i -g runtime-env-cra@0.2.0

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]