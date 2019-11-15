import React,  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import api from '../../services/api'

import { FaGitAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container'



export default function Main() {

  const [name, setName] = useState('')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await api.get(`/repos/${name}`)
      const repositories = {
        name: data.full_name
      }

      setRepos([...repos, repositories])
      setName('')
      setLoading(false)
      localStorage.setItem('repositories', JSON.stringify([...repos, repositories]))


    } catch {
      setLoading(false)
    }

  }

  useEffect(() => {
    const repositories = localStorage.getItem('repositories')
    if(repositories) {
      setRepos(JSON.parse(repositories))
    }
  }, []);

  return (
    <Container>

      <h1>
      <FaGitAlt />
      Repositórios</h1>

    <Form onSubmit={(e) => handleSubmit(e)}>
      <input type='text'
      placeholder='Adicionar repositório'
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <SubmitButton disable={loading}>

      {loading ? <FaSpinner color="#fff" size={14} /> :
      <FaPlus color="#fff" size={14} /> }

      </SubmitButton>

    </Form>

    <List>
    {repos.map(repository =>
      <li key={repository.name}>
      <span>{repository.name}</span>
      <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
      </li>
    )}
    </List>

    </Container>

  );
}
