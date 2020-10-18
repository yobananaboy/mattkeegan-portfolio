import { useEffect, useState } from 'react';
import Head from 'next/head';
import Post from '../components/post';
import { Container, Header, Divider } from 'semantic-ui-react';

function HomePage() {

  const client = require('contentful').createClient({
    space: process.env.contentful_space_id,
    accessToken: process.env.contentful_content_delivery_api
  })

  async function fetchEntries() {
      const entries = await client.getEntries()
      if (entries.items) return entries.items
      console.log(`Error getting Entries for ${contentType.name}.`)
  }

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries()
      setPosts([...allPosts])
    }
    getPosts()
  }, [])

  return (
    <>
      <Head>
        <title>Matt Keegan | Home</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      <Container>
      <Header as="h1">
        Matt Keegan
      </Header>
      <p>Hello world!</p>
      <Divider horizontal />
      {posts.length > 0
        ? posts.map(p => (
            <Post
              date={p.fields.date}
              key={p.fields.title}
              image={p.fields.image}
              title={p.fields.title}
              url={p.fields.url}
            />
          ))
        : null}
      </Container>
    </>
  )
}

export default HomePage;