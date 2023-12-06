import { memo } from "react"
import { locales } from "../../internationalization/dictinary"

function LanguageSelect () {

  const locale = localStorage.getItem('locale') || 'RU'

  const callbacks = {
    onChange: (e) => {
      localStorage.setItem('locale', e.target.value)
      location.reload()
    }
  }

  return (
    <select onChange={callbacks.onChange} value={locale}>
      {
        locales.map(l => (
          <option value={l}>{l}</option>
        ))
      }
    </select>
  )
}

export default memo(LanguageSelect)