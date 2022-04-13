import express, { Application } from 'express';
import cors from "cors";

import userRoutes from '../routes/user';
import db from '../db/connection';

class Server {

  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users'
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    // Initial methods
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {

      await db.authenticate();
      console.log('Database online');

    } catch (error: any) {
      throw new Error( error );
    }
  }

  middlewares() {
    // CORS
    this.app.use( cors() );
    // Body parsing
    this.app.use( express.json() );
    // Public folder
    this.app.use( express.static('public') );
  }

  routes() {
    this.app.use( this.apiPaths.users, userRoutes );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log('Server running on port', this.port );
    });
  }

}

export default Server;
