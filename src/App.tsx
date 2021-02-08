import React from 'react';
import './App.css';
import { MapComponent, MapCoords } from './components/index';

function App() {
  const [coords, setCoords] = React.useState<MapCoords>({
    center: {
      lat: 1,
      lng: 1,
    },
    zoom: 11,
  });

  const changeCoords = (location:MapCoords) => {
    setCoords(location);
  }

  return (
    <MapComponent value={coords} onChange={changeCoords}></MapComponent>
  );
}

export default App;
