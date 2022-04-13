const fs = require('fs');
const axios = require('axios');

class Busquedas {

  historial = [];
  dbPath = './db/database.json';
  
  constructor() {

    this.leerDB();

  };

  get historialCapitalizado() {
    return this.historial.map( (nombre) => {
      const splits = nombre.split(' ');
      const upperCase = splits.map( (string) => {
        return string[0].toUpperCase() + string.slice(1)
      })
      return upperCase.join(' ');
    });

  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY, 
      'limit': 5,
      'language': 'es'
    }
  };

  get paramsOpenWeather() {
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'es'
    }
  };

  async ciudad( lugar = '' ) {
    
    // petición http
    try {

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
        params: this.paramsMapbox
      });

      const resp = await instance.get();
      
      return resp.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
      }));

    } catch (error) {
      return [];
      
    }
  };

  async climaLugar( lat, lon ) {

    try {

      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { 
          ...this.paramsOpenWeather,
          lat,
          lon
        }
      });

      const resp = await instance.get();
      const { weather , main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }
      
    } catch (error) {
      console.log(error)
    }
  };

  agregarHistorial( lugar = '' ) {
    // prevenir duplicados
    if ( this.historial.includes( lugar.toLocaleLowerCase() ) ){
      return;
    }
    this.historial = this.historial.slice(0,5);

    this.historial.unshift( lugar.toLocaleLowerCase() );
      
    //grabar en DB
    this.guardarDB();
  };

  guardarDB() {

    const payload = {
      historial: this.historial
    };

    fs.writeFileSync( this.dbPath, JSON.stringify( payload ));

  }

  leerDB() {

    if (fs.existsSync(this.dbPath)) {
      const info = JSON.parse( fs.readFileSync(this.dbPath, {encoding: 'utf-8'}) );
      this.historial = info.historial;
    };

    return;
  };


};

module.exports = Busquedas;