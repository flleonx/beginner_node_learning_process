const salarios = [
  {
    id: 1,
    salario: 1000
  },
  {
    id: 2,
    salario: 1500
  },
];

const getSalario = ( id, callback ) => {
  const salario = salarios.find( (user) => user.id === id)?.id;
  console.log(salario)

  if ( salario ) {
    return callback( null, salario);
  }
  else  {
    return callback(`El usuario con id: ${id} no existe`);
  }
};

const id = 2;

getSalario( id , ( err, salario ) => {
  
  if ( err ) {
    return console.log(err);
  }
 
  console.log(`El usuario ${salario.id} tiene un salario de ${salario.salario}`);

})