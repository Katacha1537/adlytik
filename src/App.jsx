import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useState } from 'react';
import SideBar from './components/SideBar';
import Projects from './pages/Projects/Projects';
import UsersTeam from './pages/UsersTeam/UsersTeam';
import Integrations from './pages/Integrations/Integrations';
import Settings from './pages/Settings/Settings';


function App() {
  const [user, setUser] = useState(true)

  return (
    <div>
      <Router>
        {
          user ? (
            <div className='flex w-full h-screen'>
              <SideBar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/projects" element={<Projects />} />
                <Route exact path="/usersteam" element={<UsersTeam />} />
                <Route exact path="/integrations" element={<Integrations />} />
                <Route exact path="/settings" element={<Settings />} />
              </Routes>
            </div>
          )
            :
            (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Login />} />
              </Routes>
            )
        }

      </Router>
    </div>
  );
}

export default App;
