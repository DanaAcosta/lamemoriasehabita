import Map from './map';
import Header from './Header.jsx';
import './App.css';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Map />
      </div>
    </div>
  );
}