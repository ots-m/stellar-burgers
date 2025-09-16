/// <reference types="cypress" />

import { selectors } from '../support/selectors';

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', `api/auth/user`, {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', `api/orders`, {
      fixture: 'order.json'
    }).as('createOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mock-refresh-token');
      cy.setCookie('accessToken', 'Bearer mock-access-token');
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавлять булку в конструктор', () => {
      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Краторная булка Ots-57')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.constructorElement).should(
        'contain',
        'Краторная булка Ots-57'
      );
    });

    it('должен добавлять ингре в конструктор', () => {
      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Мясо бессмертных моллюсков Protostomia')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Соус Spicy-X')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.constructorElement).should(
        'contain',
        'Мясо бессмертных моллюсков Protostomia'
      );

      cy.get(selectors.constructorElement).should('contain', 'Соус Spicy-X');
    });

    it('должен добавить все типы ингредиентов', () => {
      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Краторная булка Ots-57')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Мясо бессмертных моллюсков Protostomia')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Соус Spicy-X')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.constructorElement)
        .should('contain', 'Краторная булка Ots-57')
        .should('contain', 'Мясо бессмертных моллюсков Protostomia')
        .should('contain', 'Соус Spicy-X');
    });
  });

  describe('Работа модальных окон', () => {
    it('должен открывать модальное окно ингредиента', () => {
      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Краторная булка Ots-57')
        .click();

      cy.get(selectors.modal).should('be.visible');

      cy.get(selectors.modal).should('contain', 'Краторная булка Ots-57');
    });

    it('должен закрывать модальное окно по клику на крестик', () => {
      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Краторная булка Ots-57')
        .click();

      cy.get(selectors.modal).should('be.visible');

      cy.get(selectors.modalClose).click();

      cy.get(selectors.modal).should('not.exist');
    });

    it('должен закрывать модальное окно по клику на оверлей', () => {
      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Мясо бессмертных моллюсков Protostomia')
        .click();

      cy.get(selectors.modal).should('be.visible');

      cy.get(selectors.modalOverlay).click({ force: true });

      cy.get(selectors.modal).should('not.exist');
    });

    it('должен закрывать модальное окно по нажатию esc', () => {
      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Соус Spicy-X')
        .click();

      cy.get(selectors.modal).should('be.visible');

      cy.get('body').type('{esc}');

      cy.get(selectors.modal).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('должен создавать заказ', () => {
      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Краторная булка Ots-57')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Мясо бессмертных моллюсков Protostomia')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.ingredientList)
        .find(selectors.ingredient)
        .contains('Соус Spicy-X')
        .parent()
        .find('button')
        .click();

      cy.get(selectors.constructorElement)
        .should('contain', 'Краторная булка Ots-57')
        .should('contain', 'Мясо бессмертных моллюсков Protostomia')
        .should('contain', 'Соус Spicy-X');

      cy.get(selectors.orderButton).click();

      cy.wait('@createOrder');

      cy.get(selectors.modal).should('exist').should('be.visible');

      cy.get(selectors.orderNumber).should('contain', '88791');

      cy.get(selectors.modalClose).click();

      cy.get(selectors.modal).should('not.exist');

      cy.get(selectors.constructorElement)
        .should('not.contain', 'Краторная булка Ots-57')
        .should('not.contain', 'Мясо бессмертных моллюсков Protostomia')
        .should('not.contain', 'Соус Spicy-X');
    });
  });
});
