FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY src/schema.prisma src/
RUN yarn codegen:prisma

# Bundle app source
COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "node", "dist/src/main.js" ]