import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='flex flex-row justify-center items-center'>
      <ul className='flex flex-row gap-4 list-none'>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold underline text-blue-700' : 'text-base transition duration-200 text-blue-700'}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/jouer" className={({ isActive }) => isActive ? 'font-bold underline text-blue-700' : 'text-base transition duration-200 text-blue-700'}>
            Jouer
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistiques" className={({ isActive }) => isActive ? 'font-bold underline text-blue-700' : 'text-base transition duration-200 text-blue-700'}>
            Statistiques
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
