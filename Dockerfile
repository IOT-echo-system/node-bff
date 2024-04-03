FROM node:19-alpine
WORKDIR /app
COPY package* ./
COPY node_modules ./node_modules
COPY dist ./dist
EXPOSE 3001
CMD [ "npm", "start" ]
