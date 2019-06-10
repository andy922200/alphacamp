// generate_password.js
function generatePassword(options) {
  // define things users want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/'

  // create a collection to store
  let collection = []
  if (options.lowercase === 'on') {
    collection = collection.concat(lowerCaseLetters.split(''))
  }
  if (options.uppercase === 'on') {
    collection = collection.concat(upperCaseLetters.split(''))
  }
  if (options.numbers === 'on') {
    collection = collection.concat(numbers.split(''))
  }
  if (options.symbols === 'on') {
    collection = collection.concat(symbols.split(''))
  }
  if (options.excludeCharacters) {
    collection = collection.filter(character => {
      return !options.excludeCharacters.includes(character)
    })
  }

  // to generate an index for collection
  function sample(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  // return error while the collection is empty.
  if (collection.length === 0) {
    return "There is no valid characters in your selection."
  }

  // start generate the password
  let password = ''
  for (let i = 0; i < options.length; i++) {
    password += sample(collection)
  }

  // return the result
  //console.log('password', password)
  return password
}

// export generatePassword result
module.exports = generatePassword