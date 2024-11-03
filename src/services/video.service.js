import pool from "../common/mysql2/pool.mysql2.js";
import videoTypeModel from "../models/video-type.model.js";
import { BadRequestError } from "../common/helpers/error.helper.js";

const videoService = {
    listVideo: async () => {
        // console.log(abcfgfasdf);
        // const passDB = 1234;
        // const passUser = 1235;
        // if (passDB !== passUser) {
        //     throw new BadRequestError("Sai mật khẩu");
        // }

        const [result, fields] = await pool.query("SELECT * FROM videos");
        // console.log(abc);
        console.log(result);

        return result;
    },

    videoType: async () => {
        const result = await videoTypeModel.findAll();

        return result;
    },
};

export default videoService;
