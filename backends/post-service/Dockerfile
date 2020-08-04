FROM node:12.18

COPY build post-service/build/
COPY node_modules post-service/node_modules/
COPY pacific-destiny-281218-dc9e1411a6d4.json post-service/

CMD npm run deploy --prefix post-service/build