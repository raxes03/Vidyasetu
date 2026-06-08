const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const CollegeInfo = require('../models/form'); // Import the college model

const apikey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
})

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
}

router.post('/chatGemini', async (req, res) => {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    })

    const result = await chatSession.sendMessage(req.body.message);
    res.send({ status: "Ok", data: result.response.text() });
})

router.post("/chats", async (req, res) => {
    try {
        // Extract the user's message
        const userMessage = req.body.message.trim().toLowerCase(); // Normalize the message for easier comparison
        // const userMessage = req.body.message.trim(); // Normalize the message for easier comparison
        // Check if the message is "hi" or "hello"
        if (userMessage === "hi" || userMessage === "hello") {
            return res.send({
                status: "Ok",
                data: "May I help you?",
            });
        }
        // Extract the city from the user's message
        // const city = req.body.message.trim();
        const city = userMessage;
        // Query MongoDB to find colleges by city
        const collegesInCity = await CollegeInfo.find({ city });

        // Check if colleges are found for the provided city
        if (collegesInCity.length > 0) {
            const collegeDetails = collegesInCity
                .map((college) => {
                    return `
                    Name: ${college.collegeName}\n
                    Code: ${college.collegeCode}\n
                    Location: ${college.collegeLocation}\n
                    Departments: ${college.numberOfDepartments}\n
                    Email: ${college.collegeEmail}\n
                    Phone: ${college.collegePhone}\n
                    Website: ${college.collegeWebsite}\n
                    Person: ${college.collegePerson}\n
                    Duration: ${college.courseDuration}\n
                    Branches: ${college.branchName}\n
                    Fee: ${college.fee}\n
                    Placements: ${college.placements}\n
                    Scholarship: ${college.scholarship}\n`
                })
                .join("\n\n");

            const collegeImages = collegesInCity
                .map((college) => {
                    return `${college.img}`;
                })
                .join("\n\n");
            // Return the found college data
            res.send({
                status: "Ok",
                data: collegeDetails,
                dataImg: collegeImages,
            });
        } else {
            //If no colleges are found, use Gemini AI to reply intelligently
            const chatSession = model.startChat({
                generationConfig,
                history: [],
            });

            const result = await chatSession.sendMessage(
                `No data found for ${city}. Could you provide more information on this city's polytechnic colleges?`
                // city
            );
            const responseText = await result.response.text();

            res.send({
                status: "Ok",
                data: responseText,
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "Error",
            message: error.message,
        });
    }
});


module.exports = router; // Export the router