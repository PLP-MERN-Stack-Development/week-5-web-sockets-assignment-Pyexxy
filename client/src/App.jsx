import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Room from './pages/Room';
import PrivateChat from './pages/PrivateChat';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <div className="flex flex-col h-screen">
            <Navigation />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>}>
                <Route path="room/:roomId" element={<Room />} />
                <Route path="private/:userId" element={<PrivateChat />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;