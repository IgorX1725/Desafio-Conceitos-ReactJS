import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])
  const [message, setMessage] = useState(null)
  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data)
    })
  },[])
  async function handleAddRepository() {
    const response = await api.post('/repositories',{
          "url": "https://github.com/Rocketseat/umbriel",
           "title": `umbriel ${Date.now()}`,
           "techs": ["Node", "Express", "TypeScript"]
         })

    const newRepository = response.data
    setRepositories([...repositories,newRepository])
  }

  async function handleRemoveRepository(id) {
    try{
      const response = await api.delete(`/repositories/${id}`,)
      if(response.status === 204){
        const filterResult = repositories.filter(repository => repository.id !== id)
        setRepositories(filterResult)
      }
    }catch(err){
      setMessage("Não foi possível remover o repositório neste momento.Tente mais tarde")
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
        {message && <span>{message}</span>}
    </div>
  );
}

export default App;
