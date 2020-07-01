import { nextFetch, nextPost } from '../utils/nextFetch';
import fetch from 'isomorphic-unfetch';

const saveArticle = body =>
  nextPost(1000, '/article/saveArticle', JSON.stringify(body)).then(res => {
    if (res) {
      return res.json();
    }
  });

const fetchArticles = () => {
  return nextFetch(1000, '/article/getAllArticles').then(res => {
    if (res) {
      console.log(res);
      return res.json();
    }
  });
};

const fetchArticleById = id => {
  return nextFetch(1000, `/article/getArticleById/${id}`).then(res => {
    if (res) {
      console.log(res);
      return res.json();
    }
  });
};

export { saveArticle, fetchArticles, fetchArticleById };
