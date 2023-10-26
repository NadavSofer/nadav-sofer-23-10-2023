import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import WeatherScreen from './screens/WeatherScreen';

function App() {
  const count = useSelector((state) => state.weatherData.cityKey);

  return (
    <div className="App">
      <header className="App-header">
        <WeatherScreen></WeatherScreen>
      </header>
    </div>
  );
}

export default App;
