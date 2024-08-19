import fs from 'fs/promises';
import { imageToBase64 } from '../utils/imageToBase64.js';
import { anthropic } from '../config/anthropicConfig.js';

async function analyzeImage(file) {
    const imageBase64 = await imageToBase64(file)
    const messages = [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: `Analyze this image:
  1. Is it related to hair loss/thinning? (Yes/No)
  Please format your response as a JSON object with the following structure:
  {
    "isHairfall": true/false,
  }
  `
                },
                {
                    type: "image",
                    source: {
                        type: "base64",
                        media_type: file.mimetype,
                        data: imageBase64
                    }
                }
            ]
        }
    ];

    const response = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: messages
    });

    // Delete the file after processing
    await fs.unlink(file.path);

    return JSON.parse(response.content[0].text);
}

async function generateDetailedReport(file) {
    const imageBase64 = await imageToBase64(file);

    const messages = [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: `Analyze this scalp image as a dermatologist:
  
  Baldness Stage: Estimate using Norwood scale for male pattern baldness
  Hair Density: Provide a general assessment (e.g. normal, moderately reduced, severely reduced)
  Scalp Condition: Note any visible issues (e.g. normal, dry, inflamed, scaling)
  Risk Factor: Rate progression risk on a scale of 1-5
  Key Observations: List 2-3 significant findings
  Recommendations: Suggest 2-3 next steps or treatment options
  Provide concise answers for each point, avoiding overly specific numeric estimates that can't be accurately determined from a single image. Limit each response to 10-15 words.
  
  Please format your response as a JSON object with the following structure:
  {
    "baldnessStage": "",
    "hairDensity": "",
    "scalpCondition": "",
    "riskFactor": "",
    "keyObservations": ["observation1", "observation2", "observation3"],
    "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
  }
  `
                },
                {
                    type: "image",
                    source: {
                        type: "base64",
                        media_type: file.mimetype,
                        data: imageBase64
                    }
                }
            ]
        }
    ];

    const response = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: messages
    });

    // Delete the file after processing
    await fs.unlink(file.path);

    return JSON.parse(response.content[0].text);
}


export {
    analyzeImage,
    generateDetailedReport
}
