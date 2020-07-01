import { nextFetch, nextPost } from '../utils/nextFetch';
import fetch from 'isomorphic-unfetch';
const host = 'http://localhost:3003';

const domain = '';

const getWords = url =>
  nextFetch(1000, url).then(res => {
    if (res) {
      let resData = res.json();
      return resData;
    } else {
      res.send('去登录');
    }
  });

const fetchPersons = () => {
  return nextFetch(3000, '/person/fetchPersons').then(res => {
    if (res) {
      return res.json();
    }
  });
};

const delPerson = id =>
  fetch(host + '/person/delPerson', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;utf-8;'
    },
    body: JSON.stringify(id)
  }).then(res => {
    if (res) {
      console.log(res);
      return res.json();
    }
  });

export { getWords, fetchPersons, delPerson };
