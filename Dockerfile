FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund --production=false && npm cache clean --force

COPY . .

EXPOSE 8081

CMD ["npm", "run", "web"]