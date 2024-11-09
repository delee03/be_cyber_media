const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "CyberMedia Express API",
        version: "1.0.0",
        description: "A simple Express Library API",
    },
    servers: [
        {
            url: "http://localhost:3069",
            description: "Development",
        },
    ],
    paths: {
        "/": {
            get: {
                summary: "Get all library",
                responses: {
                    200: {
                        description: "OK",
                    },
                },
            },
        },
        "/video": {
            get: {
                summary: "Get all video",
                responses: {
                    200: {
                        description: "OK",
                    },
                },
            },
        },
        "/auth": {
            get: {
                summary: "Get all auth",
                responses: {
                    200: {
                        description: "OK",
                    },
                },
            },
        },
        "/role": {
            get: {
                summary: "Get all role",
                responses: {
                    200: {
                        description: "OK",
                    },
                },
            },
        },
        "/permission": {
            get: {
                summary: "Get all permission",
                responses: {
                    200: {
                        description: "OK",
                    },
                },
            },
        },
    },
};

export default swaggerDocument;
