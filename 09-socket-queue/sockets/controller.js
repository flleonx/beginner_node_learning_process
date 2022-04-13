
const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

  socket.emit( 'last-ticket', ticketControl.last );
  socket.emit( 'actual-state', ticketControl.last4 );
  socket.emit( 'queue-tickets', ticketControl.tickets.length );

  socket.on('next-ticket', ( payload, callback ) => {

    const next = ticketControl.next();
    callback( next );
    // TODO: We have to inform that there is a new ticket to assign
    socket.broadcast.emit( 'queue-tickets', ticketControl.tickets.length );

  });

  socket.on('answer-ticket', ( { desktop }, callback ) => {

    if ( !desktop ) {
      return callback({
        ok: false,
        msg: 'Desktop is required'
      });
    }

    const ticket = ticketControl.answerTicket( desktop );

    socket.broadcast.emit( 'actual-state', ticketControl.last4 );
    socket.emit( 'queue-tickets', ticketControl.tickets.length );
    socket.broadcast.emit( 'queue-tickets', ticketControl.tickets.length );

    if ( !ticket ) {
      callback({
        ok: false,
        msg: 'There are not queue ticket'
      });
    } else {
      callback({
        ok: true,
        ticket
      });
    }
    // callback( next );

  });

}



module.exports = {
    socketController
}
