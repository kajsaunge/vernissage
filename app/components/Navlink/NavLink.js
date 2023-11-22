import Link from 'next/link';
import styles from './Navlink.module.css';
const NavLink = ({ children, url = '' }) => {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.navLink} href={url}>
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
