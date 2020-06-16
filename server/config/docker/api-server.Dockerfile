FROM clutchcanada/development:api

# Install node modules and remove npm credential file
WORKDIR /tmp
COPY package.json /tmp/
COPY package-lock.json /tmp/
RUN npm install
RUN rm -f /root/.npmrc

# Copy the application and node modules to '/usr/src/app/'
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

# Set environment variables
ENV CLUTCH_DOCKER true
ENV NODE_ENV production

CMD [ "node", "./src/server.js" ]
EXPOSE 4000
