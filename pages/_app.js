import 'antd/dist/antd.dark.css'
import { Layout, Row, Col } from 'antd'
const { Header, Footer, Content } = Layout

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Header>
        <Row>
          <Col span={20}>Todo List - Nextjs, GraphCMS, Vercel</Col>
          <Col span={4}>EN | DE</Col>
        </Row>
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default MyApp
