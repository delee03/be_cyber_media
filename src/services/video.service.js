import pool from "../common/mysql2/pool.mysql2.js";
import videoTypeModel from "../models/video-type.model.js";
import { BadRequestError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const videoService = {
    listVideo: async (req) => {
        let { pageIndex, pageSize } = req.query;
        console.log(pageIndex, pageSize);

        // pageIndex = +pageIndex;
        // pageSize = +pageSize;

        pageIndex = Number(pageIndex) > 0 ? Number(pageIndex) : 1;
        pageSize = Number(pageSize) > 0 ? Number(pageSize) : 3;

        const skip = (pageIndex - 1) * pageSize;

        console.log(req.query, skip);

        const totalItems = await prisma.videos.count();
        const totalPages = Math.ceil(totalItems / pageSize);

        const videos = await prisma.videos.findMany({
            take: pageSize,
            skip: skip, //tính ra được index bắt đầu lấy cho pageIndex
            orderBy: {
                created_at: "desc",
            },
        });

        // console.log(result);

        return {
            pageIndex,
            pageSize,
            totalPages: totalPages,
            totalItems: totalItems || [],
            items: videos,
        };
    },

    videoType: async () => {
        // const result = await videoTypeModel.findAll();

        const videoTypes = await prisma.video_type.findUnique();

        return videoTypes;
    },

    getVideoById: async (id) => {
        if (!id) {
            throw new BadRequestError("ID is required");
        }

        const video = await prisma.videos.findUnique({
            where: { video_id: parseInt(id) },
        });

        if (!video) {
            throw new BadRequestError("Video not found");
        }

        return video;
    },
};

export default videoService;
