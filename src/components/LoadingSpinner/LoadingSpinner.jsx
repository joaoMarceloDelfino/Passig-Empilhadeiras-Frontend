// LoadingSpinner.jsx
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({size}) {
  return (
    <div className={styles.container}>
      <div 
        className={styles.loader}
         style={{ width: size ?? 48, height: size ?? 48 }}
      ></div>
    </div>
  );
}
