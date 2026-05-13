# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve
FROM nginx:stable-alpine

# Use a shell command to find the correct folder and move it to nginx html
# This is safer than the wildcard COPY which can sometimes fail in certain environments
COPY --from=build /app/dist /tmp/dist
RUN find /tmp/dist -name "browser" -type d -exec cp -r {}/. /usr/share/nginx/html/ \; || \
    cp -r /tmp/dist/*/. /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
