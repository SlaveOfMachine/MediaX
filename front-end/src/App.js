import PagesRenderer from './render/PagesRenderer';
import './assets/styles/index.scss';
import { Loader, AxiosMessage } from './components/common/BaseLayoutFeatures';
require('dotenv').config();

function App() {
  document.title = process.env.REACT_APP_NAME || 'App';
  return (
    <div className="App">
      <Loader />
      <AxiosMessage />
      <PagesRenderer />
    </div>
  );
}

export default App;
