import PagesRenderer from './render/PagesRenderer';
import { Navbar } from './components/common/BaseLayoutFeatures';
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

      <AuthNavbar />
      <div className='page-view'>
        <PagesRenderer />
      </div>
    </div>
  );
}

function AuthNavbar() {
  const token = localStorage.getItem('accessToken');
  return token ? <Navbar /> : '';
}

export default App;
