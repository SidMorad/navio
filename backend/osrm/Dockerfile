FROM node:6.9.5-alpine
MAINTAINER Sid <SidMorad@users.noreply.github.com>

RUN mkdir -p /opt/osrm
COPY app.js /opt/osrm/app.js
COPY package.json /opt/osrm/package.json

# change working directory and install production dependencies
WORKDIR /opt/osrm

RUN apk update && apk upgrade \
    && npm install --quiet

EXPOSE 3000
CMD ["npm", "start"]