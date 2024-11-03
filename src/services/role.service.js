import prisma from "../common/prisma/init.prisma.js";

export const roleService = {
    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        let { pageIndex, pageSize } = req.query;
        console.log(pageIndex, pageSize);

        // pageIndex = +pageIndex;
        // pageSize = +pageSize;

        pageIndex = Number(pageIndex) > 0 ? Number(pageIndex) : 1;
        pageSize = Number(pageSize) > 0 ? Number(pageSize) : 3;

        const skip = (pageIndex - 1) * pageSize;

        console.log(req.query, skip);

        const totalItems = await prisma.roles.count();
        const totalPages = Math.ceil(totalItems / pageSize);

        const roles = await prisma.roles.findMany({
            take: pageSize,
            skip: skip,
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
            items: roles,
        };
    },

    findOne: async function (req) {
        const roleDetail = await prisma.roles.findUnique({
            where: { role_id: +req.params.id },
        });
        return roleDetail;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} role`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} role`;
    },
    togglePermission: async function (req) {
        const { permission_id, role_id } = req.body;
        const rolePermissionExist = await prisma.role_permissions.findFirst({
            where: {
                permission_id: +permission_id,
                role_id: +role_id,
            },
        });

        if (rolePermissionExist) {
            //nếu tồn tại thì isActived false => true, và ngược lại => dùng toán tử ! để đảo ngược giá trị
            await prisma.role_permissions.update({
                where: {
                    role_permissions_id:
                        rolePermissionExist.role_permissions_id,
                },
                data: {
                    is_active: !rolePermissionExist.is_active,
                },
            });
            return `Remove permission #${permission_id} from role #${role_id} successfully`;
        } else {
            await prisma.role_permissions.create({
                data: {
                    permission_id: +permission_id,
                    role_id: +role_id,
                },
            });
            return `Add permission #${permission_id} to role #${role_id} successfully`;
        }
    },
};
