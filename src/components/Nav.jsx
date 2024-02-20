import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/jouer" className={({ isActive }) => isActive ? 'active' : ''}>
            Jouer
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistiques" className={({ isActive }) => isActive ? 'active' : ''}>
            Statistiques
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
