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
    'http://mybusnago.duckdns.org:4000/graphql',
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

main(); 



  



