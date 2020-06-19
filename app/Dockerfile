FROM node:12.16-alpine

RUN mkdir -p /usr/src/fluance/app

WORKDIR /usr/src/fluance/app

ENV PATH /usr/src/fluance/app/node_modules/.bin:$PATH

COPY . /usr/src/fluance/app

RUN npm install --silent

RUN npm install -g @vue/cli@4.4.4 --silent

CMD ["npm", "run", "serve"]