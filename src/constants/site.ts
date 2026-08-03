export const SITE_NAME = "Auto Parts Pro";

// Baked in at build time (see Dockerfile / docker-compose.yml ARG + .env).
export const EXTERNAL_LOGIN_URL = import.meta.env.VITE_LOGIN_URL || "https://app.autopartspro.au/login";
