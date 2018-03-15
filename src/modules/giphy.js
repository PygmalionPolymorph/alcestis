import { regexRule } from '../speech';

const apiKey = 'RedZhhYuOv3MEmFwOvZzmIsqaESIwb9P';

export const getGif = (searchterm) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchterm}&limit=30&offset=0&rating=R&lang=en`;
  return fetch(url)
    .then(res => res.text())
    .then(JSON.parse)
    .then(x => x['data'][Math.floor(Math.random() * 30)]['images']['original']['url']);
}

export const setGif = (searchterm) => {
    getGif(subject).then(url => {
      document.querySelector('.js-gifcontainer').src = `${url}`;
    });
}

export const giphy = regexRule('of (a|the) (.*)$|as', 2, setGif);
