import "dotenv/config";

const { PORT, MONGO_URL, JWT_SECRET } = process.env;

interface Config {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

export const config: Config = {
  PORT: parseInt(PORT || "8080", 10),
  DATABASE_URL: MONGO_URL as string,
  JWT_SECRET: JWT_SECRET as string,
};
