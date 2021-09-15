// import { runServer } from "./server";
const runServer = require("./server");

const port = parseInt(process.env.PORT || 3001);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/diaryV1';
runServer(port, mongoUri).catch(console.error);