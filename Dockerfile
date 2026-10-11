# Strona ctrlzstudio.pl: statyczny build Astro podawany przez Caddy (deploy/Caddyfile, port 8080).
# Buduje GitHub Actions (.github/workflows/obraz.yml). Treści: src/data/panel-export.json z repo;
# świeże z panelu — gdy build dostanie PANEL_EXPORT_URL i sekret (publikacja z panelu, krok 4 etapu 9).
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2.11-alpine
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 8080
