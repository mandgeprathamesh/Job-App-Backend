import express from 'express';
import {appliedjobs, applyforjob, updateprofile } from '../controllers/user_controller.js';
import {authenticateuser} from '../middlewares/auth_middleware.js';
import {upload} from '../middlewares/multer.js';
const router=express.Router();

router.post('/updateprofile',authenticateuser,upload.fields([
    {
        name: "imageurl",
        maxCount: 1
    }, 
    {
        name: "resume",
        maxCount: 1
    }
]),updateprofile);
router.post('/appliedjobs',authenticateuser,appliedjobs);
router.post('/applyforjob',authenticateuser,applyforjob);

export default router;