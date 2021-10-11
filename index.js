const fetch = require('node-fetch');
require('dotenv').config();

async function getGeoJSONBox(rectInput, pIID, campaignID) {

  const data = JSON.stringify({
    operationName: null,
    variables: `{ }`,
    query: `{ 
      getGeoJSONBox(rectInput: {northEast: {lng: ${rectInput.northEast.lng}, lat: ${rectInput.northEast.lat} }, southWest: {lng: ${rectInput.southWest.lng}, lat: ${rectInput.southWest.lat}}, pIID: "${pIID}" }, campaignID: "${campaignID}")  {
        geojson {
          location{
            type
            coordinates
          }
          date
          collection_name
          pi_id
          lev19khz
        }
      }
    }`
  });

  const response = await fetch(
    'http://172.24.0.113:4000/graphql',
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'User-Agent': 'Node',
      },
    }
  );

  const json = await response.json();
  console.timeEnd("Query");

  return json;

  //console.log(json.data);
}


/**************/

async function getSpectrumData(location) {

  const data = JSON.stringify({
    operationName: null,
    variables: `{ }`,
    query: `{ 
      getSpectrumData(campaignID: "4" , objectId: "6128a2dba607f742ab5c03f8" )  {
        data
      }
      
    }`
  });

  const response = await fetch(
    'http://172.24.0.113:4000/graphql',
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'User-Agent': 'Node',
      },
    }
  );

  const json = await response.json();
  console.timeEnd("Spectrum");

  console.log(json);

  return json;

}


  
// 7.013672,40.798359,13.957032,45.903791

async function main() { 
  while (true) {
    var rectInput = {
      northEast: { lng: Math.random() + 13.90,  lat: Math.random() + 45.90 },
      southWest: { lng: Math.random() + 7.00,  lat: Math.random() + 40.5 }
    }
    console.time("Query");

    var result = await getGeoJSONBox(rectInput, "5264","1");
  }
} 
/*
async function main() { 
  while (true) {
    var location = {
      type: "Point",
      coordinates: [ 13.9, 25.9 ]
    }

    console.time("Spectrum");

    var result = await getSpectrumData(location);

  }
} 
*/
main(); 



  



