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

let registerFormCheck = [
  check('email')
    .isEmail().withMessage("請輸入正確的 Email 格式"),
  check('password')
    .isLength({ min: 8 }).withMessage("請至少輸入八位英數字")
]

module.exports = { recordFormCheck }