import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { Sequelize } from "sequelize";
import rootRouter from "./src/routers/root.router.js";
import { responseError } from "./src/common/helpers/response.helper.js";
import { handlerError } from "./src/common/helpers/error.helper.js";

const app = express();

// app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3001"] }));

app.use(cors()); // for parsing application/x-www-form-urlencoded is middleware

app.use(express.json()); // for parsing application/json is middleware

// app.get("/", (req, res, next) => {
//     res.send("<h1>Hello World</h1>");
// });

// const pool = mysql
//     .createPool({
//         host: "localhost",
//         user: "root",
//         password: "123",
//         port: 3305,
//         database: "db_media",
//     })
//     .promise();

// app.get("/video-list", async (req, res, next) => {
//     // res.json("Video List");
//     const [result, typeTable] = await pool.query("SELECT * FROM videos");
//     console.log(result);
//     res.json(result);
// });

app.use(rootRouter);

// app.use((error, req, res, next) => {
//     console.log(`Lỗi ở next error ${error}`);
//     const resData = responseError(error.message, error.code, error.stack);
//     res.status(resData.code).json(resData);
//     // res.status(500).json(err);
// });

app.use(handlerError);

// // Sequelize
// const sequelize = new Sequelize("db_media", "root", "123", {
//     host: "localhost",
//     dialect: "mysql",
//     port: 3305,
//     logging: false,
// });

// //kiểm tra kết nối
// sequelize
//     .authenticate()
//     .then((result) => {
//         console.log("Connection has been established successfully.");
//     })
//     .catch((erorr) => {
//         console.log(erorr);
//         console.log("Connection has not been established successfully.");
//     });

//tạo mới 1 model Video-Type từ sequelize
// const videoTypeModel = sequelize.define(
//     "video_type",.......
// );

// const result = await videoTypeModel.findAll();

// return result;

app.listen(3069, () => {
    console.log("Server is running on port 3069");
});

/*
b1: npx prisma init
b2: npx prisma db pull kéo table vào file schema
b3: npx prisma generate -> tạo object giống với tbl bên trong db

*/
