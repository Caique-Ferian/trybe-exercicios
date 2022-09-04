FROM node:14-alpine
WORKDIR /front-end
COPY package*.json ./
RUN npm install
COPY . .
ADD node_modules.tar.gz .
EXPOSE 3000
ENTRYPOINT [ "npm" , "start"]