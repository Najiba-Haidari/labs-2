import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://nhaidari089:nunaIPSEiqhJ2j6r@cluster0.002bsuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;
