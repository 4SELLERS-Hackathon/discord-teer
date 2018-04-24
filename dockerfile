FROM arm32v7/node:8.11.1

ADD /src /src

WORKDIR /src

RUN npm install

ENV NODE_ENV=production

CMD ["npm", "start"]