const hbs = require('hbs');

hbs.registerHelper('checkCondition', (comment, options) => {
  if (!comment) {
    return options.inverse(this);
  }
  return options,fn(this);
});