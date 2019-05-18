const BASE_URL = 'https://movie-list.alphacamp.io/api/v1/'
const posterBASE_URL = 'https://movie-list.alphacamp.io/posters/'
const Movies_URL = 'movies'
const genres = document.getElementById('genres')
const dataPanel = document.getElementById('dataPanel')
const genresList = { "1": "Action", "2": "Adventure", "3": "Animation", "4": "Comedy", "5": "Crime", "6": "Documentary", "7": "Drama", "8": "Family", "9": "Fantasy", "10": "History", "11": "Horror", "12": "Music", "13": "Mystery", "14": "Romance", "15": "Science Fiction", "16": "TV Movie", "17": "Thriller", "18": "War", "19": "Western" }

axios //相關的啟用 function 要放在 axios 裡，以免async特性導致資料抓不到  
  .get(BASE_URL + Movies_URL)
  .then((response) => {
    //console.log(response.data.results)
    data = response.data.results
    display(data, genresList)
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
  displayCards(data, genresList, 'Action') //載入時預設顯示
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
      displayCards(data, genresList, userChoice)
    })
  }
}

//顯示右邊的卡片清單
function displayCards(data, genresList, userChoice) {
  const genresName = Object.values(genresList)
  //console.log(genresList)
  let code = genresName.indexOf(userChoice) + 1
  //console.log(code)
  for (let i = 0; i < data.length; i++) {
    let htmlContent = ''
    if (data[i].genres.indexOf(code) >= 0) {
      //console.log(data[i].genres)
      htmlContent += `
      <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${posterBASE_URL}${data[i].image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h5 class="card-title">${data[i].title}</h5>
      `
      for (let j = 0; j < data[i].genres.length; j++) {
        htmlContent += `
          <h6><span class="badge badge-secondary">${genresList[j + 1]}</span></h6>
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
}




