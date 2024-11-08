import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_EXPIRE,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRE,
    REFRESH_TOKEN_SECRET,
} from "../common/constant/config.contant.js";

const tokenService = {
    createTokens: (user) => {
        const accessToken = jwt.sign(
            { user_id: user.user_id },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRE,
            }
        );
        const refreshToken = jwt.sign(
            { user_id: user.user_id },
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: REFRESH_TOKEN_EXPIRE,
            }
        );
        return {
            accessToken,
            refreshToken,
        };
    },
};

export default tokenService;
