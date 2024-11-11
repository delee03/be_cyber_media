import { ForbiddenError } from "../helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";

const checkPermission = async (req, res, next) => {
    try {
        const routePath = req.route.path;
        const method = req.method;
        const baseUrl = req.baseUrl;
        const roleId = req.user.role_id;
        console.log(routePath, method, baseUrl);
        const fullPath = baseUrl + routePath;
        if (roleId === 1) {
            next();
            return;
        }
        const role_permission_exist = await prisma.role_permissions.findFirst({
            where: {
                permissions: {
                    endpoint: fullPath,
                    method: method,
                },
                role_id: roleId,
                is_active: true,
            },
        });
        if (!role_permission_exist) {
            throw new ForbiddenError("Permission denied");
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default checkPermission;
