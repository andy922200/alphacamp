var should = chai.should()

describe('Test searchTitle function', function () {
  it('should return "Fizz" if the number can be multiplied by 3', function () {
    let results = fizzBuzz(6)
    results.should.be.equal('Fizz')
  })
  it('should return "Buzz" if the number can be multiplied by 5', function () {
    let results = fizzBuzz(10)
    results.should.be.equal('Buzz')
  })
  it('should return "FizzBuzz" if the number can be multiplied by 15', function () {
    let results = fizzBuzz(30)
    results.should.be.equal('FizzBuzz')
  })
  it('should return the number that user typed if the number cannot be multiplied by 3 and 5', function () {
    let results = fizzBuzz(23)
    results.should.be.equal(23)
  })
})