import { Router } from 'express';
import { analyzeImageController, generateDetailedReportController } from '../controllers/report.controller.js';
import { upload } from './../middlewares/multer.middleware.js';

const router = Router();

// analyzeImage route
router.route("/analyzeImage").post(upload.single('file'), analyzeImageController);

// generateImage route
router.route("/generateReport").post(upload.single('file'), generateDetailedReportController)

export default router;