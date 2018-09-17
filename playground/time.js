// Jan 1st 1970 00:00:00 am relative to this datetime
// milisecond

// example
// 1000 => Jan 1st 1970 00:00:01 am
const {log} = console;
const moment = require('moment');
//
// const date = moment().format('MMM do YYYY hh:mm:ss');
// log(date);
// how to use the createdAt timestamp
//const createdAt = 123;
let createdAt = moment().valueOf();
log(createdAt);

let now = moment(createdAt);
log(now);

//const date = moment(createdAt);
//log(date);

// const currentTime = date.format('h:mm a');
// log(currentTime);
