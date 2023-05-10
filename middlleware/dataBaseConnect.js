const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()

const params_connect_bdd = {
    host: process.env.BDD_MONGO_HOST,
    user: process.env.BDD_MONGO_USER,
    password: process.env.BDD_MONGO_PASSWORD,
    cluster: process.env.BDD_MONGO_CLUSTER,
    rules: process.env.BDD_MONGO_RULES,
}
// console.log(params_connect_bdd)
const uriold = "mongodb+srv://magincode:9mw0ALexxQXxBOqg@cluster.w2ooe0t.mongodb.net/?retryWrites=true&w=majority"
const uri = `${params_connect_bdd.host}://${params_connect_bdd.user}:${params_connect_bdd.password}@${params_connect_bdd.cluster}.mongodb.net/?${params_connect_bdd.rules}`


const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);