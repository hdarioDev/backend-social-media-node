module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret!",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "sql10.freemysqlhosting.net",
    user: process.env.MYSQL_USER || "sql10605166",
    password: process.env.MYSQL_PASSWORD || "3Mm1QxgDPP",
    database: process.env.MYSQL_DATABASE || "sql10605166",
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
};
