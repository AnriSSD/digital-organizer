import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AddLink from './pages/AddLink';
import Bookmarks from './pages/Bookmarks';
import Donate from './pages/Donate';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/donate" element={<Donate />} />
                
                {/* Защищенные маршруты */}
                <Route 
                  path="/add" 
                  element={
                    <ProtectedRoute>
                      <AddLink />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/bookmarks" 
                  element={
                    <ProtectedRoute>
                      <Bookmarks />
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
