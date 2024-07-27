const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cookieparser = require("cookie-parser")
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

dotenv.config()

const app = express()
const port = process.env.PORT || 3200;

const {
    authenticateToken
} = require("./utils")
const Admin = require("./models/admin.model")
const Register = require("./models/register.model")
const Works = require("./models/works.model")
const Message = require("./models/message.model")
const Profile = require("./models/profile.model")

// Middlewere
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieparser())
app.use(cors())

app.get("/", (req, res) => {
    res.send("This is root route of Express Application")
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))



app.listen(port, () => {
    console.log(`Application Live on Port ${port}`)
})

// admin Login
app.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(404).json({
            error: true,
            message: `Email & Password required`
        })
    }


    const adminInfo = await Admin.findOne({
        adminEmail: email
    })


    if (!adminInfo) {
        return res.status(400).json({
            error: true,
            message: "Admin Not Found"
        })
    }

    if (adminInfo.adminEmail == email && adminInfo.adminPassword == password) {
        const admin = {
            admin: adminInfo
        };
        const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5000h",
        })
        return res.json({
            error: false,
            email,
            accessToken,
            message: "Admin Logged in Successfully"
        })
    } else {
        return res
            .status(400)
            .json({
                error: true,
                message: "Invalid Credentials"
            })
    }
})

// admin Register
app.post("/register", async (req, res) => {
    const {
        adminName,
        adminEmail,
        adminPassword
    } = req.body;

    if (!(adminName || adminEmail || adminPassword)) {
        return res
            .status(404)
            .json({
                error: true,
                message: "Name & Email & Password are Required"
            })
    }
    const admin = await Admin.findOne({
        adminEmail
    })

    if (admin) {
        return res
            .status(400)
            .json({
                error: true,
                message: "Admin Already Exists"
            })
    }

    const newAdmin = new Admin({
        adminName,
        adminEmail,
        adminPassword
    })

    await newAdmin.save()
    const accessToken = jwt.sign({
            admin: newAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5000h",
        }
    )
    return res.json({
        error: false,
        newAdmin,
        accessToken,
        message: "Admin created successfully"
    })

})

