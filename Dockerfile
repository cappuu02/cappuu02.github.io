# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production
FROM nginx:stable-alpine
# Vite usa la cartella 'dist'
COPY --from=build /app/dist /usr/share/nginx/html
# Configurazione per routing React/Vite
RUN echo "server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf
EXPOSE 80