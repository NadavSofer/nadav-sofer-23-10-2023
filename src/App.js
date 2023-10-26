import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import WeatherScreen from './screens/WeatherScreen';
import Navbar from './components/Navbar';

function App() {
  const count = useSelector((state) => state.weatherData.cityKey);

  return (
    <div className="bg-mainBG text-white h-fit lg:h-screen">
      <header >
        <Navbar className='w-full'></Navbar>
        <WeatherScreen></WeatherScreen>
      </header>
    </div>
  );
}

export default App;
