import { fetchPageBlocks, fetchPageBySlug } from '@/app/lib/notion';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import NavLink from '@/app/components/Navlink/NavLink';

export default async function Page({ params }) {
  // Extract as api + helper functions
  const post = await fetchPageBySlug(params?.slug);
  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);
  const paragraph = blocks.filter((type) => type.type === 'paragraph');
  const cover = blocks.filter((block) => block.type === 'image');
  const url = cover[0].image.file.url;
  const plainText = paragraph[0].paragraph.rich_text[0].plain_text;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        header
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink url='/'>Om</NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink url='/'>Kontakt</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <h1>Hej</h1>
        <NavLink url='/'>Hem igen</NavLink>
        <img className={styles.cover} src={url} />
        <p>{plainText}</p>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}
