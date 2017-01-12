FROM node:boron
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install -g nodemon
RUN npm install -g yarn
RUN yarn
EXPOSE 3000