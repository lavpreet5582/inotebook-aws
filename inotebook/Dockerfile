# # Use the official Node.js image as the base image
# FROM node:14-alpine as nodeWork

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files to the container
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the frontend files to the container
# COPY . .

# # Build the production-ready React app
# RUN npm run build

# FROM nginx:1.25.1-alpine

# COPY --from=nodeWork /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]




# new file  


# Use an official Node.js runtime as the base image
# FROM node:14-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the React app for production
# RUN npm run build

# # Set environment variable for React
# ENV NODE_ENV=production

# # Expose port 3000 (or the port your React app runs on)
# EXPOSE 3000

# # Command to start the React app
# CMD ["npm", "start"]



FROM node:16-alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html