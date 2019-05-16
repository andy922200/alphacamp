const movies = [{
  title: 'The Avengers',
  image: 'https://bit.ly/2NQOG6H',
  rating: 0
},
{
  title: 'Our Times',
  image: 'https://bit.ly/2OsGmv2',
  rating: 0
},
{
  title: 'Aquaman',
  image: 'https://bit.ly/2zmcLxo',
  rating: 0
}]

function createTableHeader() {
  // create table
  const table = document.createElement('table')
  table.className = 'table'

  // create header 
  const row = document.createElement('tr')
  table.appendChild(row)

  // (表頭為th,其他為td)
  const header = ['Image', 'Title', 'Ratings']
  for (let i = 0; i < header.length; i++) {
    const cell = document.createElement('th')
    row.appendChild(cell)
    cell.innerHTML = header[i]

    if (header[i] === undefined) {
      cell.innerHTML = ''
    }
  }
  return table
}

function addRow(data) {
  // 創造新電影資料 (tr)
  const row = document.createElement('tr')

  // 輸入資料到表格 (td)
  row.appendChild(document.createElement('td')).innerHTML = `<img src = ${data.image} width = "70" class="img-thumbnail" >`
  row.appendChild(document.createElement('td')).innerHTML = data.title
  const ratingIcon = `
  <span class="fa fa-thumbs-up"></span>
  <span class="fa fa-thumbs-down px-2"></span>
  <span>${data.rating}</span>
`
  row.appendChild(document.createElement('td')).innerHTML = ratingIcon

  table.appendChild(row)

  // add delete button to be used later on to remove a row
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'X'
  deleteButton.classList.add('btn', 'btn-sm', 'btn-danger')
  row.appendChild(document.createElement('td')).appendChild(deleteButton)

  return row
}

// select element from html template
const dataPanel = document.querySelector('#data-panel')

// append html content to data panel
const table = createTableHeader()
dataPanel.appendChild(table)

// display movie list
for (let i = 0; i < movies.length; i++) {
  table.appendChild(addRow(movies[i]))
}



