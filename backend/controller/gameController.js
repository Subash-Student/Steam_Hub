import gameModel from "../model/gameModel.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs"

// Get all games
export const getAllGames = async (req, res) => {
  try {
    const games = await gameModel.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games", error });
  }
};



// Get single game by ID
export const getGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    if (!isValidIdFormat(gameId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const game = await gameModel.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });

    res.status(200).json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: "Error fetching game", error });
  }
};

function isValidIdFormat(id) {
  // Implement ID format validation logic here
  return /^[a-fA-F0-9]{24}$/.test(id);
}

// Admin login (basic example)
export const adminLogin = async (req, res) => {

    const { username, password } = req.body;
  
    // Basic input validation and sanitization
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: "Invalid input type" });
    }
  
    const sanitizedUsername = username.trim();
    const sanitizedPassword = password.trim();
    
    const adminUser = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD }; // Hashed password
  
    try {
      if (sanitizedUsername === adminUser.username && sanitizedPassword === adminUser.password) {
        return res.status(200).json({ message: "Login successful" });
      }
      console.warn(`Failed login attempt for username: ${sanitizedUsername}`);
      res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
      res.status(500).json({ message: "Login error", error });
    }
  };

// Add a new game with Cloudinary image upload
export const addGame = async (req, res) => {
  try {
    const { name, category, description, publisher, releaseDate, rating, cutyLinks, accounts, clicks, } = req.body;
    
    // Validate input fields
    if (!name || typeof name !== 'string') return res.status(400).json({ message: "Invalid or missing 'name'" });
    if (!category || typeof category !== 'string') return res.status(400).json({ message: "Invalid or missing 'category'" });
    if (!description || typeof description !== 'string') return res.status(400).json({ message: "Invalid or missing 'description'" });
    if (!publisher || typeof publisher !== 'string') return res.status(400).json({ message: "Invalid or missing 'publisher'" });
    if (!releaseDate || isNaN(Date.parse(releaseDate))) return res.status(400).json({ message: "Invalid or missing 'releaseDate'" });
    if (!rating || typeof rating !== 'number') return res.status(400).json({ message: "Invalid or missing 'rating'" });
    if (!req.file) return res.status(400).json({ message: "Image file is required" });
    
    const imageFile = req.files?.image ? req.files.image[0] : null;
    let imagePath ="";
    if(imageFile){
       imagePath = await handleFileUpload(imageFile, uploadImage, "Image");
    }

    const newGame = new Game({
      name,
      image:imagePath,
      category,
      description,
      publisher,
      releaseDate,
      rating,
      cutyLinks: cutyLinks ? cutyLinks.split(",") : [],
      accounts,
      clicks,
    
    });
    await newGame.save();
    res.status(201).json({ message: "Game added successfully", game: newGame });
  } catch (error) {
    console.error("Error adding game", error);
    res.status(500).json({ message: "Error adding game", error });
  }
};

// Edit game details
export const editGame = async (req, res) => {
  try {

    const gameId = req.params.id;
    if (!isValidIdFormat(gameId)) {
      return res.status(400).json({ message: "Invalid game ID" });
    }

    const game = await gameModel.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });

    const updatedData = req.body;

    // If there's a new image, upload it to Cloudinary
    if (req.file) {
        const imageFile = req.file;
        const imagePath = await handleFileUpload(imageFile, uploadImage, "Image");
        updatedData.image = imagePath;
    }

    const updatedGame = await gameModel.findByIdAndUpdate(gameId, updatedData, { new: true });
    await res.status(200).json({ message: "Game updated successfully", game: updatedGame });

  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ message: "Error updating game", error });
  }
};



// Delete a game
export const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    if (!isValidIdFormat(gameId)) {
      return res.status(400).json({ message: "Invalid game ID" });
    }

    const game = await gameModel.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });

    await gameModel.findByIdAndDelete(gameId);
    res.status(200).json({ message: "Game deleted successfully" });

  } catch (error) {
    console.error("Error deleting game", error);
    res.status(500).json({ message: `Failed to delete game with ID: ${req.params.id}`, error });
  }
};








// Function to handle file uploads
const handleFileUpload = async (file, uploadFunction, type) => {
    if (file) {
        try {
            const result = await uploadFunction(file);
            if (!result?.success) {
                throw new Error(`${type} upload failed`);
            }
            return result.url;
        } catch (error) {
            console.error(`Error during ${type} upload:`, error);
            throw new Error(`${type} upload encountered an error`);
        }
    }
    return null;
};




async function uploadImage(file) {
    return new Promise((resolve, reject) => {
        if (!file?.buffer) {
            return reject({ success: false, message: "Invalid image file" });
        }

        const safeFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "image-files",
                resource_type: "image",
                public_id: safeFilename, // Unique filename to avoid conflicts
            },
            (error, result) => {
                if (error) {
                    console.error("Image upload error:", error);
                    return reject({ success: false });
                }
                resolve({ success: true, url: result.secure_url });
            }
        );

        // Convert the buffer to a readable stream and pipe it to Cloudinary
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}