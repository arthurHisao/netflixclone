import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import './App.css';

export default() => {
  const [movieList, setMovieList] = useState([]);

  /* destaques do topo */
  const [featuredData, setFeaturedData] = useState(null);

  const [blackHeader, setBlackHeader] = useState(false);

  // carrega no inicio do codigo
  useEffect(()=>{
    const loadAll = async () => {
      // obtendo a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      /* Pegando os itens do Tmdb */
      let originals = list.filter(i=>i.slug === 'originals'),
          /* Gerando numeros aleatorios */
          randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)),
          chosen = originals[0].items.results[randomChosen],
          chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
          setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
    
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>
        
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.lenght <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="carregar"/>
        </div>
      }
    </div>
  );
}