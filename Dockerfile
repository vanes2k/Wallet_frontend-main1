FROM node:latest as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build

FROM node:lts-alpine
COPY --from=build /app /app/result_build
