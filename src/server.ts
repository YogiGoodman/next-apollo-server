import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import schemaWithMocks from "./mock";

async function listen(port: number) {
  const app = express();
  const httpServer = http.createServer(app);
  const corsOptions = {
    origin: [
      "http://localhost:3000",
      "https://nextjs-apollo-5szlld6zy-yogigoodman.vercel.app",
      "https://studio.apollographql.com",
    ],
  };

  app.get("/", (req, res) => {
    res.send("Server Ready. Go to /graphql");
  });
  const server = new ApolloServer({
    schema: schemaWithMocks,
    plugins: [ApolloServerPluginLandingPageDisabled()],
  });
  await server.start();

  server.applyMiddleware({
    app,
    cors: corsOptions,
    path: "/graphql",
  });
  return new Promise((resolve, reject) => {
    httpServer.listen(port).once("listening", resolve).once("error", reject);
  });
}

async function main() {
  try {
    await listen(5000);
    console.log("Server is ready");
  } catch (err) {
    console.error("Error starting the node server", err);
  }
}

void main();
