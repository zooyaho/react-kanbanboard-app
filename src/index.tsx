import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { DarkTheme } from './theme';

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={DarkTheme}>
    <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
);