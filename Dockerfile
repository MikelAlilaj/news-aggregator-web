FROM node:18

WORKDIR /app/news-aggregator 

COPY  package.json  package-lock.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]