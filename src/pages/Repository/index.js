import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '../../services/api'

import Container from '../../components/Container'
import { Loading, Owner, IssueList } from './styles';

const Repository = ({ match }) => {
  const [repo, setRepo] = useState([])
  const [issue, setIssue] = useState([])


  useEffect(() => {
    fetchData();

  }, [])

  const fetchData = async () => {

    const repoName = decodeURIComponent(match.params.repository)
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: { state: 'open', per_page: 5 }
      })
    ])
    setRepo(repository.data)
    setIssue(issues.data)

  }

  return (
    repo.owner === undefined || issue === [] ? <Loading>Carregando</Loading> :
      <Container>
      <Owner>
        <Link to='/'>Voltar aos repositórios</Link>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>

      <IssueList>
        {
          issue.map(issues => (
            <li key={String(issues.id)}>
              <img src={issues.user.avatar_url} alt={issues.user.login}/>
              <div>
                <strong>
                  <a href={issues.html_url}>{issues.title}</a>
                  {issues.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issues.user.login}</p>
              </div>
            </li>
          ))
        }
      </IssueList>


      </Container>


  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string
    })
  }).isRequired
};

export default Repository
