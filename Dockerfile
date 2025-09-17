# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
# install build tools needed for some native modules (fsevents, node-gyp, etc.)
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
	&& yarn --silent \
	&& apk del .build-deps

# add app
COPY . ./

# start app
CMD ["yarn", "start"]