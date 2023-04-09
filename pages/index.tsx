import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button } from 'antd'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header showNav={true}></Header>
      <Head>
        <title className="text-3xl font-bold underline">Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="flex p-10">
          <div className="left-content pr-6 flex flex-col items-start justify-between">
            <div className="title">
              <h1 className="font-inter leading-normal font-normal text-6xl leading-9 text-black">
                让你的 <br />
                每一次
                <span className="text-blue-500">
                  <strong>会谈</strong>更简单
                </span>
              </h1>
              <div className="font-inter leading-loose font-normal text-lg leading-6 text-black pt-5">
                <span className="text-blue-500">让ChatGPT融入商务社交，</span>
                为每一位客户形成专属画像
              </div>
            </div>
            <Button className=" w-60 h-12 bg-black rounded-full">
              <span className="font-inter font-bold text-xl leading-11 text-white">立即体验</span>
            </Button>
          </div>
          <div className="bg-blue-300 w-[380px] h-[500px]"></div>
        </div>
        <Footer />
      </main>
    </>
  )
}
