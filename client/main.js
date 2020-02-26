import React from 'react';
import ReactDOM from 'react-dom';
import App from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './shared/shared-styles.scss'

const el = document.getElementById('root');

ReactDOM.render(<App code={el.getAttribute('code')} />, el)
