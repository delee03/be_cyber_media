import videoService from "../services/video.service.js";
import pool from "../common/mysql2/pool.mysql2.js";
import videoTypeModel from "../models/video-type.model.js";
import { responseSuccess } from "../common/helpers/response.helper.js";
import { responseError } from "../common/helpers/response.helper.js";
//lỗi kiểm soát được
// 403, 404, 400, 401,

//lỗi không kiểm soát đuọc - 500 - Internal Server Error
/*
try catch throw
*/

const videoController = {
    listVideo: async (req, res, next) => {
        try {
            const result = await videoService.listVideo(req);
            const resData = responseSuccess(
                result,
                "Trả dữ liệu thành công Phát đẹp zai",
                200
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
            // console.log("Lỗi nè", error);
            //    res.status(500).send("Internal Server Error"); //nhớ trả về res
            // const resData = {
            //     status: `error`,
            //     code: 400,
            //     message: "Lỗi rồi bạn êi",
            //     doc: `api.example.com`,
            //     stack: error.stack,
            // };
            // const resData = responseError(
            //     error.message,
            //     error.code,
            //     error.stack
            // );
            // res.status(resData.code).json(resData);
        }
    },
    videoType: async (req, res, next) => {
        try {
            const result = await videoService.videoType();
            const resData = responseSuccess(
                result,
                "Trả dữ liệu thành công",
                200
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
        }
    },

    getVideoById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await videoService.getVideoById(id);
            const resData = responseSuccess(
                result,
                "Trả dữ liệu thành công",
                200
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
        }
    },
};

export default videoController;
