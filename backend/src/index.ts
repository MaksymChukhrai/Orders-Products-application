import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { setupSessionCounter } from './websockets/sessionCounter';
import { seedDatabase } from './utils/seed';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orders-products';

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors());
  app.use(express.json());

  // Connect to MongoDB
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Seed database if environment variable is set
    if (process.env.SEED_DB === 'true') {
      await seedDatabase();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  // Setup Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Setup WebSocket
  const io = setupSessionCounter(httpServer);

  // Basic route
  app.get('/', (req, res) => {
    res.send('Orders & Products API - Backend is running');
  });

  // Start the server
  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});