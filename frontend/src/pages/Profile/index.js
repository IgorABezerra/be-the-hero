import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

let pages = 1;
export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function getIncidents() {
    try {
      const { data } = await api.get('profile', {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents([...data]);

      pages++;
    } catch (err) {
      alert(
        'Não foi possível carregar os dados de incidentes no momento. Tente recarregar a página',
      );
    }
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongId },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert('Não foi possível deletar seu incidente agora :c');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  useEffect(() => {
    getIncidents();
  }, []);

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vindx, {ongName}</span>
        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout}>
          <FiPower size="18" color="#000" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident, index) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
