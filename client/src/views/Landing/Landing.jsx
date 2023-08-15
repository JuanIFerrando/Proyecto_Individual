import { Link } from 'react-router-dom';
import styles from '../Landing/Landing.module.css'; 

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Link to="/home" className={styles['enter-button']}> 
        Enter
      </Link>
    </div>
  );
};

export default Landing;

