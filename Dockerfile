ARG VARIANT="22-bookworm"
FROM node:${VARIANT} as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && npm install -g typescript

COPY ./ .
RUN npm run build

FROM node:${VARIANT} as prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./ 
COPY --from=build /usr/src/app/node_modules ./node_modules
RUN mkdir -p ./database
COPY --from=build /usr/src/app/dist/ ./dist

ENV TZ Europe/London

EXPOSE 3000/tcp

CMD ["node", "."]
