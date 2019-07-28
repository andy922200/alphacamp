const hbars = require('handlebars')

//customized if/else, options.fn() & options.inverse() are methods.
hbars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
})