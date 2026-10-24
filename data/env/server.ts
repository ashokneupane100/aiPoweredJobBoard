function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const port = Number(requiredEnvironmentVariable("DB_PORT"));
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("DB_PORT must be an integer between 1 and 65535");
}

const dbHost = requiredEnvironmentVariable("DB_HOST");
const dbUser = requiredEnvironmentVariable("DB_USER");
const dbPassword = requiredEnvironmentVariable("DB_PASSWORD");
const dbName = requiredEnvironmentVariable("DB_NAME");

const databaseUrl = new URL("postgresql://localhost");
databaseUrl.hostname = dbHost;
databaseUrl.port = String(port);
databaseUrl.username = dbUser;
databaseUrl.password = dbPassword;
databaseUrl.pathname = `/${dbName}`;

export const env = {
  DB_HOST: dbHost,
  DB_PORT: port,
  DB_USER: dbUser,
  DB_PASSWORD: dbPassword,
  DB_NAME: dbName,
  DATABASE_URL: databaseUrl.toString(),
};
