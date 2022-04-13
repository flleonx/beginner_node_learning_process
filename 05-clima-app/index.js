require('dotenv').config();
const { inquirerMenu, pausa, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {

  let opt;

  do {
    
    opt = await inquirerMenu();

    const busquedas = new Busquedas();

    switch ( opt ) {

      case 1:
        // mostrar mensaje
        const termino = await leerInput('Ciudad: ');

        // buscar lugares
        const lugares = await busquedas.ciudad( termino );

        // seleccionar lugar
        const id = await listarLugares( lugares );
        if ( id === '0') continue;
        const lugarSel = lugares.find( lugar => lugar.id === id );

        // guardar en DB
        busquedas.agregarHistorial( lugarSel.nombre );

        // obtener clima
        const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng)

        console.clear();
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad:', lugarSel.nombre.green);
        console.log('Lat:', lugarSel.lat);
        console.log('Lng:', lugarSel.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Mínima:', clima.min);
        console.log('Máxima:', clima.max);
        console.log('El clima esta:', clima.desc.green);
        break;
    
      case 2:
        busquedas.historialCapitalizado.forEach( (lugar, i) => {
          console.log(`${ (++i + '.').green } ${ lugar }`);
        });
        break;

    };

    if ( opt !== 0 ) await pausa();


  } while ( opt !== 0 );

};

main();