import PagesRenderer from './render/PagesRenderer';
import './assets/index.scss';
require('dotenv').config();

function App() {
  return (
    <div className="App">

      {/* Loader */}
      <div className='axios-loader-container'>
        <div className='axios-loader'></div>
      </div>

      {/* Message */}
      <div className='axios-message-container'>
        <div className='axios-message'>Server error</div>
      </div>

      <div className='page-view'>
        <PagesRenderer />
      </div>
    </div>
  );
}

export default App;
