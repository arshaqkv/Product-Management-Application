import "dotenv/config";

const { PORT } = process.env;

interface Config {
  PORT: number;
}

export const config: Config = {
  PORT: parseInt(PORT || "8080", 10),
};
