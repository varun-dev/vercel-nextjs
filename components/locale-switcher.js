import Link from 'next/link'
import { useRouter } from 'next/router'
import { Col, Row } from '../styles/grid-components'

export function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales.filter(locale => locale !== activeLocale)

  return (
    <Row>
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
