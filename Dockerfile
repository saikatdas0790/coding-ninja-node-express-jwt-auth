# Use the node LTS image
FROM node:lts

# Create and change to the app directory.
WORKDIR /usr/src/app

ARG A_DB_USER
ENV DB_USER=${A_DB_USER}
ARG A_DB_PASS
ENV DB_PASS=${A_DB_PASS}
ARG A_DB_HOST
ENV DB_HOST=${A_DB_HOST}
ARG A_DB_NAME
ENV DB_NAME=${A_DB_NAME}
ARG A_JWT_SIGNING_SECRET
ENV JWT_SIGNING_SECRET=${A_JWT_SIGNING_SECRET}

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install all dependencies.
RUN npm install

# Copy local code to the container image.
COPY . ./

# Build the sapper app on container startup.
RUN [ "npm", "run", "build"]

# Run the sapper app on container startup.
CMD [ "npm", "start" ]