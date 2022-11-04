import CreateRoom from "./components/room/CreateRoom";
import ListRooms from "./components/room/ListRooms";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ListRooms />} />
          <Route path="/create" element={<CreateRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
