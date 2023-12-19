import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useState } from 'react';
import SideBar from './components/SideBar';
import Projects from './pages/Projects/Projects';
import Integrations from './pages/Integrations/Integrations';
import Settings from './pages/Settings/Settings';
import NoIntegrations from './components/NoIntegrations';
import Header from './components/Header';


function App() {
  const [user, setUser] = useState(true)
  const [integration, setIntegration] = useState(true)

  return (
    <div>
      <Router>
        {
          user ? (
            <div className='flex w-full h-screen'>
              <SideBar />
              <Header />
              <div className='lg:pl-[16%] flex-grow'>
                <Routes>
                  {
                    integration ? (
                      <>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/projects" element={<Projects />} />
                        <Route exact path="/integrations" element={<Integrations />} />
                        <Route exact path="/settings" element={<Settings />} />
                        <Route exact path="/feedback" element={<div className='w-full'>feedback</div>} />
                        <Route exact path="/help" element={<div className='w-full'>Ajuda</div>} />
                      </>

                    ) : (
                      <>
                        <Route path="*" element={<NoIntegrations />} />
                        <Route exact path="/integrations" element={<Integrations />} />
                        <Route exact path="/settings" element={<Settings />} />
                      </>
                    )
                  }


                </Routes>
              </div>

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
