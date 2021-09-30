import { encode as base64_encode } from 'base-64'

const backUrl = 'http://91.224.96.21:8000/api/'

describe('workers e2e', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.request('post', backUrl + 'login/', { login: 'test103', password: base64_encode('12345678') })
    cy.get('li:last-child').click()
    cy.get('.ant-menu-title-content a:first-child').contains('Работники').click()
  })
  it('should a title', () => {
    cy.get('h1').contains('Список работников')
    // cy.clearLocalStorage()
  })
  it('should open modal for create workers', () => {
    cy.get('[aria-label="plus"]').click()
  })
  it('should type in input about workers information', () => {
    cy.get('[aria-label="plus"]').click()
    cy.get('[name="name"]').type('11test')
    cy.get('[name="surname"]').type('test')
    cy.get('[name="lastname"]').type('test')
    cy.get('[name="personal_phone"]').type('1111111111')
    cy.get('[name="corporate_phone"]').type('1111111111')
    cy.get('[name="local_phone"]').type('111')
    cy.get('[name="email"]').type('test@mail.com')
    cy.get('[name="login"]').type('test1000')
    cy.get('[name="password"]').type('12345678')
    cy.get('[name="active"]').click()
    cy.get('[title="Admins"]').click()
    cy.get('[class="ant-select-item-option-content"').contains('Developers').click()
    cy.get('[name="role"]').type('developer')
    cy.get('form>div>div>div>button').click().type('2021-09-28T14:12:44.000000Z')
    cy.get('button').should('have.class', 'ant-btn ant-btn-primary').contains('Добавить').click()
  })
})
