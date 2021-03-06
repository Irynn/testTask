# base image
FROM cypress/base:8
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install cypress
RUN npm install cypress@3.1.0

# copy cypress files and folders
COPY cypress /usr/src/app/cypress
COPY cypress.json /usr/src/app/cypress.json

# confirm the cypress install
RUN ./node_modules/.bin/cypress verify