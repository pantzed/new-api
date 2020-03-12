'use strict'; 

/* eslint-env node */


const axios = require('axios');

/**
 * Axios.post( 
  'http://localhost:8000/api/v1/get_token_payloads',
  bodyParameters,
  config
).then(console.log).catch(console.log);
 */

const capture = {

  customPath: async(egaugeURL, apiPath, jwt) => {
    let data = await axios.post(`${egaugeURL}${apiPath}`, {}, {
      headers: { Authorization: `Bearer ${jwt}` }
    }).then((res => {
      return res.data;
    })).catch((error) => {
      console.log(error);
    })

    return data;
  }
}

module.exports = {
  customPath: capture.customPath,
}