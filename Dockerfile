FROM oven/bun:1.3.14-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build:registry

ENV REGISTRY_HOST=0.0.0.0
ENV REGISTRY_PORT=4174

EXPOSE 4174

CMD ["sh", "-c", "bun run serve:registry -- --host ${REGISTRY_HOST:-0.0.0.0} --port ${REGISTRY_PORT:-4174}"]
