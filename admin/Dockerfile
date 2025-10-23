FROM node:22-alpine AS build

ARG VITE_GOOGLE_API_KEY 

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN echo "VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY" > .env

RUN npm  run build



FROM nginx:1.27.0

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf