import "dotenv/config";

const { PORT, MONGO_URL, JWT_SECRET, NODE_ENV, CLIENT_URL } = process.env;

interface CorsConfig {
  CLIENT_URL: string;
  ALLOWED_HEADERS: string[];
  ALLOWED_METHODS: string[];
  CREDENTIALS: boolean;
}

interface Config {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  NODE_ENV: string;
  CORS: CorsConfig;
}

export const config: Config = {
  PORT: parseInt(PORT || "8000", 10),
  DATABASE_URL: MONGO_URL as string,
  JWT_SECRET: JWT_SECRET as string,
  NODE_ENV: NODE_ENV as string,
  CORS: {
    CLIENT_URL: (CLIENT_URL as string) || "http://localhost:5173",
    ALLOWED_HEADERS: ["Content-type", "Authorization"],
    ALLOWED_METHODS: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    CREDENTIALS: true,  
  },
};
