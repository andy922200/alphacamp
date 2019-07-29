// initialize express-validator
const { check, validationResult } = require('express-validator')

let recordFormCheck = [
  check('contentName')
    .isLength({ min: 1 })
    .withMessage('請記得輸入名稱'),
  check('date')
    .isLength({ min: 1 })
    .withMessage('請記得選擇日期'),
  check('amount')
    .custom((value) => {
      return (value > 0)
    }).withMessage('請輸入大於0的數字')
]

module.exports = { recordFormCheck }