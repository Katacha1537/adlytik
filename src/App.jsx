import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/USER/Home/Home';
import Login from './pages/USER/Login/Login';
import { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import Projects from './pages/USER/Projects/Projects';
import Integrations from './pages/USER/Integrations/Integrations';
import Settings from './pages/USER/Settings/Settings';
import NoIntegrations from './components/USER/NoIntegrations';
import Header from './components/Header';
import Help from './pages/USER/Help/Help';
import Feedback from './pages/USER/Feedback/Feedback';
import HomeProject from './pages/PROJECT/HOME/HomeProject';
import { useLocation } from 'react-router-dom'
import SideBarProject from './components/SideBarProjects';
import HeaderProject from './components/HeaderProjects';
import Tasks from './pages/PROJECT/Tasks/Tasks';
import Goals from './pages/PROJECT/Goals/Goals';
import Campaign from './pages/PROJECT/Campaign/Campaign';
import Dashboard from './pages/PROJECT/Dashboard/Dashboard';

import { Spinner } from '@nextui-org/react';

import { useAuthContext } from './hooks/useAuthContext';
import { IntegrationProvider } from './context/IntegrationContext';
import { useIntegration } from './hooks/useIntegration';
import { UserDocProvider } from './context/UserDocContext';
import { RerenderUpdateProvider } from './context/RerenderUpdateContext';

function AppContent() {
  const location = useLocation();
  const isProjectDashboard = location.pathname.startsWith('/project/');
  const { integration, isLoading } = useIntegration()
  const [projectId, setProjectId] = useState('')

  useEffect(() => {
    if (isProjectDashboard) {
      // Extract projectId from the URL
      const parts = location.pathname.split('/');
      if (parts.length >= 3) {
        setProjectId(parts[2]);
      }
    }
  }, [location.pathname, isProjectDashboard])

  return (
    <div className='flex w-full h-screen'>
      {!isProjectDashboard ? <SideBar /> : <SideBarProject projectId={projectId} />}
      {!isProjectDashboard ? <Header /> : <HeaderProject />}
      <div className={`lg:pl-[16%] flex-grow`}>
        <Routes>
          {
            integration ? (
              <>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/projects" element={<Projects />} />
                <Route exact path="/integrations" element={<Integrations />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/settings/profile" element={<Settings />} />
                <Route exact path="/settings/config" element={<Settings />} />
                <Route exact path="/settings/change-password" element={<Settings />} />
                <Route exact path="/feedback" element={<Feedback />} />
                <Route exact path="/help" element={<Help />} />

                <Route exact path="/project/:id" element={<HomeProject />} />
                <Route exact path="/project/:id/tasks" element={<Tasks />} />
                <Route exact path="/project/:id/goals" element={<Goals />} />
                <Route exact path="/project/:id/campaign" element={<Campaign />} />
                <Route exact path="/project/:id/dashboard" element={<Dashboard />} />
              </>

            ) :

              isLoading ? (
                <Route path="*" element={
                  <div className='flex w-full h-screen items-center justify-center'>
                    <Spinner color="secondary" size="lg" />
                  </div>
                } />
              )
                :
                (
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
  );
}

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

function App() {
  const { user, authIsReady } = useAuthContext()

  if (!authIsReady) {
    return (
      <div className='flex w-full h-screen items-center justify-center'>
        <Spinner color="secondary" size="lg" />
      </div>
    )
  }

  return (
    <Router>
      {
        user ?
          <RerenderUpdateProvider>
            <UserDocProvider>
              <IntegrationProvider>
                <AppContent />
              </IntegrationProvider>
            </UserDocProvider>
          </RerenderUpdateProvider>
          :
          <LoginRoutes />}
    </Router>
  );
}

export default App;
