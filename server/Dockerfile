# Usa una imagen oficial de Node.js como base
FROM node:22-alpine AS builder

# Instalar pnpm
# RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
# COPY package.json pnpm-lock.yaml ./
COPY package.json ./

# Instala las dependencias de la app
# RUN pnpm install --frozen-lockfile
RUN npm install

# Copia el resto de los archivos de la app
COPY . .

# Expone el puerto en el que corre la app (ajusta si usas otro)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "start"]
