import Link from 'next/link';
import { Header, Container, Image, Divider } from 'semantic-ui-react';

export default function PostPreview({ date, image, title, slug }) {
    return (
      <>
        <Container text>
          <Header as="h2">{title}</Header>
          <Header as="h4">{date}</Header>
          <Link href={`/posts/${slug}`}>
            <Image alt={image.description} src={image.file.url} />
          </Link>
        </Container>
        <Divider horizontal />
      </>
    )
  }