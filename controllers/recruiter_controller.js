import asyncHandler from '../middlewares/asyncHandler.js';
import {Jobs} from '../models/jobs.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const updateprofile=asyncHandler(async(req,res)=>{
    const {
        firstName,
        lastName,
        currentPosi,
        about,
        company,
        contact,
    } = req.body;

    // console.log(firstName,lastName,currentPosi,about,company,contact);

    try {
        
        if (!firstName || !lastName || !currentPosi || !about || !company || !contact) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const recruiter = req.user;
        console.log(recruiter);
        if (!recruiter){
            return res.status(404).json({ msg: 'Recruiter not found' });
        }

        const profilepicupload=await uploadOnCloudinary(req.files?.profilePicture[0].path);
        console.log(profilepicupload.url);

        if(profilepicupload){
            console.log("update ke andar aagaya");
            recruiter.firstName = firstName;
            recruiter.lastName = lastName;
            recruiter.currentPosi = currentPosi;
            recruiter.about = about;
            recruiter.company = company;
            recruiter.contact = contact;
            recruiter.profilePicture = profilepicupload.url;
            await recruiter.save();
            return res.json({ msg: 'Profile updated successfully' });
        }

        else{
            return res.status(500).json({ msg: 'could not update details' });
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server Error occured' });
    }
})
const cretatejob=asyncHandler(async(req,res)=>{
    const { userid ,position,jobTitle,jobType,location,salary,vacancies,experience,desc,requirements} = req.body; 
    console.log(userid);
    try {
        const recruiterone = await Jobs.findById( userid); 

        if (!recruiterone) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        const newJob = new Jobs({
            company: recruiterone._id,
            position:position,
            jobTitle:jobTitle,
            jobType:jobType,
            location:location,
            salary:salary,
            vacancies:vacancies,
            experience:experience,
            desc:desc,
            requirements:requirements
        });

        await newJob.save();
        recruiterone.jobsOffered.push(newJob._id);
        await recruiterone.save();

        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getalljobs=asyncHandler(async(req,res)=>{
    try {
        const jobPosts = await Jobs.find({});
        console.log(jobPosts);
        res.json({ jobPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getrecruitermadejobs=asyncHandler(async(req,res)=>{
    const { recruiterId } = req.body;
    try {
        const jobPosts = await Jobs.find({recruiterId});
        res.json({ jobPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getusersofparticularjob=asyncHandler(async(req,res)=>{
    const { jobId } = req.body;
    console.log(jobId);
    try {
        const jobPost = await Jobs.findById(jobId).populate({
            path: 'application',
            model: 'User'
        });
        console.log(jobPost);
        if (!jobPost || !jobPost.application) {
            return [];
        }
        if (!jobPost) {
            return res.status(404).json({ error: 'Job post not found' });
        }
        const applicants = jobPost.application;
        res.json({ applicants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {updateprofile,cretatejob,getalljobs,getrecruitermadejobs,getusersofparticularjob}; 
