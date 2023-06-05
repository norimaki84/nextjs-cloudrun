
import { createClient } from 'microcms-js-sdk'
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
export const client = createClient({
    // serviceDomain: process.env.SERVICE_DOMAIN || "",
    serviceDomain: 'ca3rjspzbg',
    // apiKey: process.env.API_KEY || "",
    apiKey: 'b5feddac91fd497793d6cf912ddcf60e94e8',
})

export default function Works({post}) {
    useEffect(()=>{
        console.log('post', post);
    }, [])
    const router = useRouter()
    const { locale, locales, defaultLocale, asPath, route } = useRouter()

    const [isLocale, setIsLocale] = useState('')

    useEffect(()=>{
        console.log('locale', locale);
        setIsLocale(locale)
    },[locale])


    /**
     * 言語切り替え処理
     * @param locale
     */
    const handleLocaleChange = async (locale) => {
        await router.push(router.pathname, router.asPath, { locale, scroll: false })
        window.location.reload()
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>

                {locale === 'ja' && (
                    <>
                        <h1>{post.title.title_ja}</h1>
                        <p>{post.meta.description_ja}</p>
                    </>
                )}

                {locale === 'en' && (
                    <>
                        <h1>{post.title.title_en}</h1>
                        <p>{post.meta.description_en}</p>
                    </>
                )}

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

            </main>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    try {
        const id = context.params.id
        // 現在の記事を取得
        const post = await client.get({ endpoint: 'works', contentId: id })

        return {
            props: { post },
        }
    } catch (err) {
        console.error('Error fetching blog post:', err)

        // 404へのリダイレクト処理
        // if (router) {
        //   await router.replace('/404') // 404ページへのリダイレクト
        // }

        return {
            // notFound: true, // 404を示すフラグを設定
            props: {},
        }
    }
}
