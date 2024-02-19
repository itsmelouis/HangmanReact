/* eslint-disable react/no-unescaped-entities */
import penduImage from '../assets/pendu.jpg';

const Accueil = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-8 mt-4'>
      <h1 className='text-3xl font-bold'>Le pendu !</h1>
      <p className='text-center max-w-[50%]'>Le but du jeu est simple : deviner toute les lettres qui doivent composer un mot, 
        éventuellement avec un nombre limité de tentatives et des thèmes fixés à l'avance.
         A chaque fois que le joueur devine une lettre, celle-ci est affichée. Dans le cas contraire, le dessin d'un pendu se met à apparaître...</p>
      <img src={penduImage} alt="Le Pendu" width="300" />
      {/* Ajoutez d'autres éléments que vous trouvez intéressants */}
    </div>
  );
};

export default Accueil;
