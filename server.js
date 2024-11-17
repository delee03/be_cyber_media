import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { createServer } from "node:http";
import { Sequelize } from "sequelize";
import rootRouter from "./src/routers/root.router.js";
import { responseError } from "./src/common/helpers/response.helper.js";
import { handlerError } from "./src/common/helpers/error.helper.js";
import { Server } from "socket.io";
import initSocket from "./src/common/socket.io/init.socket.js";
import schema from "./src/common/graphql/schema.graphql.js";
import root from "./src/common/graphql/root.graphql.js";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

const app = express();

const server = createServer(app);

// app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3001"] }));

app.use(cors()); // for parsing application/x-www-form-urlencoded is middleware

app.use(express.json()); // for parsing application/json is middleware

app.use(express.static("."));

// Serve the GraphiQL IDE.
app.get("/ruru", (req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Create and use the GraphQL handler.
app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
);

app.use(rootRouter);

app.use(handlerError);

initSocket(server);

const PORT = process.env.PORT || 3069;
server.listen(PORT, () => {
    console.log("Server is running on port 3069");
});

/*
b1: npx prisma init
b2: npx prisma db pull kéo table vào file schema
b3: npx prisma generate -> tạo object giống với tbl bên trong db

*/
