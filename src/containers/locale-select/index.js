import {memo, useCallback, useMemo} from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {

  const {lang, setLang, avaliableLangs} = useTranslate();

  const callbacks = {
    onChange: useCallback((lang) => setLang(lang), [])
  }

  return (
    <Select onChange={callbacks.onChange} value={lang} options={avaliableLangs}/>
  );
}

export default memo(LocaleSelect);
