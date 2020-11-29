import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

import { useHistory } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
   const [logged, setLogged] = useState(!!JSON.parse(localStorage.getItem('@peoplestration:logged')));
   const history = useHistory();

   useEffect(() => {
      const storagedLogged = localStorage.getItem('@peoplestration:logged');
      const storagedToken = localStorage.getItem('@peoplestration:token');
      
      if(storagedLogged && storagedToken) {
         setLogged(true);
      }
      
   }, []);

   const login = async(username, password) => {
      try {
         const response = await api.post('/authenticate', {
            username, password
         });
         
         setLogged(response.data.logged)
   
         localStorage.setItem('@peoplestration:logged', JSON.stringify(response.data.logged));
         localStorage.setItem('@peoplestration:token', JSON.stringify(response.data.token));
         history.push('/people');
      } catch(error) {
         console.log(error);
         alert('Username e/ou Senha inválidos!');
      }

   }

   const logout = () => {
      localStorage.clear();
      setLogged(false);
      history.push('/');
   }

   return (
      <AuthContext.Provider value={{logged, login, logout}}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);

   return context;
}