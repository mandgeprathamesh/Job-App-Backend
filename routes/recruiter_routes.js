import express from 'express';
import { cretatejob, getalljobs, getrecruitermadejobs, getusersofparticularjob, updateprofile } from '../controllers/recruiter_controller.js';
const router=express.Router();
import { authenticaterecruiter } from '../middlewares/auth_middleware.js';
import { upload } from '../middlewares/multer.js';

router.post('/updateprofile',authenticaterecruiter,upload.fields([
    {
        name: "profilePicture",
        maxCount: 1
    }, 
]),updateprofile);
router.post('/createjob',authenticaterecruiter,cretatejob);
router.get('/getalljobs',getalljobs);
router.post('/getrecruitermadejobs',authenticaterecruiter,getrecruitermadejobs);
router.post('/getusersofparticularjob',authenticaterecruiter,getusersofparticularjob);

export default router;