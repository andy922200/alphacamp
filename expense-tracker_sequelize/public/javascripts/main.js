// 月份與類別連動，用data-item留值，並用以下方法取代原有網址
let monthDropdownBtn = document.querySelector('.monthDropdownBtn')
if (monthDropdownBtn) {
  monthDropdownBtn.addEventListener('click', function (e) {
    let monthDropdownItem = document.querySelectorAll('.monthDropdownItem')
    for (let i = 0; i < monthDropdownItem.length; i++) {
      let item = monthDropdownItem[i]
      let categoryDropdownBtn = document.querySelector('.categoryDropdownBtn')
      let category = categoryDropdownBtn.getAttribute('data-item')
      let temp = item.getAttribute('href').split("&")
      monthDropdownItem[i].setAttribute('href', temp[0] + '&category=' + category)

    }
  })
}

let categoryDropdownBtn = document.querySelector('.categoryDropdownBtn')
if (categoryDropdownBtn) {
  categoryDropdownBtn.addEventListener('click', function (e) {
    let categoryDropdownItem = document.querySelectorAll('.categoryDropdownItem')
    for (let i = 0; i < categoryDropdownItem.length; i++) {
      let item = categoryDropdownItem[i]
      let monthDropdownBtn = document.querySelector('.monthDropdownBtn')
      let month = monthDropdownBtn.getAttribute('data-item')
      let temp = item.getAttribute('href').split("&")
      categoryDropdownItem[i].setAttribute('href', temp[0] + '&month=' + month)
    }
  })
}