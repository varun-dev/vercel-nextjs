import { Layout, Row, Col } from 'antd'
import 'antd/dist/antd.dark.css'

const { Header, Footer, Content } = Layout

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Header>
        <Row>Todo List - Nextjs, GraphCMS, Vercel</Row>
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
    </Layout>
  )
}

export default MyApp
