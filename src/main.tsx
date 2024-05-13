import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import JSONPlaceholderProvider from './contexts/JSONPlaceholder.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <JSONPlaceholderProvider>
          <App />
          <ToastContainer
            position={'bottom-right'}
            autoClose={2000}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            theme={'dark'}
            closeOnClick={true}
            transition={Slide}
            hideProgressBar={true}
          />
      </JSONPlaceholderProvider>
    </BrowserRouter>
  // </React.StrictMode>
)
