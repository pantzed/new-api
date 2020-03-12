'use strict'; 

/* eslint-env node */

const axios = require('axios');
const md5 = require('md5');
const md5Hex = require('md5-hex');

const auth = {

  secureAuth: async(url, rlm, usr, pass) => {
    let jwt = await axios.post(`${url}ng/auth/login`, {
        rlm: rlm,
        usr: usr,
        pwd: pass
    }).then((res) => {
      console.log(res);
      return res.jwt;
    });
    return jwt;
  }, 

  digestAuth: async(egaugeURL, usr, pwd) => {

    // Get nnc and rlm from error response
    let { rlm, nnc } = await axios.get(`${egaugeURL}api/capture?i`)
      .then(res => { 
        return res.data.nnc 
      }).catch(error => {
        // console.log(error.response.data);
        return error.response.data;
      });

      // Random cryptographic number
      let cnnc = md5Hex(`3G@ug3R0X!!!`);
      // HA1 = MD5(USERNAME:REALM:PASSWORD)
      let ha1 = md5(`${usr}${rlm}${pwd}`);
      // HA2 = MD5(HA1:NONCE:CNONCE)
      let ha2 = md5(`${ha1}${nnc}${cnnc}`);
      

    let bodyData = {
      "rlm": rlm,
      "usr": usr,
      "nnc": nnc,
      "cnnc": cnnc,
      "hash": ha2
    }

    let stringyBodyData = JSON.stringify(bodyData);

    console.log(JSON.stringify(bodyData));

    let jwt = await axios.post(`${egaugeURL}ng/api/auth/login`, bodyData)
      .then((res) => {
        // console.log(res);
        return res.jwt;
      }).catch(error => { console.log (error.message) })
    return jwt;
  }
}

/**
 * Browser console network output for /login call
 * 
 * {"rlm":"eGauge Administration","usr":"ed","nnc":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJubmMiOiJhNzIxMjhjMDBmNzNlMDFhIiwiYmVnIjoxNTg0MDQ4MjA0LCJsdG0iOjYwfQ.Kg19zVkTeQY6zo4NHJeiRBalZMdWeVbxo2VkKqjAe-8","cnnc":"e1367ba34886f6dca3d7fcd970b150d4","hash":"edb96aea04e015b21eaf68dd0431c324"}
 */

module.exports = {
  secureAuth: auth.secureAuth,
  digestAuth: auth.digestAuth
}