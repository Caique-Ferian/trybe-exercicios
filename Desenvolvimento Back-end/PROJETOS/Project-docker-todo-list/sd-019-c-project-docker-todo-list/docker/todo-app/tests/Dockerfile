FROM mjgargani/puppeteer:trybe1.0
WORKDIR /tests
COPY package*.json ./
RUN npm install
COPY . .
ADD node_modules.tar.gz .
ENTRYPOINT [ "npm" , "test"]