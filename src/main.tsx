import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import NotesProvider from './contexts/NotesContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
       <BrowserRouter>
       
     
    <NotesProvider>
   
       <App />
 
    </NotesProvider>
    </BrowserRouter>
    
  </React.StrictMode>
)
