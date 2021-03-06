import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';

import './styles.css';

export default function Edit() {
   const history = useHistory();
   const { id } = useParams();

   const [name, setName] = useState('');
   const [gender, setGender] = useState('');
   const [email, setEmail] = useState('');
   const [birthday, setBirthday] = useState('');
   const [place_of_birthday, setPlaceOfBirthday] = useState('');
   const [nationality, setNationality] = useState('');
   const [cpf, setCpf] = useState('');

   useEffect(() => {
      try {
         api.get(`/people?id=${id}`).then( response => {
            const [data] = response.data;
   
            setName(data.name);
            setGender(data.gender);
            setEmail(data.email);
            setBirthday(data.birthday.slice(0, 10));
            setPlaceOfBirthday(data.place_of_birthday);
            setNationality(data.nationality);
            setCpf(data.cpf);
         });
         
      } catch(error) {
         console.log(error);
      }

   }, [id]);

   const handleSubmit = async () => {
      const data = {name, gender, email, birthday, place_of_birthday, nationality, cpf};

      const schema = yup.object().shape({
         name: yup.string().required('Nome é obrigatório'),
         gender: yup.string("Formato inválido de Gênero"),
         email: yup.string("Formato inválido de E-mail").email("Formato inválido de E-mail"),
         birthday: yup.date().typeError("Formato inválido de Data de Nascimento").required("Data de Nascimento é obrigatório"),
         place_of_birthday: yup.string("Formato inválido de Naturalidade"),
         nationality: yup.string("Formato inválido de Nacionalidade"),
         cpf: yup.string().length(11, 'CPF deve ter exatamente 11 caracteres'),
      });

      try {
         await schema.validate(data, { abortEarly: false });
         await api.put(`/people/${id}`, data );
         history.push('/people');
      } catch(error) {
         if (error instanceof yup.ValidationError) {
            let messageError = "";
            error.inner.forEach(e => {
               messageError += e.message + "\n";
            });

            alert('\tErros na edição:\n\n' +  messageError);
         } else {
            alert('Erro na edição');
         }
      }
   }
   
   return (
      <div className="edit-container">
         <h1>Editar</h1>

         <form>
            <div className="field-container">
               <label htmlFor="name">Nome</label>
               <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="Ex.: Antônio"
               />
            </div>

            <div className="field-container">
               <label htmlFor="gender">Sexo</label>
               <input
                  id="gender"
                  type="text"
                  value={gender}
                  onChange={event => setGender(event.target.value)}
                  placeholder="Ex.: Masculino"
               />
            </div>

            <div className="field-container">
               <label htmlFor="email">E-mail</label>
               <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Ex.: exemplo@exemplo.com"
               />
            </div>

            <div className="field-container">
               <label htmlFor="birthday">Data de Nascimento</label>
               <input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={event => setBirthday(event.target.value)}
               />
            </div>


            <div className="field-container">
               <label htmlFor="place_of_birthday">Naturalidade</label>
               <input
                  id="place_of_birthday"
                  type="text"
                  value={place_of_birthday}
                  onChange={event => setPlaceOfBirthday(event.target.value)}
                  placeholder="Ex.: João Pessoa"
               />
            </div>


            <div className="field-container">
               <label htmlFor="nationality">Nacionalidade</label>
               <input
                  id="nationality"
                  type="text"
                  value={nationality}
                  onChange={event => setNationality(event.target.value)}
                  placeholder="Ex.: Brasileiro"
               />
            </div>


            <div className="field-container">
               <label htmlFor="cpf">CPF</label>
               <input
                  id="cpf"
                  type="number"
                  value={cpf}
                  onChange={event => setCpf(event.target.value)}
                  placeholder="Ex.: 12345678901"
               />
            </div>
            
         </form>

         <div className="actions">
            <button onClick={handleSubmit}>Editar</button>
            <button onClick={() => history.push('/people')}>Cancelar</button>
         </div>
               
         
      </div>
   );
}