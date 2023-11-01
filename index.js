
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://usrnme:pswd@cluster0.yqazzxd.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to the MongoDB server');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function printAllDocuments() {
  const db = client.db('mydb'); 
  const collection = db.collection('Col'); 

  try {
    const documents = await collection.find({}).toArray();
    console.log('All documents:');
    documents.forEach((document, index) => {
      console.log(`Document ${index + 1}:`, document);
    });
  } catch (error) {
    console.error('Error retrieving documents:', error);
  }
}

async function closeConnection() {
  await client.close();
  console.log('Connection closed');
}

connect()
  .then(printAllDocuments)
  .then(closeConnection)
  .catch((error) => {
    console.error('An error occurred:', error);
  });
