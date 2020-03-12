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

module.exports = {
  secureAuth: auth.secureAuth,
  digestAuth: auth.digestAuth
}