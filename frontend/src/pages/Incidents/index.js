import React, { useState } from 'react';

import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function Incidents() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      await api.post(
        'incidents',
        { title, description, value },
        { headers: { Authorization: ongId } },
      );

      history.push('/profile');
    } catch (err) {
      alert('Não foi possível criar um novo caso. Tente novamente mais tarde');
    }
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} alt="" />

          <h1>Cadastrar novo caso</h1>

          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Retornar a Home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Título do Caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="textarea"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="submit" className="button">
            Cadastrar caso
          </button>
        </form>
      </div>
    </div>
  );
}
