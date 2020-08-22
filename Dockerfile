FROM node:alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install && npm install -g typescript 
COPY . .
RUN tsc
CMD ["node", "./dist/index.js"]