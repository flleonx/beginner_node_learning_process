//HTML References
const lblDesktop = document.querySelector('h1');
const lblTicket = document.querySelector('small');
const lblQueue = document.querySelector('#lblQueue');
const btnAnswer = document.querySelector('button');
const divAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('desktop') ) {
  window.location = 'index.html';
  throw new Error('desktop is required');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;

divAlert.style.display = 'none';

const socket = io(); // TDOO: Take a look of this

socket.on('connect', () => {
  btnAnswer.disabled = false;
});

socket.on('disconnect', () => {
  btnAnswer.disabled = true;
});

socket.on('queue-tickets', ( ticketsNumber ) => {
  if ( ticketsNumber === 0 ) {
    lblQueue.style.display = 'none';
  } else {
    lblQueue.style.display = '';
    lblQueue.innerText = ticketsNumber;
  }
});

btnAnswer.addEventListener( 'click', () => {

  socket.emit( 'answer-ticket', { desktop }, ( { ok, ticket, msg } ) => {

    if ( !ok ) {
      lblTicket.innerText = `Nadie.`;
      return divAlert.style.display = '';
    }

    lblTicket.innerText = `Ticket ${ ticket.number }`

  });

  // socket.emit( 'next-ticket', null, ( ticket ) => {
  //   lblNewTicket.innerText = ticket; // TODO: Take a look of this
  // });

});
