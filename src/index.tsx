import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { configureStore } from "./store";
import React, { useState } from 'react';
import Localization from './contexts/localization';
import { GetLocale } from './utils/lang/_langs';
const store = configureStore({});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export default function Main() {
	const [lang] = useState('en');
  const [strings] = useState(GetLocale(lang));
  
	return (
    <Provider store={store}>
      <Localization.Provider value={{strings,lang}}>
        <App />
      </Localization.Provider>
        
    </Provider>
	)
}
root.render(
  //<React.StrictMode>
    <Main/>
  //</React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
