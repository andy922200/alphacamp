// database
const target = ['工程師', '設計師', '創業家']
const task = {
  developer: ['加個按鈕', '加新功能', '切個版', '改一點 Code', '週末加班', '抓個 bug', '加幾行 Code', '跑個數據', '寫個程式', '寫個範本'],
  designer: ['畫一張圖', '改個 logo', '順便幫忙設計一下', '隨便換個設計', '簡單畫幾筆', '配個顏色', '想點圖案什麼的', '對於發揮想像力這檔事', '來個草稿', '畫個創意角色'],
  entrepreneur: ['週末加班', '要能賺錢', '想個 Business Model', '找創投(VC)募錢', '找個忠心員工', '控制成本', '面對股東', '提高績效', '想個新產品', '紓解壓力']
}
const phrase = ['很簡單的', '很容易的', '很快的', '很正常的', "如同一塊蛋糕般 Easy", '難不倒的', '不難，只是你不用心', '很輕鬆的', '是家常便飯', '天經地義']

// to generate an index to collect a result in an array
function GenerateResult(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateTrashTalk(option) {
  let phraseResult = GenerateResult(phrase)
  let targetResult = ''
  let taskResult = ''
  let collection = ''

  if (!option[0]) {
    collection = '請記得勾選選項喔！'
    return collection
  }

  if (option.length >= 2) {
    collection = '放下過多的憤怒，一次選一個就好，感恩。'
    return collection
  }

  if (option[0] === 'developer') {
    targetResult = target[0]
    taskResult = GenerateResult(task.developer)
  }
  if (option[0] === 'designer') {
    targetResult = target[1]
    taskResult = GenerateResult(task.designer)
  }
  if (option[0] === 'entrepreneur') {
    targetResult = target[2]
    taskResult = GenerateResult(task.entrepreneur)
  }

  collection = '身為一個' + targetResult + '，' + taskResult + '，' + phraseResult + '！'

  return collection
}

//module export
module.exports = generateTrashTalk