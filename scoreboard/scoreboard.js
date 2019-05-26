let players = [
  { name: '櫻木花道', pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: '流川楓', pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: '赤木剛憲', pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: '宮城良田', pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: '三井壽', pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
]

// write your code here
// 顯示表格，裡頭要有一個新增球員資料的功能
function displayPlayerList(data) {
  let htmlContent = ''
  for (let i = 0; i < data.length; i++) {
    htmlContent += `
    <tr>
      ${addNewRow(data[i])}
    </tr>
    `
  }
  dataPanel.innerHTML = htmlContent
}

function addNewRow(player) {
  let rowContent = ''
  // 加入球員資料到表格中
  const value = Object.keys(player)

  for (let i = 0; i < value.length; i++) {
    // value[i] 取得 key 的名稱, 再用${}取裡頭的value
    rowContent += `<td>
    <span>${player[value[i]]}</span>
    `
    if (value[i] !== 'name') {
      rowContent += `
      <span class="fa fa-minus-circle"></span>
      <span class="fa fa-plus-circle"></span>`
    }
    rowContent += `
      </td>
    `
  }
  return rowContent
}

const dataPanel = document.querySelector('#data-panel')
displayPlayerList(players)

// 設置監聽+-事件
const table = document.querySelector('table')
table.addEventListener('click', function (event) {
  let figure = event.target.parentElement.children[0]
  if (event.target.classList.contains('fa-minus-circle')) {
    figure.innerHTML = Number(figure.textContent) - 1
  } else if (event.target.classList.contains('fa-plus-circle')) {
    figure.innerHTML = Number(figure.textContent) + 1
  }
})