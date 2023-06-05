import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect} from "react";
import {useRouter} from "next/router";
// import { GetServerSideProps } from 'next';

import { createClient } from 'microcms-js-sdk'
import Link from "next/link";

export const client = createClient({
  // serviceDomain: process.env.SERVICE_DOMAIN || "",
  serviceDomain: 'ca3rjspzbg',
  // apiKey: process.env.API_KEY || "",
  apiKey: 'b5feddac91fd497793d6cf912ddcf60e94e8',
})

export default function Home({post}) {
  const router = useRouter()
  const { asPath } = useRouter()

  useEffect(()=>{
    console.log('Cloud Run Test05', post);
  }, [])

  /**
   * 言語切り替え処理
   * @param locale
   */
  const handleLocaleChange = async (locale) => {
    await router.push(router.pathname, router.asPath, { locale, scroll: false })
    window.location.reload()
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> on Cloud Run Test!!!
        </h1>


        <div>
          <button
              onClick={() => handleLocaleChange('ja')}
              type={'button'}
          >
            JP
          </button>
          <div>/</div>
          <button
              onClick={() => handleLocaleChange('en')}
              type={'button'}
          >
            EN
          </button>
        </div>
        <ul>
          {post && post.map((articleBlocksData, i) => (
              <li key={i}>
                <Link href={'/works/' + articleBlocksData.id} legacyBehavior>
                  <a>{articleBlocksData.title?.title_ja}</a>
                </Link>
              </li>
          ))}
        </ul>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  // データを取得する処理
  try {
    let post

    const res = await client.get({
      endpoint: 'works',
      queries: { limit: 3, orders: '-publishedAt'},
    })
    post = await res.contents

    return {
      // 取得したデータをpropsにセットする
      props: { post },
    }
  } catch (err) {
    console.error(err)
    return {
      props: {},
    }
  }
}
