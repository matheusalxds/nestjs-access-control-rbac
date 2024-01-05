import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongoServer = new MongoMemoryServer();

export const MongoHelper = {
  async connect(): Promise<void> {
    await mongoServer.start();
    const uri = mongoServer.getUri();
    this.setEnvVar(uri);
    await mongoose.connect(uri);
  },
  setEnvVar(uri: string) {
    process.env.MONGO_URI = uri;
  },
  async disconnect() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  },
  async getCollections() {
    return mongoose.connection.db.collections();
  },
  async dropCollections() {
    const collections = await this.getCollections();
    if (mongoServer) {
      for (const collection of collections) {
        await collection.deleteMany({});
      }
    }
  },
  async registerModule(name: string, schema: any) {
    return mongoose.model(name, schema);
  },
};
