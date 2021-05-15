FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
COPY .env .
RUN npm install
COPY aaryans-doge.js .
CMD [ "node", "aaryans-doge.js" ]