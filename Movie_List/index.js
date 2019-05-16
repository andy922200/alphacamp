//避免變數打架, IIFE
(function () {
  //   write your code here 
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const style = document.getElementById('style')
  const ITEM_PER_PAGE = 12
  let currentStyle = 'cards'
  let page = 1
  let paginationData = []

  axios
    .get(INDEX_URL)
    .then((response) => {
      //console.log(response.data.results)
      for (let item of response.data.results) {
        data.push(item)
      }
      //console.log(data)
      //displayDataList(data,currentStyle)
      getPageData(1, data)//取得特定頁面
      getTotalPages(data)//取得總頁數

      //console.log(data.length)
    })
    .catch((error) => console.log(error))


  //取得特定頁面
  function getPageData(pageNum, data) {
    paginationData = data || paginationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
    if (currentStyle === 'cards') {
      //console.log(pageData)
      displayDataList(pageData, currentStyle)
    } else if (currentStyle === 'barList') {
      //console.log(pageData)
      displayDataList(pageData, currentStyle)
    }
  }

  function displayDataList(data, currentStyle) {
    if (currentStyle === 'cards') {
      let htmlContent = ''
      data.forEach(function (item, index) {
        htmlContent += `
      <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h6>
          </div>
          <!--"More" button -->
            <div class="card-footer">
            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
            <!-- favorite button --> 
            <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
        </div>
      </div>
      `
      })
      dataPanel.innerHTML = htmlContent
    } else if (currentStyle === 'barList') {
      //console.log('Success!')
      let htmlContent = ''
      data.forEach(function (item, index) {
        htmlContent += `
          <div class="col-sm-12">
          <div class="card mb-2">
            <div class="card-body movie-item-body">
              <h6 class="bar-title">${item.title}</h6>
              <div id='movieOption'>
                <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
                <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
        `
      })
      dataPanel.innerHTML = htmlContent
    }

  }

  //listen to search, 表單按鈕會有預設行為，若不要用需要終止
  const searchBtn = document.getElementById('submit-search')
  const searchInput = document.getElementById('search')

  searchBtn.addEventListener('click', event => {
    let results = []
    event.preventDefault()
    //console.log('click!')

    const regex = new RegExp(searchInput.value, 'i')

    results = data.filter(movie => movie.title.match(regex))
    //console.log(results)
    //console.log(results.length)
    if (results.length === 0) {
      alert('There is no results. Please Try Again')
    }
    //displayDataList(results, currentStyle)
    getTotalPages(results)
    getPageData(1, results)
  })

  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    } else if (event.target.matches('.btn-add-favorite')) {
      //console.log(event.target.dataset.id)
      addFavoriteItem(event.target.dataset.id)
    }
  })

  // listen to '#style' icons 若未點分頁來按，page預設為1
  style.addEventListener('click', (event) => {
    if (event.target.matches('.fa-bars')) {
      //console.log(event.target)
      currentStyle = 'barList'
      getPageData(page)
    } else if (event.target.matches('.fa-th')) {
      //console.log(event.target)
      currentStyle = 'cards'
      getPageData(page)
    }
  })

  // 顯示電影到螢幕上
  function showMovie(id) {
    // get elements
    const modalTitle = document.getElementById('show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
    const modalDescription = document.getElementById('show-movie-description')

    //set request url
    const url = INDEX_URL + id
    console.log(url)

    // send request to show api
    axios.get(url).then(response => {
      const data = response.data.results
      console.log(data)

      // insert data into modal ui
      modalTitle.textContent = data.title
      modalImage.innerHTML = `<img src = "${POSTER_URL}${data.image}" class="img-fluid" alt = "Responsive image"> `
      modalDate.textContent = `release at: ${data.release_date} `
      modalDescription.textContent = `${data.description} `
    })
  }

  //暫存電影ID到使用者端
  function addFavoriteItem(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = data.find(item => item.id === Number(id))

    if (list.some(item => item.id === Number(id))) {
      alert(`${movie.title} is already in your facorite list.`)
    } else {
      list.push(movie)
      alert(`Added ${movie.title} to your favorite list!`)
    }

    localStorage.setItem('favoriteMovies', JSON.stringify(list))
  }

  //計算總頁數
  const pagination = document.getElementById('pagination')

  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''

    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
        <li class = "page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}"> ${i + 1} </a>
        </li>
        `
    }
    pagination.innerHTML = pageItemContent
  }

  // listen to pagination click event
  pagination.addEventListener('click', event => {
    console.log(event.target.dataset.page)
    if (event.target.tagName === 'A') {
      getPageData(event.target.dataset.page)
      page = event.target.dataset.page // 將分頁的值儲存
    }
  })
})()