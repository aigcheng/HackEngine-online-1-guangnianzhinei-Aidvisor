import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <h1 className={inter.className}>A优点</h1>
        <p className={inter.className}>说明</p>
        <p className={inter.className}>说明</p>
      </div>

      <div className={styles.card}>
        <h1 className={inter.className}> B优点</h1>
        <p className={inter.className}>说明</p>
        <p className={inter.className}>说明</p>
      </div>
      <div className={styles.card}>
        <h1 className={inter.className}>C优点</h1>
        <p className={inter.className}>说明</p>
        <p className={inter.className}>说明</p>
      </div>
      <div className={styles.card}>
        <h1 className={inter.className}>D优点</h1>
        <p className={inter.className}>说明</p>
        <p className={inter.className}>说明</p>
      </div>
    </footer>
  )
}
