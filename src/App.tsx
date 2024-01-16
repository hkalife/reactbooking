import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bookings from './views/Bookings'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Bookings />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
