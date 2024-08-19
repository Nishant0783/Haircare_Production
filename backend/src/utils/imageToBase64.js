import fs from 'fs';

async function imageToBase64(image) {
    try {
        // Check if image is an object with a path property
        const imagePath = typeof image === 'string' ? image : image.path;

        // Read the image file as a binary buffer
        const imageBuffer = fs.readFileSync(imagePath);

        // Convert the binary buffer to a base64 string
        const base64Image = imageBuffer.toString('base64');

        // Return the base64 encoded string
        return base64Image;
    } catch (error) {
        console.error("Error converting image to base64:", error);
        return null;
    }
}

export { imageToBase64 };
