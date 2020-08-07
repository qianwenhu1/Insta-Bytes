FROM node:12.18

COPY build post-service/build/
COPY node_modules post-service/node_modules/

CMD npm run deploy --prefix post-service/build