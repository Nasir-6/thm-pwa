FROM node:16

WORKDIR /server

COPY package.json package-lock.json ./

RUN npm install

COPY tsconfig.json ./

COPY ./src ./src

RUN npm run build

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]