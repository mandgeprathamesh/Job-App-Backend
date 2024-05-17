import mongoose  from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    profilePicture: { 
        type: String, 
        default: 'https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'
    },
    role: { 
        type: String, 
        default: 'recruiter'
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    currentPosi: {
        type: String,
    },
    about: {
        type: String,
    },
    company: {
        type: String,
    },
    contact: {
        type: String, 
    },
    jobsOffered : [{type : Schema.Types.ObjectId, ref : 'Jobs'}]
},
    {
        timestamps: true
    }
);

const Recruiter= mongoose.model('Recruiter', recruiterSchema);
export default Recruiter;