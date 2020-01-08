import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import HelloForm from './components/HelloForm/HelloForm';

const rootEl = document.getElementById('root');

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );
}

render(HelloForm);

// Hot Module Replacement API
if (module.hot) module.hot.accept( ('./components/HelloForm/HelloForm'), () => render(HelloForm));
