import './style/main.less';

import { domReady } from './binding';
import { understand } from './speech';

import { bgcolor } from './modules/bgcolor';
import { giphy } from './modules/giphy';

const grammar = {
  'background': {
    'gif': giphy,
    'color': bgcolor,
  },
};

const recognition = understand(grammar);

/**
 * BINDING
 */
domReady(() => {
  document.querySelectorAll('.js-startRecognition')[0].addEventListener('click', () => {
    recognition.start();
  });
});
