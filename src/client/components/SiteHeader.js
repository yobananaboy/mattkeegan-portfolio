import { Container, Header } from "semantic-ui-react";
import Link from 'next/link';

export default function SiteHeader() {
    return (
        <Container>
            <Link href="/">
                <Header as="h1">Matt Keegan</Header>
            </Link>
        </Container>
    )
}