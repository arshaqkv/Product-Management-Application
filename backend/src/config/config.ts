import "dotenv/config";

const { PORT, MONGO_URL } = process.env;

interface Config {
  PORT: number;
  DATABASE_URL: string;
}

export const config: Config = {
  PORT: parseInt(PORT || "8080", 10),
  DATABASE_URL: MONGO_URL as string,
};
