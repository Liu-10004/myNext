import { nextPost } from '../utils/nextFetch';
const host = 'http://localhost:3003';
// const login = body => nextPost(1000, '/user/login', body);
const login = body => {
  return fetch(host + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  }).then(res => {
    console.log(res);
    if (res) {
      return res.json();
    }
  });
};

const singout = () => {
  return fetch(host + '/user/singout').then(res => {
    if (res) {
      return res.json();
    }
  });
};

const checkLogin = () => {
  return fetch(host + '/user/checkLogin').then(res => {
    if (res) {
      return res.json();
    }
  });
};

export { login, singout, checkLogin };
