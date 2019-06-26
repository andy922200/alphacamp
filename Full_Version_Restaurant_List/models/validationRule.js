// initialize express-validator
const { check, validationResult } = require('express-validator')

// validator array
const phonePattern = new RegExp("0[0-9]{1,2}\-[0-9]{7,8}")
const imageURLPattern = new RegExp("(https?:\/\/.*?\.(?:png|jpe?g|gif)(.*))(\w|$)", "i")
const googleMapPattern = new RegExp("https://goo.gl/maps/[A-Za-z0-9]*", "i")
const categories = ["中東料理", "日式料理", "義式料理", "美式料理", "酒吧", "咖啡", "中式料理", "韓式料理"]
let conditions =
  [
    check('inputPhone')
      .exists()
      .isLength({ min: 10 }).withMessage("請檢查輸入的電話長度")
      .custom((value) => {
        return phonePattern.test(value)
      })
      .withMessage("電話格式要為區碼-號碼，如：02-23939889"),
    check('inputRating')
      .exists()
      .isNumeric().withMessage('請確定有輸入數字')
      .custom((value) => {
        return ((value >= 0) && (value <= 5))
      })
      .withMessage("請檢查數字範圍"),
    check('inputImageURL')
      .exists()
      .custom((value) => {
        return imageURLPattern.test(value)
      })
      .withMessage('請檢查圖片網址'),
    check('inputGoogleMapURL')
      .custom((value) => {
        if (!value) {
          return true
        } else {
          return googleMapPattern.test(value)
        }
      })
      .withMessage('請檢查輸入的 Google Map 地址格式'),
    check('inputCategory')
      .exists()
      .custom((value) => {
        return (categories.indexOf(value) > -1)
      })
      .withMessage('請檢查輸入的類別是否正確')
  ]

module.exports = conditions