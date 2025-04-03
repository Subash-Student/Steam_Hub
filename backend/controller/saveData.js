import User from "../model/userModel.js";



// CONTROLLER FOR STORE USER DATA IN DB

export const saveData = async(req,res)=>{

    const {name,mobile,email,dob,age} = req.body;

    try {
        const existingEmail = await User.findOne({ email });
        const existingMobile = await User.findOne({ mobile });

        if (existingEmail || existingMobile) {
            return res.json({success:false, message: "User already exists." });
        }
        
        const newUser = new User({
            name,
            mobile,
            email,
            dob,
            age
        });

        const save = await newUser.save();

        if(save){
            return res.json({success:true, message: "Data Saved." });
        }else{
            return res.json({success:false, message: "Failed to save data." });
        }

    } catch (error) {
        console.error("Error saving data:", error);
        return res.json({success:false, message: "An error occurred while saving data.", error: error.message });
    }

}


// CONTROLLER FOR FETCH USERS DATA

export const fetchData = async(req,res)=>{

    try {    
        const data = await User.find({});

        if(data){
            return res.json({success:true, users:data });
        }else{
            return res.json({success:false, users:[] });
        }
    } catch (error) {
        console.error(error);
        return res.json({success:false, error: 'Internal Server Error' });
    }
}