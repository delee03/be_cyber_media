import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constant/config.contant.js";
import prisma from "../prisma/init.prisma.js";
import { ForbiddenError, UnauthorizedError } from "../helpers/error.helper.js";

const protect = async (req, res, next) => {
    try {
        console.log("Kiểm tra TOKEN");
        const accessToken = req.headers?.authorization?.split(" ")[1];
        if (!accessToken) {
            throw new UnauthorizedError(
                "Vui lòng cung cấp token để sử dụng api này"
            );
        }
        console.log(accessToken);
        const verifyToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        //nếu lỗi jwt sẽ tự động bắn lỗi
        console.log({ verifyToken });

        const user = await prisma.users.findUnique({
            where: {
                user_id: verifyToken.user_id,
            },
            select: {
                role_id: true,
                user_id: true,
                full_name: true,
                avatar: true,
                email: true,
            },
        });

        if (!user) {
            throw new ForbiddenError("Không tìm thấy user");
        }

        req.user = user;

        //console.log(req.headers.authorization.split(" ")[1]);
        next();
    } catch (error) {
        next(error);
    }
};
export default protect;
