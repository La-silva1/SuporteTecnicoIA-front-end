## --- ETAPA 1: BUILD DO EXPO WEB ---
FROM node:20-alpine AS build

WORKDIR /app

# Copia dependências e instala
COPY package.json package-lock.json ./
# ------------------------------------------------------------------
# MUDANÇA NECESSÁRIA: Adicionar --legacy-peer-deps para resolver o ERESOLVE
# ------------------------------------------------------------------
RUN npm install --legacy-peer-deps 
# ------------------------------------------------------------------

# Copia o restante dos arquivos e executa o build para web
COPY . .
RUN npx expo export:web

# ... (restante do Dockerfile)

# --- ETAPA 2: RUNTIME (Servindo com Nginx) ---
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos compilados (sua pasta 'web-build' está aqui)
COPY --from=build /app/web-build /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]