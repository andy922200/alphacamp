//initialize handlebars (not express-handlebars)
const Handlebars = require('handlebars')

//customized if/else, options.fn() & options.inverse() are methods.
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
})