import { useRouter } from 'next/router';
import Custom404 from '../404';
import Head from 'next/head';
import Link from 'next/link';
import SiteHeader from '../../components/SiteHeader';
import { Container, Image } from 'semantic-ui-react';
import { getPostAndMorePosts, getAllPostsWithSlug } from '../../lib/api';

export default function Post({ post, morePosts, preview }) {
    const router = useRouter()

    if (!router.isFallback && !post) {
        return <Custom404 />
    }

    return (
      <>
        {router.isFallback ? (
          <Head>Loading…</Head>
        ) : (
          <>
            <Head>
              <title>{post.title}</title>
            </Head>
            <SiteHeader />
            <Container text>
              <h1>{post.title}</h1>
              <Image src={post.image.file.url} alt={post.image.file.description} />
              <Link href="/">Back to home</Link>
            </Container>
          </>
        )}
      </>
    );
};

export async function getStaticProps({ params, preview = false }) {
    const data = await getPostAndMorePosts(params.slug, preview)
  
    return {
      props: {
        preview,
        post: data?.post ?? null,
        morePosts: data?.morePosts ?? null,
      },
    }
  }
  
  export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug()
    return {
      paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
      fallback: true,
    }
  }  