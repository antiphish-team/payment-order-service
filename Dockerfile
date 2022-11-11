FROM node:16
ARG flag

# Adding flag
RUN echo ${flag} >> /etc/passwd
RUN chown node:node /etc/passwd

# Create app directory
RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
WORKDIR /usr/src/app

USER node

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]