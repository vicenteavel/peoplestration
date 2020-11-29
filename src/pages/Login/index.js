import React, {useState} from 'react';

import { useAuth } from '../../contexts/auth';

import './styles.css';

export default function Login() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const {login} = useAuth();
   
   return (
      <div className="login-container">
         <h1>PeopleStration</h1>
         <div className="field-container">
               <label htmlFor="username">Username</label>
               <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
               />
            </div>

            <div className="field-container">
               <label htmlFor="password">Senha</label>
               <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
               />
            </div>
         <button onClick={() => login(username, password)}>Login</button>
      </div>
   );
}