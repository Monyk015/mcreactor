FROM node:boron
WORKDIR /usr/src/app
RUN npm install -g yarn
RUN npm install -g nodemon
RUN yarn
WORKDIR /usr/src/app/vue
RUN yarn
WORKDIR /usr/src/app/
EXPOSE 3000