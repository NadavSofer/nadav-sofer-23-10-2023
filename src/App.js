import './App.css';
import WeatherScreen from './screens/WeatherScreen';
import FavoritesScreen from './screens/FavoritesScreen'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="bg-mainBG text-white h-fit lg:h-screen">
      <header >
        <SnackbarProvider maxSnack={5}>
          <Navbar className='w-full'></Navbar>
          <Routes>
            <Route path="/" Component={WeatherScreen} />
            <Route path="/favorites" Component={FavoritesScreen} />
          </Routes>
        </SnackbarProvider>
      </header>
    </div>
  );
}

export default App;
