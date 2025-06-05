# Etapa de construcción
FROM node:22-alpine AS builder

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de configuración primero
COPY package.json pnpm-lock.yaml* ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY eslint.config.js ./
COPY components.json ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente y archivos públicos
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# Verificar estructura de archivos
RUN ls -la && ls -la src/

# Construir la aplicación
RUN pnpm run build

EXPOSE 5173

# Comando para ejecutar cuando se inicie el contenedor
CMD ["pnpm", "run", "preview"]