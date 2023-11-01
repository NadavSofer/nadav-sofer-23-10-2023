import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import WeatherScreen from './screens/WeatherScreen';
import FavoritesScreen from './screens/FavoritesScreen'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {
  const count = useSelector((state) => state.weatherData.cityKey);

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
