FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY aaryans-doge.js .
COPY .env .
CMD [ "node", "aaryans-doge.js" ]