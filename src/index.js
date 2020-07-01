import { Pages } from './pages';

function GetComponent(name) {
  return Pages[name];
}

export { GetComponent };
