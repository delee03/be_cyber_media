import {
    BadRequestError,
    UnauthorizedError,
} from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    login: async (req) => {
        //b1: nhận dữ liệu từ body
        const { email, pass_word } = req.body;
        console.log({ email, pass_word });

        //b2: kiểm tra email tồn tại trong db hay chưa ?
        //TH1: - tồn tại => đi tiếp
        //TH2: - email không tồn tại => vui lòng đăng kí

        const userExist = await prisma.users.findFirst({
            where: {
                email: email,
            },
            select: {
                user_id: true,
                pass_word: true,
            },
        });
        if (!userExist) {
            throw new BadRequestError("Email không tồn tại, vui lòng đăng kí");
        }
        //B3: kiểm tra password
        console.log({ userExist });
        const isValidPassword = bcrypt.compareSync(
            pass_word,
            userExist.pass_word
        );
        if (!isValidPassword) {
            throw new BadRequestError("Sai mật khẩu");
        } //có thể trả về cho phép truy cập rồi tuy nhiên cần token và refresh token

        //B4: trả về token khi login thành công. (access token và refresh token)
        const accessToken = jwt.sign(
            { user_id: userExist.user_id },
            "KHOABIMAT_ACCESSTOKEN",
            {
                expiresIn: "5m",
            }
        );

        //accessToken : có nhiệm vụ xác minh rằng người dùng login thành công vào hệ thống

        //refresh token : sẽ có nhiệm vụ bảo vệ accessToken bằng cách làm mới, bởi vì -> giảm thời gian
        //sống của access xuống mức thấp nhất.
        //=> có refreshToken để làm mới , nếu ko có refresh Token => thì access hết hạn người dùng phải đăng nhập lại
        //- hết hạn trả về 403
        // - không hợp lệ sai khóa bí mật : 401: logout người dùng

        const refreshToken = jwt.sign(
            { user_id: userExist.user_id },
            "KHOABIMAT_REFRESHTOKEN",
            {
                expiresIn: "7d",
            }
        );

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    },
    //sau khi tạo ứng dụng thành công ở dashboard => chọn trường hợp sử dụng => tùy chỉnh =>
    //click thêm email => lấy app ID

    loginFacebook: async (req) => {
        const { email, id, name, picture } = req.body;
        console.log({ email, id, name, picture });
        //b2: kiểm tra email tồn tại trong db hay chưa ?
        //TH1: - tồn tại => đi tiếp
        //TH2: - email không tồn tại => vui lòng đăng kí

        const userExist = await prisma.users.findFirst({
            where: {
                email: email,
            },
            select: {
                user_id: true,
                pass_word: true,
            },
        });
        if (userExist) {
        } else {
            //chưa tồn tại tạo mới
            const newUser = await prisma.users.create({
                data: {
                    face_app_id: id,
                    email: email,
                    avatar: picture.data.url,
                    full_name: name,
                },
            });
            const accessToken = jwt.sign(
                { user_id: newUser.face_app_id },
                "KHOABIMAT_ACCESSTOKEN",
                {
                    expiresIn: "5m",
                }
            );
            const refreshToken = jwt.sign(
                { user_id: newUser.face_app_id },
                "KHOABIMAT_REFRESHTOKEN",
                {
                    expiresIn: "7d",
                }
            );
            return {
                accessToken,
                refreshToken,
            };
        }
    },
};

export default authService;
