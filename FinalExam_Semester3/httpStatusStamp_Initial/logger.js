// logger.js
const express = require('express')
const app = express()

//Unix時間轉換器
function unixChange() {
  timeData = Date.now()
  let date = new Date(timeData);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate();
  // Hours part from the timestamp
  let hours = date.getHours(); // 根據所在地時區顯示
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();
  // Will display time in format
  let formattedTime = year + "-" + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
  return formattedTime
}

const logger = function (req, res, next) {
  console.log(unixChange() + ' | ' + req.originalMethod + ' from ' + req.url)
  next()
}

module.exports = logger