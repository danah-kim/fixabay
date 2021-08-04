import { atom } from 'recoil';

const searchState = atom({
  key: 'search',
  default: '',
});

export default searchState;
