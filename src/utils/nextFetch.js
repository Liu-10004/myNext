import fetch from 'isomorphic-unfetch';
let controller = null;
let signal = null;
let host = 'http://localhost:3003';
let timer;
let timeoutPromise = timeout => {
  return new Promise((resolve, reject) => {
    controller = new window.AbortController();
    signal = controller.signal;
    timer = setTimeout(() => {
      // resolve(new Response('timeout', { status: 504, statusText: 'timeout ' }));
      controller.abort();
      reject(new Error('请求超时，请再次尝试'));
    }, timeout);
  });
};

let requestPromise = url =>
  fetch(host + url, {
    signal: signal
  }).then(data => {
    clearTimeout(timer);
    return data;
  });

let postPromise = (url, body) =>
  fetch(host + url, {
    signal: signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  }).then(data => {
    clearTimeout(timer);
    return data;
  });

const nextFetch = (timeout, url, body) => {
  return Promise.race([timeoutPromise(timeout), requestPromise(url)]);
};
const nextPost = (timeout, url, body) => {
  return Promise.race([timeoutPromise(timeout), postPromise(url, body)]);
};

export { nextFetch, nextPost };
