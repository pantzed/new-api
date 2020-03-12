'use strict'; 

/* eslint-env node */

/**
 * Rows can be filtered by time range.  A time range has the syntax:
TIME_RANGE = [FROM:[STEP:]]TO
where:
FROM = TIME_WITH_ROUNDING.
TO = TIME_WITH_ROUNDING.
STEP = POSITIVE_INTEGER.
TIME_WITH_ROUNDING = [+]TIME.
TIME = POINT[[+-]INTEGER] | UNSIGNED_INTEGER.
POINT = now|epoch|soy|som|sow|sod|soh|sob.

If FROM is not specified, it defaults to TO.  If STEP is not specified, it defaults to 1 (second).

TIME is interpreted as follows:

now: The most recent time for which a row of data exists (including data that may still be in volatile storage).
epoch: The oldest time for which a row of data is recorded in the database. 
soy: The start of the year.
som: The start of the month.
sow: The start of the week.
sod: The start of the day.
soh: The start of the hour.
sob: The start of the billing period.  The billing day is taken from server-storage variable global.billing.start_day.  If the billing day is greater than the number of days in a month, the last day of the month is assumed to be the billing day.
UNSIGNED_INTEGER: A UNIX timestamp (seconds since January 1st, 1970 UTC).  Note that this value may be larger than 2147483647 (0x7fffffff, or January 19, 2038).
 */


const axios = require('axios');

const register = {

  getRegisterValue: (egaugeURL, apiPath, jwt) => {
    let data = axios.post(`${egaugeURL}${apiPath}`, {}, {
      headers: { Authorization: `Bearer ${jwt}` },
    }).then((res) => {
      return res.data;
    })
    return data;
  },

}

module.exports = {
  getRegisterValue: register.getRegisterValue,
}