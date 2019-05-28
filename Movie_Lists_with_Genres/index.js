const BASE_URL = 'https://movie-list.alphacamp.io/api/v1/'
const posterBASE_URL = 'https://movie-list.alphacamp.io/posters/'
const Movies_URL = 'movies'
const genres = document.getElementById('genres')
const dataPanel = document.getElementById('dataPanel')
const pagination = document.getElementById('pagination')
const ITEM_PER_PAGE = 6
const genresList = { "1": "Action", "2": "Adventure", "3": "Animation", "4": "Comedy", "5": "Crime", "6": "Documentary", "7": "Drama", "8": "Family", "9": "Fantasy", "10": "History", "11": "Horror", "12": "Music", "13": "Mystery", "14": "Romance", "15": "Science Fiction", "16": "TV Movie", "17": "Thriller", "18": "War", "19": "Western" }
let paginationData = []

axios //相關的啟用 function 要放在 axios 裡，以免async特性導致資料抓不到  
  .get(BASE_URL + Movies_URL)
  .then((response) => {
    //console.log(response.data.results)
    data = response.data.results
    display(data, genresList)
    filterMovie(data, genresList, 'Action') //載入時預設顯示
  })
  .catch((error) => console.log(error))

//顯示左邊列表，請記得物件取長度會是undefined～
function display(data, genresList) {
  let htmlContent = ''
  for (let i = 1; i < Object.keys(genresList).length + 1; i++) {
    htmlContent += `
    <a href="#" class="list-group-item list-group-item-action" id="choice">${genresList[i]}</a>
  `
  }
  genres.innerHTML = htmlContent
  //console.log(Object.keys(genresList))

  // button listener 選項監聽器
  const choices = document.querySelectorAll('#choice')
  //console.log(choices)
  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i]
    choice.addEventListener('click', function (event) {
      event.preventDefault()
      userChoice = genresList[i + 1]
      dataPanel.innerHTML = '' //記得清空內容
      //console.log(userChoice)
      filterMovie(data, genresList, userChoice)
    })
  }
}

//過濾所選資料
function filterMovie(data, genresList, userChoice) {
  const genresName = Object.values(genresList)
  let count = 0
  let choiceMovies = []
  //console.log(genresList)
  let code = genresName.indexOf(userChoice) + 1
  //console.log(code)
  for (let i = 0; i < data.length; i++) {
    if (data[i].genres.indexOf(code) >= 0) {
      choiceMovies.push(data[i])
      //console.log(choiceMovies)
    }
  }
  //console.log(choiceMovies)
  getTotalPages(choiceMovies)
  getPageData(1, choiceMovies)
}

//計算總共頁數
function getTotalPages(choiceMovies) {
  let totalPages = Math.ceil(choiceMovies.length / ITEM_PER_PAGE) || 1
  let pageItemContent = ''
  for (let i = 0; i < totalPages; i++) {
    pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
  }
  pagination.innerHTML = pageItemContent
}

//篩選出指定頁面的資料並顯示
function getPageData(pageNum, choiceMovies) {
  dataPanel.innerHTML = '' //記得先清空現有內容
  paginationData = choiceMovies || paginationData
  let offset = (pageNum - 1) * ITEM_PER_PAGE
  let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
  let htmlContent = ''
  //console.log(paginationData)
  if (paginationData.length === 0) {
    dataPanel.innerHTML = `
      <h3>此類別無資料，請點選其他選項。</h3>
    `
  }

  for (let i = 0; i < pageData.length; i++) {
    htmlContent += `
      <div class="col-sm-4">
        <div class="card mb-1">
        <img class="card-img-top " src="${posterBASE_URL}${pageData[i].image}" alt="Card image cap">
        <div class="card-body movie-item-body">
        <h5 class="card-title">${pageData[i].title}</h5>
      `

    for (let j = 0; j < pageData[i].genres.length; j++) {
      htmlContent += `
      <h6><span class="badge badge-secondary">${genresList[pageData[i].genres[j]]}</span></h6>
      `
    }
    htmlContent += `
        </div> 
      </div>
    </div>
    `
    //console.log(htmlContent)
  }
  dataPanel.innerHTML += htmlContent
}

//pagination 監聽器
pagination.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.tagName === 'A') {
    getPageData(event.target.dataset.page)
  }
})