import express from "express";
import videoController from "../controllers/video.controller.js";
import checkPermission from "../common/middleware/check-permission.middleware.js";
import protect from "../common/middleware/protect.middleware.js";

const videoRouter = express.Router();
videoRouter.use(protect);
videoRouter.get(`/video-list`, videoController.listVideo);
videoRouter.get(`/video-type`, videoController.videoType);
videoRouter.get(`/video-unique/:id`, videoController.getVideoById);

export default videoRouter;
