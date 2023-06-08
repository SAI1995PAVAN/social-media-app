import { Routes,Route,Navigate} from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import ProfilePage from './Pages/ProfilePage/ProfilePage';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile/:userId' element={ <ProfilePage />} />
    </Routes>
    </div>
  

  );
}

export default App;
