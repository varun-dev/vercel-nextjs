import { Col, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales.filter(locale => locale !== activeLocale)

  return (
    <Row gutter={10}>
      {otherLocales.map(locale => {
        const { pathname, query, asPath } = router
        return (
          <Col key={locale}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              <a>{locale}</a>
            </Link>
          </Col>
        )
      })}
    </Row>
  )
}
