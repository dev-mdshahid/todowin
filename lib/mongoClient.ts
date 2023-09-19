import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

if (!uri) throw new Error("Please Add Mongo Uri to the env file");

export const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = mongoClient.db("TodoWin");
export const usersCollection = db.collection("users");
