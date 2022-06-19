FROM node:16.13.2

ARG REACT_APP_ENVIRONMENT=local
ARG REACT_APP_SENTRY_DSN=''
ARG REACT_APP_API_URL=https://api.soul-network.com

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

RUN REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT REACT_APP_SENTRY_DSN=$REACT_APP_SENTRY_DSN REACT_APP_API_URL=$REACT_APP_API_URL npm run build
EXPOSE 3001
ENTRYPOINT ["npm", "run", "serve"]
