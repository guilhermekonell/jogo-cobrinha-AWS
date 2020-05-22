FROM node:10

WORKDIR /src

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080
CMD ["node", "src/server.js"]