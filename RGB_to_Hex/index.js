const redInput = document.querySelector('#red')
const greenInput = document.querySelector('#green')
const blueInput = document.querySelector('#blue')
const convert = document.getElementById('convert')
const dataPanel = document.getElementById('dataPanel')
const resultSquare = document.querySelector('.resultSquare')
//console.log(resultSquare)

// button Listener
convert.addEventListener('click', event => {
  let red = Number(redInput.value)
  let green = Number(greenInput.value)
  let blue = Number(blueInput.value)
  if (redInput.value.length === 0 || greenInput.value.length === 0 || blueInput.value.length === 0) {
    alert("請記得在每一格輸入數字")
  } else {
    isRangeIn(red, green, blue, 0, 255)
  }
  //console.log(typeof (red))
  if (go === true) {
    rgbToHex(red, green, blue)
  }
})

// 判斷輸入數字範圍
function isRangeIn(red, green, blue, min, max) {
  if (red < min || red > max || green < min || green > max || blue < min || blue > max || red % 1 !== 0 || green % 1 !== 0 || blue % 1 !== 0) {
    alert("必須輸入 " + min + " ~ " + max + " 之間的整數，請再試一次")
    redInput.value = ''
    greenInput.value = ''
    blueInput.value = ''
    display('')
    return go = false
  } else {
    return go = true
  }
}

//rgb to hex function
function rgbToHex(red, green, blue) {
  const rgbArray = [red, green, blue]
  result = '#' + rgbArray.map(data => {
    hexValue = data.toString(16)
    //console.log(typeof (hexValue))
    //console.log(hexValue)
    return hexValue.length === 1 ? '0' + hexValue : hexValue
  }).join('')
  //console.log(result)
  display(result)
}

//data Display
function display(result) {
  let htmlContent = ''
  htmlContent = `
    <div class="col-sm-12">
      <input type="text" readonly class="form-control-plaintext" id="hexResult" value=${result}>
    </div>
  `
  dataPanel.innerHTML = htmlContent

  let htmlContent2 = ''
  htmlContent2 = `
    <div class='resultSquare' style = "margin-left:25px; width: 85px;height: 85px; background:${result};">
    </div>
  `
  resultSquare.innerHTML = htmlContent2
}



