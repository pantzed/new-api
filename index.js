/**
 * egauge api helper
 * 
 * handle https authentication
 * * post user, pass, realm
 * * store returned jwt, refresh as necessary
 * 
 */

 'use strict'; 
 
 /* eslint-env node */
 
 
 const { secureAuth, digestAuth }= require('./services/auth');
 const { customPath } = require('./services/capture');

 let url = 'https://egaug3r.egaug.es/';
 let user = 'ed';
 let pass = 'ed@eGauge123';
 let realm = 'egauge Administration';


//  let output = secureAuth(url, realm, user, pass).then((res) => {return res}).catch(error => {console.log(error);});

//  console.log('output', output);
 

 let digestOutput = digestAuth(url, user, pass);

//  let secureOutput = secureAuth(url, user, pass);

//  let simpleDataCall = customPath(url)

const egaugeAPI = {
  secureAuth: secureAuth,
  digestAuth: digestAuth,
  customPath: customPath
}

module.exports = egaugeAPI;

exports = {
  secureAuth: secureAuth,
  digestAuth: digestAuth,
  customPath: customPath
 }