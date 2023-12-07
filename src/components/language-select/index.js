import { memo } from "react"
import { locales } from "../../internationalization/locales"

function LanguageSelect () {

  const localeCode = localStorage.getItem('localeCode') || 'ru-RU'

  const callbacks = {
    onChange: (e) => {
      localStorage.setItem('localeCode', e.target.value)
      location.reload()
    }
  }

  return (
    <select onChange={callbacks.onChange} value={localeCode}>
      {
        locales.map(l => (
          <option value={l.code} key={l.code}>{l.name}</option>
        ))
      }
    </select>
  )
}

export default memo(LanguageSelect)