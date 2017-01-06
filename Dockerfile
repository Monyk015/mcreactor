FROM node:boron
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install -g yarn
RUN npm install -g nodemon
RUN yarn
WORKDIR /app/vue
RUN yarn
WORKDIR /app
EXPOSE 3000