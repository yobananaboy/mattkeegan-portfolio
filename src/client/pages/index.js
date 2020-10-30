import Head from 'next/head';
import SiteHeader from '../components/SiteHeader';
import SiteIntro from "../components/SiteIntro";
import PostPreview from '../components/PostPreview';
import { getAllPostsForHome } from '../lib/api';


export default function HomePage({ preview, allPosts }) {

  return (
    <>
      <Head>
        <title>Matt Keegan | Home</title>
      </Head>
      <SiteHeader />
      <SiteIntro />
      {allPosts.map(p => (
          <PostPreview
            date={p.date}
            key={p.title}
            image={p.image}
            title={p.title}
            slug={p.slug}
          />
        ))
      }
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { preview, allPosts },
  }
}