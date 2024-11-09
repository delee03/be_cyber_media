// const { describe, it, beforeEach, afterEach } = require("@jest/globals");
//const { default: authService } = require("../../services/auth.service.js");
import authService from "../../services/auth.service.js";
import {
    describe,
    it,
    beforeEach,
    afterEach,
    jest,
    expect,
} from "@jest/globals";
import prisma from "../prisma/init.prisma.js";

describe(`Register`, () => {
    beforeEach(() => {
        console.log("chạy trước hàm IT");
        jest.spyOn(prisma.users, "create");
    });

    afterEach(() => {
        console.log("Chạy sau hàm IT");
    });
    describe("authService.register", () => {
        //truyền trong it là test case name và fn
        it("Case 1: Trường hợp đăng kí thành công", async () => {
            //throw new Error("Lỗi rồi đó");
            // console.log("Hàm IT case 1 chạy");

            //với await thì dùng mockResolvedValue
            // ko await thì dùng mockReturnValue
            await prisma.users.create.mockResolvedValue({
                user_id: 11,
                email: "test@gmail",
                full_name: "test",
                avatar: null,
                google_id: null,
                face_app_id: null,
                created_at: "2024-11-09T08:40:46.000Z",
                updated_at: "2024-11-09T08:40:46.000Z",
                role_id: 2,
            });

            const newUser = await authService.register({
                body: {
                    email: "test@gmail.com",
                    password: "1234",
                    fullName: "NGUYEN VAN A",
                },
            });
            console.log(newUser);
            expect(newUser).not.toHaveProperty("pass_word");
            expect(typeof newUser.email).toBe("string");
            expect(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(newUser.email)
            ).toBe(true);
        });

        it("Case 2: Nên báo lỗi nếu mail đã tồn tại", () => {
            //  console.log("Hàm IT chạy sau mỗi lần EACH lặp");
        });
    });
});

describe(`Login`, () => {
    beforeEach(() => {
        console.log("chạy trước hàm IT");
        jest.spyOn(prisma.users, "create");
    });

    afterEach(() => {
        console.log("Chạy sau hàm IT");
        jest.restoreAllMocks();
    });

    describe("Login ordinary auth service", () => {
        it("Case 1: Trường hợp đăng kí thành công với thông tin hợp lệ");
        it("Case 2: Trường hợp đăng kí thất bại với email đã tồn tại");
    });
});
