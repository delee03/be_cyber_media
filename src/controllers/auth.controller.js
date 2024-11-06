import { responseSuccess } from "../common/helpers/response.helper.js";
import authService from "../services/auth.service.js";

const authController = {
    register: async (req, res, next) => {
        try {
            const result = await authService.register(req);
            const resData = responseSuccess(result, "Đăng kí thành công", 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const result = await authService.login(req);
            const resData = responseSuccess(
                result,
                "Đăng nhập thành công",
                200
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
        }
    },
    loginFacebook: async (req, res, next) => {
        try {
            const result = await authService.loginFacebook(req);
            const resData = responseSuccess(
                result,
                "Đăng nhập facebook thành công",
                200
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
        }
    },
};

export default authController;
