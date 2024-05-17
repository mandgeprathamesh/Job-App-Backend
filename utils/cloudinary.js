import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'diqp5qndr', 
  api_key: '629675458647649', 
  api_secret: 'iJk0PfhFeoDQ5ALLkjninFPPwI0' 
});


const uploadOnCloudinary = async (localFilePath) => {
    console.log("cloudinary mein aaya hua path :-",localFilePath);
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}


export {uploadOnCloudinary}