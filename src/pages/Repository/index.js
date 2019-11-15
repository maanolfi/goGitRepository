import React, { useState, useEffect } from 'react';

import api from '../../services/api'

import { Loading } from './styles';

const Repository = ({ match }) => {
  const [repo, setRepo] = useState([])
  const [issue, setIssue] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const repoName = decodeURIComponent(match.params.repository)
    async function fetchData() {
      const [repository, issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: { state: 'open', per_page: 5 }
        })
      ])
      setRepo(repository.data)
      setIssue(issues.data)
    }
    fetchData();
  })

  return (
      loading ? <Loading>Carregando</Loading> :
      <h1>{decodeURIComponent(match.params.repository)}</h1>


  );
}

export default Repository
