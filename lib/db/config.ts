//lib/db/config.ts
import { config } from "dotenv";

config();

interface DbConfigOptions {
  trustServerCertificate: boolean;
  trustedConnection: boolean;
  instancename: string;
  charset: string;
  connectTimeout: number;
  requestTimeout: number;
  pool: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
}

interface DbConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  port: number;
  options: DbConfigOptions;
}

const db_config: DbConfig = {
  user: process.env.DB_USERNAME || "defaultUser",
  password: process.env.DB_USER_PASS || "defaultPassword",
  server: process.env.DB_SERVER || "127.0.0.1",
  database: process.env.DB_NAME || "defaultDatabase",
  port: parseInt(process.env.DB_PORT || "1433"),
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    instancename: "SQLEXPRESS",
    charset: "UTF-8",
    connectTimeout: 30000,
    requestTimeout: 30000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  },
};

export default db_config;
