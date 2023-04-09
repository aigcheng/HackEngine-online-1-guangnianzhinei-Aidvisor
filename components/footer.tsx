import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <h1 className={inter.className}>智能社交</h1>
        <p className={inter.className}>无须配备助力，只会管理人脉网络</p>
      </div>

      <div className={styles.card}>
        <h1 className={inter.className}>熟络客户</h1>
        <p className={inter.className}>无须尴尬寒暄，AI提示营造老友氛围</p>
      </div>
      <div className={styles.card}>
        <h1 className={inter.className}>会谈复盘</h1>
        <p className={inter.className}>无须分析整理，自动刻画客户专属画像</p>
      </div>
    </footer>
  )
}
