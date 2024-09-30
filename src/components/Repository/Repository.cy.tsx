import React from 'react'
import { Repository } from './index'
import { RepoData } from '@/types'

const exampleRepo: RepoData = {
  name: "test",
  description: "You have to make these big decisions. The first step to doing anything is to believe you can do it. See it finished in your mind before you ever start. This is your creation - and it's just as unique and special as you are. In your imagination you can go anywhere you want. Trees get lonely too, so we'll give him a little friend.",
  stargazers_count: 32,
  id: 0,
  url: "https://example.com"
}

describe('<Repository />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Repository {...exampleRepo} />)
    cy.get('[data-cy=repository-title]').should('have.text', exampleRepo.name)
    cy.get('[data-cy=repository-description]').should('have.text', exampleRepo.description)
    cy.get('[data-cy=repository-stargazers-count]').should('have.text', exampleRepo.stargazers_count)
  })
})