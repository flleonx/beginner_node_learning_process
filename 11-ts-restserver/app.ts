import dotenv from 'dotenv';
import Server from './models/server';

// dot.env config
dotenv.config();

const server = new Server();

server.listen();
