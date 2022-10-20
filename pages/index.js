import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTile } from '../components/Layout'

import Link from "next/link"
import utilStyles from "../styles/utils.module.css"
import {getPostsData} from '../lib/posts'

//SSGの場合
export async function getStaticProps() {
  console.log("getStaticProps call!!!")
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData, //これをHomeに渡す
    },
  };
}

//SSRの場合(contextにはrequestされたときのパラメータが入る)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTile}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私はフルスタックエンジニアです。2
        </p>
      </section>

      <section>
        <h2 className={utilStyles.headingLg}>🗒エンジニアのブログ</h2>
        <div className={styles.grid}>

          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={`${styles.thumbnailImage}`}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {date}
              </small>
            </article>
          ))}


        </div>
      </section>
    </Layout>
  )
}
