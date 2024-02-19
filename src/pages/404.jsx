/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return(
    <div className='notfound'>
      <img src="https://media1.tenor.com/m/_hh98D0NI6MAAAAd/les-inconnus-jean-pierre-fran%C3%A7ois.gif" alt="404 gif not found" />
      <h1>Cette page n'existe pas 🤔</h1>
      <h3>Revenir à <Link to="/" >l'accueil</Link></h3>
    </div>
  )
} 

export default NotFoundPage;
