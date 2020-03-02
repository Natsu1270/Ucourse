import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl'
import './index.scss';
import App from './App';
import './static/css/all.css'
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { store } from './redux/store'

import message_en from './locales/en.json'
import message_vi from './locales/vi.json'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faGooglePlus, faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(
    fab,
    faGooglePlus,
    faGoogle,
    faFacebook,
    faGithub
);

const messages = {
    'en': message_en,
    'vi': message_vi
}
const language = 'en'
const app = (
    <Provider store={store}>
        <IntlProvider locale={language} messages={messages[language]}>
            <App />
        </IntlProvider>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
