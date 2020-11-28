import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

export default function Home() {
   const history = useHistory();

   const [people, setPeople] = useState([]);
   const [category, setCategory] = useState('');
   const [query, setQuery] = useState('');

   useEffect(() => {
      async function loadPeople() {

         let queryParam = `${category}=${query}`;
         if(category === '' ||  query === '') {
            queryParam = ''
         }

         const response = await api.get(`/people?${queryParam}`);
         setPeople(response.data);
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
      <div>
         <header>
            <h1>PeopleStration</h1>

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
               />

            </div>

            <button
               onClick={() => history.push('/people/create')}
            >
               Cadastrar
            </button>
         </header>

         <div className="people-container">
            <ul>
               {people.map(person => {
                  return (
                     <li key={person.id}>
                        <p>{person.name}</p>
                        <p>{person.gender}</p>
                        <p>{person.email}</p>
                        <p>{person.birthday}</p>
                        <p>{person.place_of_birthday}</p>
                        <p>{person.nationality}</p>
                        <p>{person.cpf}</p>

                        <div className="actions">
                           <button onClick={() => history.push(`/people/edit/${person.id}`)} >
                              Editar
                           </button>

                           <button onClick={() => handleDelete(person.id)}>
                              Deletar
                           </button>
                        </div>

                     </li>
               )})}

            </ul>
         </div>
      </div>
   );
}