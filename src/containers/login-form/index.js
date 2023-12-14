import {memo, useCallback, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import FormInput from "../../components/form-input";
import Form from "../../components/form";
import FormError from "../../components/form-error";

/**
 * Контейнер формы входа
 */
function LoginForm() {
  const store = useStore();
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const select = useSelector(state => ({
    waiting: state.auth.waitingForAuth,
    error: state.auth.errorLogin
  }));

  const callbacks = {
    onLogin: useCallback(() => store.actions.auth.login({
        login, password
      }), [login, password]),
    setLogin,
    setPassword
  }

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <Form>
        <FormInput label={t('loginForm.login')} 
                    onChange={callbacks.setLogin} 
                    value={login} 
                    disabled={select.waiting}/>

        <FormInput label={t('loginForm.password')} 
                   onChange={callbacks.setPassword} 
                   value={password} type={'password'} 
                   disabled={select.waiting}/>

        {select.error && <FormError text={select.error}/>}
        
        <button disabled={select.waiting} 
                onClick={callbacks.onLogin}>{t('loginForm.signIn')}</button>
      </Form>
    </Spinner>
  );
}

export default memo(LoginForm);
