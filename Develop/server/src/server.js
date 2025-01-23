import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
// Import the routes
import routes from './routes/index.js';
import logMethod from './middleware/logMethod.js';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
// Assign the port.
const PORT = process.env.PORT || 3001;

// assign the Express server to 'app' variable
const app = express();

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log requests for testing
app.use(logMethod);

// TODO: Serve static files of entire client dist folder (THIS WORKS, Do Not Alter)
app.use(express.static(path.join(__dirname, '../../client/')));

// TODO: Implement middleware to connect the routes (THIS WORKS, Do Not Alter)
app.use(routes);

// Start the server on the port (THIS WORKS, Do Not Alter)
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`)); 

// I believe this page is done...
