import './App.css';

// hooks
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// firebase
import { onAuthStateChanged } from 'firebase/auth';

// context
import { AuthProvider } from './context/AuthContext';

// Pages
import About from './pages/About';
import Home from './pages/Home';
import Success from './pages/Success';
import Requests from './pages/Requests';
import Login from './pages/Login';
import Search from './pages/Search';

// Components
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    console.log('Pathname:', pathname, 'Hash:', hash); // Debugging

    if (hash === '#menu' || !hash) {
      // Rola para o topo da página
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      window.location.hash = '';
      window.history.replaceState(null, '', pathname); // Corrige a URL sem o hash
    } else if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        const offset = 393 + window.innerHeight * 0.44;
        document.body.scrollTop = offset;
        window.scrollTo(0, offset);
        console.log('Rolando para o elemento:', hash); // Debugging
        window.history.replaceState(null, '', pathname); // Corrige a URL sem o hash
      }
    } else {
      window.scrollTo(0, 0);
      console.log('Rolando para o topo da página sem hash'); // Debugging
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  useEffect(() => {
    let timeout;

    const showScrollbar = () => {
      document.body.classList.add('show-scroll');

      const clientsElement = document.querySelector('.clients');
      const servicesElement = document.querySelector('.services');

      if (clientsElement) {
        clientsElement.classList.add('show-scroll');
      }

      if (servicesElement) {
        servicesElement.classList.add('show-scroll');
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.body.classList.remove('show-scroll');

        if (clientsElement) {
          clientsElement.classList.remove('show-scroll');
        }

        if (servicesElement) {
          servicesElement.classList.remove('show-scroll');
        }
      }, 500); // A barra de rolagem desaparece após 500ms
    };

    document.addEventListener('scroll', showScrollbar);
    document.addEventListener('mousemove', showScrollbar);
    document.addEventListener('wheel', showScrollbar); // Detecta a rolagem do mouse

    return () => {
      document.removeEventListener('scroll', showScrollbar);
      document.removeEventListener('mousemove', showScrollbar);
      document.removeEventListener('wheel', showScrollbar);
    };
  }, []);

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div id="menu"></div>
          <ScrollToTop />
          <NavBar />
          <div className="spaceNavBar"></div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/success" element={<Success />}></Route>
            <Route
              path="/requests"
              element={user ? <Requests /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={user ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/requests" />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
