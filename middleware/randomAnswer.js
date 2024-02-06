const axios = require('axios');

function getRandomWord() {
  return axios.get('https://pictionar-eh-api-7e9c6522d932.herokuapp.com/api/answers/random')
    .then(res => {
      console.log(res.data.word);
      return res;
    });
}

module.exports = { getRandomWord };