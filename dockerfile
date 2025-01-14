FROM node:20-alpine
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=/api
WORKDIR /home/next
COPY . .
RUN yarn install
# Исправление строки в файле index.d.ts
RUN sed -i 's/export type CategoryCollectionParams = ConstructorParameters<typeof Collection<Category>>;/export type CategoryCollectionParams = ConstructorParameters<Collection<Category>>;/g' ./node_modules/grapesjs/dist/index.d.ts
RUN yarn build
