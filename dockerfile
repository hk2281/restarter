FROM node:16-alpine
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=/api
WORKDIR /home/next
COPY . .
RUN yarn install
RUN yarn build
