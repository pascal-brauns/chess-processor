FROM node:16.13-alpine3.13
WORKDIR /app
ADD package*.json .
RUN npm install
ADD . .
RUN npm run build
RUN npm run lint
RUN npm run test
RUN rm -rf node_modules
RUN mkdir /mount
CMD cp -r . /mount