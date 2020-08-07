FROM node:12.18

COPY build user-service/build/
COPY node_modules user-service/node_modules/

CMD npm run deploy --prefix user-service/build