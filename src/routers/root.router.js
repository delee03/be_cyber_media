import express from "express";
import videoRouter from "./video.router.js";

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

export default rootRouter;
