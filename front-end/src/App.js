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

window.$alertMessage = (message) => {
  const messageContainer = document.querySelector('.axios-message-container');
  console.log(messageContainer, message);
  if (message && messageContainer) {
      const messageElement = document.querySelector('.axios-message');
      if (messageElement) {
          messageElement.innerHTML = message;
      }
  }
  if (messageContainer.style.display !== 'block') {
      messageContainer.style.display = 'block';
      setTimeout(() => {
          messageContainer.style.display = 'none';
      }, 3000);
  }
}

export default App;
