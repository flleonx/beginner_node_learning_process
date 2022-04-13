const { Socket } = require("socket.io");
const { checkJWT }  = require("../helpers");
const { ChatInfo } = require("../models");

const chatMessages = new ChatInfo();

const socketController = async ( socket = new Socket(), io ) => {

  const user = await checkJWT(socket.handshake.headers['x-token']);
  if ( !user ) {
    return socket.disconnect();
  }

  // Add the connected user
  chatMessages.connectUser( user );
  io.emit('active-users', chatMessages.usersArr );
  socket.emit('get-messages', chatMessages.last10 );

  // Connect the client to a special room
  socket.join( user.id ); // rooms: global, socket.id, user.id

  // Clean when someone disconnect
  socket.on('disconnect', () => {
    chatMessages.disconnectUser( user.id );
    io.emit('active-users', chatMessages.usersArr );
  });


  socket.on('send-message', ({ uid, message }) => {

    if ( uid ) {
      // Private message
      socket.to( uid ).emit( 'private-message', { from: user.name, message } );

    } else {
      chatMessages.sendMessage( user.id, user.name, message );
      io.emit('get-messages', chatMessages.last10 );
    }


  });

};

module.exports = {
  socketController
};
