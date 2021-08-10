window.addEventListener('DOMContentLoaded', function() {
    const calculator = require('./modules/calculator'),
          forms = require('./modules/forms'),
          cards = require('./modules/cards'),
          window = require('./modules/window'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

    calculator();
    forms();
    cards();
    window();
    slider();
    tabs();
    timer();
});