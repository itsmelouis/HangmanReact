import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Accueil from './pages/Accueil';
import Jouer from './pages/Jouer';
import Statistiques from './pages/Statistiques';
import NotFoundPage from './pages/404';
import './styles.css';

const App = () => {
  return (
    <>
    <Router>
      <Nav />
      
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/jouer" element={<Jouer />} />
        <Route path="/statistiques" element={<Statistiques />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
