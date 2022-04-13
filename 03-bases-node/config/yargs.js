const argv = require("yargs")
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: "Es la base de la tabla de multiplicar"
  })
  .option('l', {
    alias: 'list',
    type: 'boolean',
    default: false,
    demandOption: false,
    describe: "Muestra la tabla en consola"
  })
  .option('h', {
    alias: 'hasta',
    type: 'number',
    demandOption: true,
    describe: "Punto hasta donde llega la tabla"
  })
  .check( (argv, option) => {
    if ( isNaN( argv.b) ) {
      throw 'La base tiene que ser un número'
    }
    if ( typeof argv.l !== 'boolean' ) {
      throw 'La lista debe ser un booleano'
    }
    if ( isNaN( argv.h ) ) {
      throw 'Hasta tiene que ser un número'
    }

    return true;
  })
  .argv;

module.exports = argv;