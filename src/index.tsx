import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';
import { AxiosError } from 'axios';
import App from 'App';
import reportWebVitals from './reportWebVitals';
import 'normalize.css';

ReactDOM.render(
  <StrictMode>
    <SWRConfig
      value={{
        onError: (error: AxiosError) => {
          if (error.response) {
            if (error.response.status !== 400 && error.response.status !== 409 && error.response.status !== 404) {
              console.error('요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다');
              console.error(error.response);
            }
          } else if (error.request) {
            console.error('요청이 이루어 졌으나 응답을 받지 못했습니다.');
            console.error(error.request);
          } else {
            console.error('오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.');
            console.error('Error', error.message);
          }
        },
      }}
    >
      <App />
    </SWRConfig>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
