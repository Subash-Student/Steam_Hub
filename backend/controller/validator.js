

// CONTROLLER FOR BACKEND DATA VALIDATION

export const validateData = (req, res) => {
    const { name, mobile, email, dob } = req.body;
  

    // Validate name (alphabet only)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
        return res.json({success:false, message: "Name must contain only alphabets and spaces." });
    }

    // Validate mobile (10 digits, starts with 6, 7, 8, or 9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
        return res.json({success:false, message: "Mobile number must be 10 digits and start with 6, 7, 8, or 9." });
    }

    // Validate email (basic format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.json({success:false, message: "Invalid email format." });
    }

    // Validate date of birth (age must be above 18)
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobDate.getFullYear();
    const ageCorrection = (currentDate.getMonth() < dobDate.getMonth()) || 
                          (currentDate.getMonth() === dobDate.getMonth() && currentDate.getDate() < dobDate.getDate());
    if (!dob || age < 18 || (age === 18 && ageCorrection)) {
        return res.json({success:false, message: "Date of birth indicates age is under 18." });
    }

    // If all validations pass
    return res.json({success:true, message: "Validation successful." ,age:age});
};
