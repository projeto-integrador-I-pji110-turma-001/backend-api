import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { AwilixResolver } from "../../infrastructure/resolver";

export class GlobalConfig extends AwilixResolver {
  environment: "dev" | "hml" | "prod" = "dev";
  port = 8080;
  jwtSecret = "";
  jwt = {
    secret: "",
    expiresIn: "2h",
    decode: { complete: true },
  };
  db = {
    log: true,
    url: "",
  };
  sentryDsn = '';

  constructor() {
    super();
    this.load();
  }

  isDev() {
    return this.environment !== "prod";
  }

  load() {
    const env = dotenv.config({
      path: process.env.ENV ? process.env.ENV : ".env",
    });
    dotenvExpand.expand(env);

    if (!process.env.ENVIRONMENT) {
      throw new Error("Env var ENVIRONMENT not set");
    }
    if (!process.env.DB_URL) {
      throw new Error("Env var DB_URL not set");
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("Env var JWT_SECRET not set");
    }

    this.environment = process.env.ENVIRONMENT as "dev";
    this.jwtSecret = process.env.JWT_SECRET;    
    this.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
    this.db.url = process.env.DB_URL;
    this.db.log = process.env.DB_LOG === "1" || process.env.DB_LOG === "true";  
    this.sentryDsn = process.env.SENTRY as string;  
  }
}
