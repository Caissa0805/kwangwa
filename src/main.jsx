import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import Admin from './Admin';
import OpeningReveal from './components/OpeningReveal';
import './styles.css';
createRoot(document.getElementById('root')).render(location.pathname==='/admin'?<OpeningReveal><Admin/></OpeningReveal>:<App/>);