app.get("/all-admin", authenticateToken, async (req, res) => {
    const {
        admin
    } = req.adminEmail;

    try {
        const getAdmin = await Admin.findOne({
            adminEmail: admin.adminEmail
        });
        return res.json({
            admin: {
                AdminName: getAdmin.adminName,
                AdminEmail: getAdmin.adminEmail,
                _id: getAdmin._id
            },
            error: false,
            message: "User get Successfully",
        })
    } catch (e) {
        console.error("Error Feching Admin: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

// Register Url Active/deactive by Admin
// app.post("/url-active", authenticateToken, async (req, res) => {
//     const {
//         urlStatus
//     } = req.body;

//     if (!urlStatus) {
//         return res.status(404).json({
//             error: true,
//             message: "Url Status Required"
//         })
//     }

//     try {

//         const newRegister = new Register({
//             activeStatus: urlStatus
//         })
//         await newRegister.save();
//         return res.json({
//             error: false,
//             message: "Url Status Updated Successfully"
//         })

//     } catch (e) {
//         console.error("Error Updating Url Status: ", e);
//         return res.status(500).json({
//             error: true,
//             message: e.message
//         })
//     }
// })

// Update Url Active Status by Admin and no need to crate new url status just update the existing one
app.put("/url-active", authenticateToken, async (req, res) => {
    const {
        urlStatus
    } = req.body;

    if (urlStatus === undefined) {
        console.log("Url Status: ", urlStatus);
        return res.status(404).json({
            error: true,
            message: "Url Status Required"
        })
    }

    try {
        const updateRegister = await Register.findOneAndUpdate({
            _id: '6690d11dca22d9a163b0475e'
        }, {
            activeStatus: urlStatus
        }, {
            new: true
        })

        if (!updateRegister) {
            return res.status(404).json({
                error: true,
                message: "Url Status Not Found"
            })
        }

        return res.json({
            updateRegister,
            error: false,
            message: "Url Status Updated Successfully"
        })
    } catch (e) {
        console.error("Error Updating Url Status: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

// Get Url Active Status for Public Routes no need to authenticate
app.get("/url-active", async (req, res) => {
    try {
        const register = await Register.find()
        return res.json({
            register,
            error: false,
            message: "Url Status Get Successfully"
        })
    } catch (e) {
        console.error("Error Getting Url Status: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

// Works Page
app.post("/works", authenticateToken, async (req, res) => {
    const {
        workType,
        workTitle,
        workDescription,
        workImage,
        workVisitUrl,
        workGithubUrl
    } = req.body;

    if (!(workType || workTitle || workDescription || workImage || workVisitUrl || workGithubUrl)) {
        return res.status(404).json({
            error: true,
            message: "All Fields are Required"
        })
    }

    try {
        const newWorks = new Works({
            workType,
            workTitle,
            workDescription,
            workImage,
            workVisitUrl,
            workGithubUrl
        })
        await newWorks.save();
        return res.json({
            error: false,
            message: "Work Created Successfully"
        })
    } catch (e) {
        console.error("Error Creating Work: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

app.get("/works", async (req, res) => {
    try {
        const works = await Works.find()
        return res.json({
            works,
            error: false,
            message: "Works Get Successfully"
        })
    } catch (e) {
        console.error("Error Getting Works: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

app.delete("/works/:id", authenticateToken, async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const deleteWork = await Works.findByIdAndDelete(id)
        if (!deleteWork) {
            return res.status(404).json({
                error: true,
                message: "Work Not Found"
            })
        }
        return res.json({
            error: false,
            message: "Work Deleted Successfully"
        })
    } catch (e) {
        console.error("Error Deleting Work: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})


// Contact Page
const sanatizeInput = (input) => {
    return input.replace(/<script>/g, "").replace(/<[^>]*>?/g, "").replace(/&[^;]+;?/g, "")
}

app.post("/contact", async (req, res) => {
    const {
        fullName,
        email,
        subject,
        message
    } = req.body;

    if (!(fullName || email || subject || message)) {
        return res.status(404).json({
            error: true,
            message: "All Fields are Required"
        })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(404).json({
            error: true,
            message: "Invalid Email"
        })
    }

    const newMessage = new Message({
        fullName: sanatizeInput(fullName),
        email: sanatizeInput(email),
        subject: sanatizeInput(subject),
        message: sanatizeInput(message)
    })

    await newMessage.save();
    return res.json({
        error: false,
        message: "Message Sent Successfully"
    })
});

app.get("/contact", async (req, res) => {
    try {
        const messages = await Message.find()
        return res.json({
            messages,
            error: false,
            message: "Messages Get Successfully"
        })
    } catch (e) {
        console.error("Error Getting Messages: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

app.delete("/contact/:id", authenticateToken, async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const deleteMessage = await Message.findByIdAndDelete(id)
        if (!deleteMessage) {
            return res.status(404).json({
                error: true,
                message: "Message Not Found"
            })
        }
        return res.json({
            error: false,
            message: "Message Deleted Successfully"
        })
    } catch (e) {
        console.error("Error Deleting Message: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
});

app.get("/contact/:id", authenticateToken, async (req, res) => {
    const {
        id
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: true,
            message: "Invalid Message ID"
        });
    }

    try {
        const messageSingle = await Message.findById(id);

        if (!messageSingle) {
            return res.status(404).json({
                error: true,
                message: "Message Not Found"
            });
        }
        return res.json({
            messageSingle,
            error: false,
            message: "Message Retrieved Successfully"
        });

    } catch (e) {
        console.error("Error Retrieving Message: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        });
    }
});

// Profile Page
app.post("/profile", authenticateToken, async (req, res) => {
    const {
        imageUrl,
        fullName,
        role,
        shortDescription,
        socalLinks,
        contacts
    } = req.body;

    if (!(imageUrl || fullName || role || shortDescription || socalLinks || contacts)) {
        return res.status(404).json({
            error: true,
            message: "All Fields are Required"
        })
    }

    try {
        const newProfile = new Profile({
            imageUrl,
            fullName,
            role,
            shortDescription,
            socalLinks,
            contacts
        })
        await newProfile.save();
        return res.json({
            error: false,
            message: "Profile Created Successfully"
        })
    } catch (e) {
        console.error("Error Creating Profile: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

app.get("/profile", async (req, res) => {
    try {
        const profile = await Profile.find()
        return res.json({
            profile,
            error: false,
            message: "Profile Get Successfully"
        })
    } catch (e) {
        console.error("Error Getting Profile: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

// update Profile to all fields or given fields(if not given then it will be previous one)
app.put("/profile/:id", authenticateToken, async (req, res) => {
    const {
        id
    } = req.params;

    const {
        imageUrl,
        fullName,
        role,
        shortDescription,
        socalLinks,
        contacts
    } = req.body;

    if (!(imageUrl || fullName || role || shortDescription || socalLinks || contacts)) {
        return res.status(404).json({
            error: true,
            message: "All Fields are Required"
        })
    }

    try {
        const updateProfile = await Profile.findOneAndUpdate({
            _id: id
        }, {
            imageUrl,
            fullName,
            role,
            shortDescription,
            socalLinks,
            contacts
        }, {
            new: true
        })

        if (!updateProfile) {
            return res.status(404).json({
                error: true,
                message: "Profile Not Found"
            })
        }

        return res.json({
            updateProfile,
            error: false,
            message: "Profile Updated Successfully"
        })
    } catch (e) {
        console.error("Error Updating Profile: ", e);
        return res.status(500).json({
            error: true,
            message: e.message
        })
    }
})