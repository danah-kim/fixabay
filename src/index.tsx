import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'App';
import { GlobalStyles } from 'twin.macro';
import { RecoilRoot } from 'recoil';
import CustomStyles from 'styles/CustomStyles';
import reportWebVitals from './reportWebVitals';
import 'react-virtualized/styles.css';
import 'tailwindcss/tailwind.css';

ReactDOM.render(
  <>
    <GlobalStyles />
    <CustomStyles />
    <Router>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
