import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './home.module.css';
//import Carousel from './components/Carousel';

export default function Home({ animes }) {
  const router = useRouter();

  return (
    <main className={`${styles.main}`}>
      <h1 className={`${styles.title}`}>Procurar</h1>
      <form
        className={`${styles.form}`}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const query = event.target[0].value;

          if (query.trim().length) {
            router.push(`/search?q=${query}`);
          }
        }}
      >
        <input
          className={`${styles.input}`}
          type="search"
          placeholder="Pesquisar anime..."
        />
      </form>
      <h1 className={`${styles.title}`}>Populares</h1>

      <ul className={`${styles.list}`}>
        {animes?.map((item) => (
          <Link
            className={`${styles.link}`}
            key={item?.id}
            href={`/anime/${item?.id}`}
          >
            <li className="flex flex-col justify-between w-[200px]">
              <img
                className={`${styles.image}`}
                src={`https://cdn.appanimeplus.tk/img/${item?.category_icon}`}
                alt="Anime Banner"
              />
              <p className={`${styles.text}`}>{item?.category_name}</p>
            </li>
          </Link>
        ))}
      </ul>

    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://animeland.appanimeplus.tk/videoweb/api.php?action=trendingcategory');
  const animes = await res.json();

  return { props: { animes } };
}