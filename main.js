import { Header } from './src/components/Header/Header';
import { Main } from './src/components/Main/Main';
import { Home } from './src/pages/Home/Home';

import './style.css';
import { popStateListener } from './utils/listeners/popstate';

Header();
Main();
Home();
popStateListener();
