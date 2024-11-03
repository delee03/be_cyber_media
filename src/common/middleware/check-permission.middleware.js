const checkPermission = (req, res, next) => {
    try {
        const routePath = req.route.path;
        const method = req.method;
        const baseUrl = req.baseUrl;
        // const user = req.user;
        console.log(routePath, method, baseUrl);
        const fullPath = baseUrl + routePath;
        next();
    } catch (error) {
        next(error);
    }
};

export default checkPermission;
