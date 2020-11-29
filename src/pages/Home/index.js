import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { FiPlusCircle, FiEdit3, FiTrash, FiLogOut} from 'react-icons/fi';

import { useAuth } from '../../contexts/auth';


import './styles.css';

export default function Home() {
   const history = useHistory();

   const [people, setPeople] = useState([]);
   const [category, setCategory] = useState('');
   const [query, setQuery] = useState('');

   const { logout } = useAuth();

   useEffect(() => {
      async function loadPeople() {

         let queryParam = `${category}=${query}`;
         if(category === '' ||  query === '') {
            queryParam = ''
         }

         try{
            const response = await api.get(`/people?${queryParam}`);
            setPeople(response.data);
         } catch(error) {
            console.log(error);
         }
      }

      loadPeople();
   }, [people, category, query]);

   const handleDelete = async (id) => {
      if(window.confirm("Você tem certeze que quer deletar?")) {
         await api.delete(`/people/${id}`);
         setPeople([]);
      }
   }

   return (
      <div className="home-container">
         <header>
            <h1>People<br/>Stration</h1>

            <div className="search-container">
               <div className="category-container">
                  <label htmlFor="category">Pesquisar por</label>
                  <select 
                     name="category"
                     id="category"
                     onChange={e => setCategory(e.target.value)}
                     value={category}
                  >
                     <option value="">Selecione</option>
                     <option value="name">Nome</option>
                     <option value="gender">Sexo</option>
                     <option value="email">E-mail</option>
                     <option value="birthday">Data de Nascimento</option>
                     <option value="place_of_birthday">Naturalidade</option>
                     <option value="nationality">Nacionalidade</option>
                     <option value="cpf">CPF</option>
                  </select>
               </div>


               <input
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                  placeholder="Digite aqui..."
               />

            </div>

            <FiPlusCircle
               size={32}
               color="green"
               className="button"
               onClick={() => history.push('/people/create')}
            />

            <FiLogOut
               size={30}
               color="red"
               className="button"
               onClick={logout}
            />
         </header>

         <div className="people-container">
            <ul>
               {people.map(person => {
                  return (
                     <li key={person.id}>
                        <p><strong>Nome: </strong>{person.name}</p>
                        <p><strong>Sexo: </strong>{person.gender}</p>
                        <p><strong>E-mail: </strong>{person.email}</p>
                        <p><strong>Data de Nascimento: </strong>{person.birthday.slice(0, 10)}</p>
                        <p><strong>Naturalidade: </strong>{person.place_of_birthday}</p>
                        <p><strong>Nacionalidade: </strong>{person.nationality}</p>
                        <p><strong>CPF: </strong>{person.cpf}</p>

                        <div className="actions">
                           <FiEdit3
                              size={24}
                              className="button"
                              onClick={() => history.push(`/people/edit/${person.id}`)}
                           />

                           <FiTrash
                              size={24} 
                              color="red" 
                              className="button"
                              onClick={() => handleDelete(person.id)}
                           />
                        </div>

                     </li>
               )})}

            </ul>
         </div>
      </div>
   );
}