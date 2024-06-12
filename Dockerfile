FROM node:20-alpine

COPY * ./

# install app dependencies
RUN apk add curl
RUN npm install

# install app
COPY index.js /

# final configuration
EXPOSE 3000
CMD ["node", "index.js"]
