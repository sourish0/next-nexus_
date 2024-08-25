import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ observations }) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {observations.map((obs) => (
        obs.geojson && obs.geojson.coordinates &&
        <Marker key={obs.id} position={[obs.geojson.coordinates[1], obs.geojson.coordinates[0]]}>
          <Popup>
            <strong className='text-blue-400'><a href={`https://en.wikipedia.org/wiki/${obs.species_guess}`} target="_blank">{obs.species_guess}</a></strong><br />
            Observed at: {obs.observed_on}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
