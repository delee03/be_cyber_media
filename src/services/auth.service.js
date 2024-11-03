import { BadRequestError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";

const authService = {
    register: async (req) => {
        //b1: nhận dữ liệu từ client FE gửi lên
        const { email, password, fullName } = req.body;
        console.log(req.body);
        //b2: kiểm tra dữ liệu từ client FE gửi lên có hợp lệ không
        if (!email || !password || !fullName) {
            throw new BadRequestError("Email, password, fullName is invalid");
        }
        //b3: kiểm tra email đã tồn tại trong db chưa
        //findunique dành cho 1 index duy nhất hoặc primary key nếu k dùng findFirst
        const user = await prisma.users.findFirst({
            where: {
                email: email,
            },
        });
        if (user) {
            throw new BadRequestError("Email is exist");
        }
        console.log(req.body);
        //b4:  mã hóa password 1 chiều trước khi lưu vào db, tạo user trong db
        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = await prisma.users.create({
            data: {
                email: email,
                pass_word: hashPassword,
                full_name: fullName,
            },
        });
        return newUser;
    },
};

export default authService;
