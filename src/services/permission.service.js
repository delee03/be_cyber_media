import prisma from "../common/prisma/init.prisma.js";
import lodash from "lodash";

export const permissionService = {
    create: async function (req) {
        const { name, endpoint, method, module } = req.body;
        console.log(name, endpoint, method, module);

        const newPermission = await prisma.permissions.create({
            data: {
                name: name,
                endpoint: endpoint,
                method: method,
                module: module,
            },
        });
        return newPermission;
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

        const totalItems = await prisma.permissions.count();
        const totalPages = Math.ceil(totalItems / pageSize);

        const permissions = await prisma.permissions.findMany({
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
            items: permissions,
        };
    },

    findOne: async function (req) {
        return `This action returns a permission with id: ${req.params.id}`;
    },

    update: async function (req) {
        return `This action updates a permission with id: ${req.params.id}`;
    },

    remove: async function (req) {
        return `This action removes a permission with id: ${req.params.id}`;
    },

    groupByModule: async function (req) {
        const roleId = +req.params.id;
        console.log(roleId);
        const permissions = await prisma.permissions.findMany({
            include: {
                role_permissions: {
                    where: {
                        role_id: roleId,
                        is_active: true,
                    },
                },
            },
        });
        return lodash.groupBy(permissions, "module");
    },
};
