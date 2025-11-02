# FROM baseImage
# it will download latest verion
FROM node:22.11.0

# set the working directory(optional)
# all commands will bd executed inside this directory
WORKDIR /app

# COPY . .
# FIRST dot represnt source, from where it copies all files and folder
# second dot represent destination where it pastes the copied files

# COPY server.js /app ->Example

COPY . .
# copy everything from here to /app

# compile type command (builds the image)
RUN npm install
# it will install all the dependencies from package.json

EXPOSE 3000

# runs the containerz
CMD ["npm", "run", "dev"]