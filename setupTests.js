const Enzyme = require('enzyme');
const Adapter = require('./ReactSixteenAdapter');

Enzyme.configure({
  adapter: new Adapter()
});
