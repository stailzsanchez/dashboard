import React, { MouseEventHandler } from 'react';
import { useSignIn } from './useSignIn';
import { useForm } from '../../hooks/useFormLogin';
import './SignIn.css';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../routing';

const SignIn = () => {
  const navigate = useNavigate();

  const { signIn, loading, error } = useSignIn();
  const {
    form: { email, password },
    handleChange,
  } = useForm({ email: 'UserOne', password: 'pass' });

  const login = () => {
    // signIn(email, password);
    // localStorage.setItem('token', login?.token);
    localStorage.setItem('token', '123123123123123');
    navigate(ROUTES.DASHBOARD);

    //MOCK
    setTimeout(() => {
      localStorage.setItem('token', '123123123123123');
    }, 2000);
  };

  return (
    <div className="signin__page">
      <div className="signin">
        <div className="signin__title">Вход</div>
        <div className="signin__text">
          Уникальная технология доступная для вашего бизнеса уже сейчас!
        </div>
        {loading && <div>Loading...</div>}
        {error && <div className="signin__error">{error}</div>}
        <div className="signin__email signin__field">
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="text"
            placeholder="Логин"
          />
        </div>

        <div className="signin__password signin__field">
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            placeholder="Пароль"
          />
        </div>

        <button onClick={login} className="signin__submit">
          Войти
        </button>
      </div>
    </div>
  );
};

export default SignIn;
{
  /* Login
      <button onClick={login}>Auth</button>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>} */
}
