FROM node:12.18

COPY build user-service/build/
COPY node_modules user-service/node_modules/
COPY pacific-destiny-281218-dc9e1411a6d4.json user-service/

CMD ['npm', 'run', 'deploy', '--prefix', 'user-service/build']