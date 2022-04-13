const express = require("express");
const cors = require('cors');
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.server = require('http').createServer( this.app );
    this.io = require('socket.io')( this.server );

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Sockets
    this.sockets_events();
  };

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Public directory
    this.app.use( express.static('./public') );

  };

  routes() {
    // Routes
    // this.app.use( this.paths.auth, require('../routes/auth'));
  };

  sockets_events() {
    this.io.on('connection', socketController );
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`App running on port`, this.port);
    });
  };
};

module.exports = Server;
