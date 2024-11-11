import express from "express";
import videoRouter from "./video.router.js";
import authRouter from "./auth.router.js";
import roleRouter from "./role.router.js";
import permissionRouter from "./permission.router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../common/swaggers/init.swagger.js";
import userRouter from "./user.router.js";

const rootRouter = express.Router();

rootRouter.get(
    `/`,
    (req, res, next) => {
        console.log(`Middleware 1`);
        const payload = `oke`;
        req.duLieuGuiDi = payload;
        // next(`khong co loi dau`);
        next();
    },
    (req, res, next) => {
        req.duLieuGuiDi += ` + 1`;
        console.log(`Middleware 2`);
        next();
    },
    (req, res, next) => {
        req.duLieuGuiDi += ` + 2`;
        console.log(`Middleware 3`);
        next();
    },
    (request, respone, next) => {
        // console.log(`Lỗi nào đó xảy ra: ${loiNe}`);
        respone.json(request.duLieuGuiDi);
    }
);

rootRouter.use("/video", videoRouter);

rootRouter.use("/auth", authRouter);

rootRouter.use("/role", roleRouter);

rootRouter.use("/permission", permissionRouter);

rootRouter.use("/user", userRouter);

rootRouter.use("/api-docs", swaggerUi.serve);
rootRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default rootRouter;
