const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

const test = (word, sentence) => {
  return new RegExp(word).test(sentence);
}

const parse = (grammar) => (input) => {
  console.log('Parsing ', input);
  for (let keyword of Object.keys(grammar)) {
    const hit = test(keyword, input);
    if (hit) {
      console.log('hit!');
      const next = grammar[keyword];
      console.log(next, typeof next);
      if (typeof next === 'function') {
        console.log('its a function', next(input));
        return next(input);
      } else {
        return parse(next)(input);
      }
    } else {
      console.log('I did not understand!');
    }
  }
}

export const regexRule = (regex, group, callback) => (sentence) => {
  const result = sentence.match(new RegExp(regex));
  if (result) {
    const subject = result[group];
  } else {
    console.log('Couldn\'t determine the subject!');
  }
}


export const understand = (grammar) => {
  var recognition = new SpeechRecognition();

  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString('', 1);

  recognition.grammars = speechRecognitionList;
  //recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (result) => {
    const word = result.results[result.results.length-1][0].transcript;
    console.log('I understood: ', word);
    parse(grammar)(word);
  }

  recognition.onnomatch = (event) => {
    console.log('no match');
  }
  recognition.onsoundstart = (event) => {
    console.log('soundstart');
  }
  recognition.onspeechstart = (event) => {
    console.log('speechstart');
  }
  recognition.onsoundend = (event) => {
    console.log('soundend');
  }
  recognition.onspeechend = (event) => {
    console.log('speechend');
  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

  return recognition;
}
