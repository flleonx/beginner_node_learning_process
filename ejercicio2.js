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

const getSalario = ( id ) => {
  return new Promise( ( resolve , reject ) => {
    const salario = salarios.find( ( (empleado) => empleado.id === id ))?.salario;

    ( salario )
      ? resolve( salario )
      : reject( `El usuario ${id} no existe` )
  });
};

getSalario( 3 )
  .then( ( salario ) => console.log( salario ))
  .catch( (err) => console.log(err) );