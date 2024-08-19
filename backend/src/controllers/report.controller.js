import { User } from './../model/user.model.js';
import { Report } from './../model/report.model.js';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { analyzeImage, generateDetailedReport } from '../services/anthropicService.js'
import { imageToBase64 } from '../utils/imageToBase64.js';
import { asyncHandler } from '../utils/asyncHandler.js'

/* 
    1) Get the image
    2) Send to the API
    3) Get the result whether image is of hairfall or not
    4) If yes the send success response
    5) If not then send error
*/
const analyzeImageController = asyncHandler( async (req, res) => {
    if(!req.file) {
        throw new ApiError(400, "No file Uploaded")
    }

    const result = await analyzeImage(req.file);
    console.log("Result of image analysis is: ", result)

    return res.status(201).json(
        new ApiResponse(200, {isHairfall: result.isHairfall}, "Image is of hairfall")
    )
});

/*
    1) Get the image
    2) Get all the user details
    3) Save user details to DB
    4) Send the details to API
    5) Get the report
    6) Save report to DB
    7) Send report to frontend
*/
const generateDetailedReportController = asyncHandler( async (req, res) => {
    if(!req.file) {
        throw new ApiError(400, "No file Uploaded")
    }

    const convertedImg = await imageToBase64(req.file)

    const { username, email, number, gender, dob, familyHistory, stressLevel } = req.body
    if(
        [ username, email, number, dob, gender, familyHistory, stressLevel ].some((field) => (
            field.trim() === ""
        ))
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.create({
        username,
        email, 
        number, 
        gender,
        image: convertedImg, 
        dob, 
        familyHistory, 
        stressLevel
    })

    const createdUser = await User.findById(user._id);
    
    if(!createdUser) {
        throw new ApiError(500, "Error in creating user")
    }

    const report = await generateDetailedReport(req.file)
    if(!report) {
        throw new ApiError(500, "Error generating report")
    }

    const newReport = await Report.create({
        userId: createdUser._id,
        report
    })
    const createdReport = await Report.findById(newReport._id)
    if(!createdReport) {
        throw new ApiError(500, "Error in saving report")
    }

    return res.status(200).json(
        new ApiResponse(200, createdReport, "Report created successfully")
    )
});


export {
    analyzeImageController,
    generateDetailedReportController
}