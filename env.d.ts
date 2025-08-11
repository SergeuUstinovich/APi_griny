declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    PRIVATE_KEY_JWT: string;
    SECURE_COOKIE: string;
  }
}
