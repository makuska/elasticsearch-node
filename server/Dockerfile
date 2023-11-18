FROM node:20.8.1

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN chmod +x /app/start-server.sh

EXPOSE 8080

CMD ["sh", "/app/start-server.sh"]