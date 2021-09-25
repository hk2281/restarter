FROM node:alpine
ENV NODE_ENV=production
WORKDIR /home/next
COPY . .
RUN yarn install
RUN yarn build
