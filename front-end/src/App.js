import PagesRenderer from './render/PagesRenderer';
import './assets/index.scss';
import { Loader, AxiosMessage } from './components/common/BaseLayoutFeatures';
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Loader />
      <AxiosMessage />
      <PagesRenderer />
    </div>
  );
}

export default App;
