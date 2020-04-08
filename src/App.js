import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "http://google.com",
      title: `Title ${Date.now()}`,
      techs: ["node", "react"]
    })

    const repository = response.data;

    setRepos([...repos, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    const newState = repos.filter(repo => repo.id !== id);

    setRepos(newState);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos && repos.map(repo => (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
            </button>
            </li>
          ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
