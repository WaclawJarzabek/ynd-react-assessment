import React from 'react'
import { NameForm } from './index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { API_ADDRESS } from '@/const'
import { SearchedUser } from '@/types'

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

let userNumber = 0;
const createUser = () => {
  return {
    id: userNumber++,
    login: "john-doe",
    repos_url: "https://example.com"
  }
}

describe('<NameForm />', () => {
  beforeEach(() => {
    queryClient.clear();
  })

  it('renders', () => {
    cy.intercept('https://example.com', {
      body: '',
      statusCode: 500,
    })

    cy.intercept('https://api.github.com/search/**', {
      body: {items: [
        createUser(),
        createUser(),
        createUser(),
        createUser(),
        createUser()
      ]},
      statusCode: 200
    }).as('searchReq')
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Wrapper><NameForm /></Wrapper>)
    cy.get('[cy-data=input]').click().type('john')
      .should('have.value', 'john')
    cy.get('[cy-data=submit]').click()

    cy.wait('@searchReq').its('request.query').then((query) => {
      expect(query['q']).to.be.equal('john in:login')
      expect(query['per_page']).to.be.equal('5')
    })

    cy.get('[cy-data=user-list').should('exist')
    cy.get('[cy-data=user-search-result').should('have.text', 'Showing results for "john"')
  })
})
