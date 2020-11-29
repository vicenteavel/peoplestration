import React from 'react';
import Routes from './routes';
import { BrowserRouter} from 'react-router-dom';

import { AuthProvider } from './contexts/auth';

import './App.css';

function App() {
  return (
      <div className="App">
         <BrowserRouter>
            <AuthProvider>
               <Routes />
            </AuthProvider>
         </BrowserRouter>
      </div>
   );
}

export default App;
