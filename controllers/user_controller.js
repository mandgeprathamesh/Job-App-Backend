import asyncHandler from '../middlewares/asyncHandler.js';
import { Jobs } from '../models/jobs.js';
import User from '../models/user.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
          

const updateprofile=asyncHandler(async(req,res)=>{
    const {firstName,lastName,about,mobileNo,skills,experience,education,dob,address} = req.body;
    const user=req.user;
    // console.log(req.file.resume[0].path);
    console.log(firstName,lastName,about,mobileNo,skills,experience,education,dob,address);
    try {
        if (!firstName || !lastName || !about || !mobileNo || !skills || !experience || !education||!dob||!address) {
            return res.status(400).json({msg: 'All fields are required'});}
        try {
                if (!user) {
                    return res.status(400).json({msg: 'user not found'});
                }
                console.log(req.files?.imageurl[0].path);
                const profilepath=await uploadOnCloudinary(req.files?.imageurl[0].path);
                const resumepath=await uploadOnCloudinary(req.files?.resume[0].path);
                // console.log("cloudinary profile image path is:-",profilepath.url);
                // console.log("cloudinary resume image path is:-",resumepath.url);
                // const newexperience=user.experience.concat(JSON.parse(experience));
                const neweducation=user.education.concat(JSON.parse(education));
                // const skillsnew=user.skills.concat(JSON.parse(skills));
                // console.log(skillsnew);
                console.log("experinece coming from request is :-",experience);
                console.log("user experience is:-",user.experience);
                const exp=[...user.experience,...JSON.parse(experience)];
                console.log(typeof exp);
                const newskills=[...user.skills,...JSON.parse(skills)];
                console.log(newskills);
                // console.log(newexperience);
                // console.log(neweducation);
                if(profilepath&&resumepath){
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.profilePicture = profilepath.url;
                    user.about = about;
                    user.mobileno=mobileNo;
                    user.skills = newskills;
                    user.dob=dob;
                    user.address=address;
                    user.experience =exp;
                    user.education = neweducation;
                    user.userResume=resumepath.url;
                    await user.save();
                    // console.log("candidate",user);
                    res.json({msg: 'profile updated successfully'});
                }
                else{
                    console.log("cloudinary pe nhi gaya");
                }
        }
        catch (err) {
            return res.status(500).json({msg: err.message});
        }

    } catch (error) {
        console.log(error.message);
    }
});

const appliedjobs=asyncHandler(async(req,res)=>{
    const {userid}=req.body;
    // console.log(userid);
    try {
        const olduser = await User.findById(userid).populate({
            path: 'applied',
            model: 'Jobs'
        });
        // console.log(olduser);
        // console.log(olduser.applied);
        if (!olduser || !olduser.applied) {
            return [];
        }
        const appliedJobs = olduser.applied;
        // console.log(appliedJobs);
        res.json(appliedJobs);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
});

const applyforjob=asyncHandler(async(req,res)=>{
    try {
        const { jobId ,userId} = req.body;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const job = await Jobs.findById(jobId);
        if (!job) {
          return res.status(404).json({ message: 'Job not found' });
        }
    
        user.applied.push(jobId);
        await user.save();

        job.application.push(userId);
        await job.save();
    
        return res.status(200).json({ message: 'Job application successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});
export {updateprofile,appliedjobs,applyforjob}; 