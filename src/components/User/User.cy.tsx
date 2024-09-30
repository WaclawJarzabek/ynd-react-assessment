import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { User } from './index'
import { RepoData, SearchedUser } from '@/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})
const Wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const exampleUser: SearchedUser = {
  id: 1,
  login: "john-doe",
  repos_url: "/users/john-doe/repos"
}

const exampleRepo: RepoData = {
  name: "test",
  description: "You have to make these big decisions. The first step to doing anything is to believe you can do it. See it finished in your mind before you ever start. This is your creation - and it's just as unique and special as you are. In your imagination you can go anywhere you want. Trees get lonely too, so we'll give him a little friend.",
  stargazers_count: 32,
  id: 0,
  url: "https://example.com"
}

const exampleRepo2: RepoData = {
  name: "second_repo",
  description: "The more we do this - the more it will do good things to our heart. If you do too much it's going to lose its effectiveness. Isn't that fantastic? Just think about these things in your mind - then bring them into your world.",
  stargazers_count: 1,
  id: 12,
  url: "https://example.com"
}

const prepareTonOfRepos = (initial = 0) => {
  const repoArray: RepoData[] = [];
  for (let x = initial; x < initial+30; x++) {
    repoArray.push({
      id: x,
      name: "testRepo",
      stargazers_count: x,
      url: "htpps://example.com",
      description: "This is dummy repo"
    })
  }
  return repoArray;
}

describe('<User />', () => {

  beforeEach(() => {
    queryClient.clear();
  })

  it('Fetches a couple of users\' repositories', () => {
    //setup interceptors
    cy.intercept('GET', '/users/john-doe/repos', {
      statusCode: 200,
      body: [
        exampleRepo,
        exampleRepo2
      ],
    });
    cy.mount(<Wrapper><User {...exampleUser} /></Wrapper>)
    cy.get('[data-cy=user-body]').should('not.be.visible')
    cy.get('[data-cy=user-name]').click()
    cy.get('[data-cy=user-body]').should('be.visible')
    cy.get('[data-cy=repository').should('have.length', 2)
  })

  it('Chains multiple', () => {
    cy.intercept('GET', '/users/john-doe/repos', {
      statusCode: 200,
      body: prepareTonOfRepos(),
      headers: {
        "link": `</users/john-doe/repos/2>; rel="next",`
      }
    });

    cy.intercept('GET', '/users/john-doe/repos/2', {
      statusCode: 200,
      body: prepareTonOfRepos(1),
      headers: {
        "link": `</users/john-doe/repos/3>; rel="next",`
      }
    });

    cy.intercept('GET', '/users/john-doe/repos/3', {
      statusCode: 200,
      body: [
        exampleRepo,
      ],
    });

    cy.mount(<Wrapper><User {...exampleUser} /></Wrapper>)
    cy.get('[data-cy=user-body]').should('not.be.visible')
    cy.get('[data-cy=user-name]').click()
    cy.get('[data-cy=user-body]').should('be.visible')
    cy.get('[data-cy=repository').should('have.length', 61) //61 = two pages of repos, +1  
    cy.get('[data-cy=repository').should('be.visible')
    cy.get('[data-cy=user-name]').click()
    cy.get('[data-cy=user-body]').should('not.be.visible')
  })

  it('Should show loading message', () => {
    cy.intercept('GET', '/users/john-doe/repos', {
      statusCode: 200,
      body: [
        exampleRepo,
        exampleRepo2
      ],
      delay: 300
    });

    cy.mount(<Wrapper><User {...exampleUser} /></Wrapper>)
    cy.get('[data-cy=user-body]').should('not.be.visible')
    cy.get('[data-cy=user-name]').click()
    cy.get('[data-cy=user-body]').should('be.visible')
    cy.get('[data-cy=user-body]').should('have.text', 'loading...')
    cy.wait(300)
    cy.get('[data-cy=user-body]').should('be.visible')
    cy.get('[data-cy=repository').should('have.length', 2)
  })

  it('Should show error message when request fails', () => {
    cy.intercept('GET', '/users/john-doe/repos', {
      statusCode: 500,
    });

    cy.mount(<Wrapper><User {...exampleUser} /></Wrapper>)
    cy.get('[data-cy=user-body]').should('not.be.visible')
    cy.get('[data-cy=user-name]').click()
    cy.get('[data-cy=user-body]').should('be.visible')
    cy.get('[data-cy=user-body]').should('have.text', 'something went wrong, check your internet connection')
    cy.get('[data-cy=repository').should('not.exist')
  })
})
