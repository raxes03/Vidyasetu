const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const CollegeForm = require('../models/form');

const externalUserId = process.env.ON_DEMAND_USER;
const apikeyOnDemand = process.env.ON_DEMAND_API_KEY;

const createChatSession = async () => {
    try {
        const response = await axios.post("https://api.on-demand.io/chat/v1/sessions", {
            pluginIds: [],
            externalUserId: externalUserId
        }, {
            headers: {
                apikey: apikeyOnDemand
            }
        })

        const sessionId = response.data.data.id;
        console.log('Session ID:', sessionId);
        return sessionId;
    } catch (err) {
        console.error('Error creating chat session:', err);
    }
}

router.post("/chat", async (req, res) => {
    try {
      // Extract and normalize the user's message
      const userMessage = req.body.message.trim().toLowerCase();
  
      // Basic greeting response
      if (userMessage === "hi" || userMessage === "hello") {
        return res.send({
          status: "Ok",
          data: "May I help you?",
        });
      }
  
      // Extract the city name from the user message
      const city = userMessage;
  
      // Query MongoDB to find colleges by city
      const collegesInCity = await CollegeForm.find({ city });
  
      // Check if colleges are found in MongoDB
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
            Scholarship: ${college.scholarship}\n
            `;
          })
          .join("\n\n");
  
        const collegeImages = collegesInCity
          .map((college) => `${college.img}`)
          .join("\n\n");
  
        // Return the college data found in MongoDB
        return res.send({
          status: "Ok",
          data: collegeDetails,
          dataImg: collegeImages,
        });
      } else {
        // Call the on-demand agent API if no data found in MongoDB
        const sessionId = await createChatSession();
        // const agentResponse = await fetchFromAgent(sessionId,city);
        // const agentResponse = await submitQuery(sessionId, city);
        const result = await axios.post(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
          endpointId: 'predefined-openai-gpt4o',
          query: `${city}?`,
          pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
          responseMode: 'sync'
        }, {
          headers: {
            apikey: apikeyOnDemand
          }
        });
        // Respond based on the agent API result
        // const responseText = result.data.data.messages[0].content
        const responseText = result.data.data.answer;
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
  })

module.exports = router;