# Use a single-stage build because the project is small and keeps the flow simple.
FROM node:18-alpine

# Needed by some Node modules (e.g. sharp) when building on Alpine.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies first to leverage Docker layer caching.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the sources and build the Next.js project.
COPY . .
RUN yarn build

# Run the production server on port 3401 inside the container.
ENV NODE_ENV=production
ENV PORT=3401
EXPOSE 3401

CMD ["yarn", "next", "start", "-p", "3401"]
