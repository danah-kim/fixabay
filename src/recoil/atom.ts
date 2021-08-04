import { atom } from 'recoil';

const shadowToggleState = atom({
  key: 'shadowToggle',
  default: false,
});

export default shadowToggleState;
