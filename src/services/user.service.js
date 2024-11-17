import { BadRequestError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const userService = {
    create: async function (req) {
        return `This action creates a user`;
    },

    findAll: async function (req) {
        let { page, pageSize } = req.query;
        console.log(page, pageSize);

        // pageIndex = +pageIndex;
        // pageSize = +pageSize;

        page = Number(page) > 0 ? Number(page) : 1;
        pageSize = Number(pageSize) > 0 ? Number(pageSize) : 3;

        const skip = (page - 1) * pageSize;

        console.log(req.query, skip);

        const totalItems = await prisma.users.count();
        const totalPages = Math.ceil(totalItems / pageSize);

        const users = await prisma.users.findMany({
            take: pageSize,
            skip: skip, //tính ra được index bắt đầu lấy cho pageIndex
            orderBy: {
                created_at: "desc",
            },
        });

        // console.log(result);

        return {
            page,
            pageSize,
            totalPages: totalPages,
            totalItems: totalItems,
            items: users || [],
        };
    },

    findOne: async function (req) {
        return `This action returns a user with id: ${req.params.id}`;
    },

    update: async function (req) {
        return `This action updates a user with id: ${req.params.id}`;
    },

    remove: async function (req) {
        return `This action removes a user with id: ${req.params.id}`;
    },
    // uploadAvatarLocal: async (req) => {
    //     console.log(req.file);
    //     return "Upload avatar local thành công";
    // },
    uploadAvatar: async (req) => {
        const file = req.file;
        if (!file) throw new BadRequestError(`Không có file trong req`);

        // phân biệt có phải local hay không
        const isImgLocal = req.user.avatar?.includes(`local`);

        if (isImgLocal) {
            await prisma.users.update({
                where: {
                    user_id: +req.user.user_id,
                },
                data: {
                    avatar: file.filename,
                },
            });
            return {
                folder: `images/`,
                filename: file.filename,
                imgUrl: `images${file.path}`,
            };
        }
        await prisma.users.update({
            where: {
                user_id: +req.user.user_id,
            },
            data: {
                avatar: file.path,
            },
        });

        return {
            folder: `images/`,
            filename: file.filename,
            imgUrl: file.path,
        };
    },
    uploadAvatarCloud: async (req) => {
        console.log(req.file);
        return "Upload avatar cloud thành công";
    },
};
