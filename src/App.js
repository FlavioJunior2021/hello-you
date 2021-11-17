import { BrowserRouter } from 'react-router-dom';
import {AuthContextProvider}  from './contexts/AuthContext';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider />
    </BrowserRouter>
  );
}

export default App;
