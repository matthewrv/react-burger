/// <reference types="cypress" />

describe("burger constructor page", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
      fixture: "user",
    });
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients",
    });
    cy.visit("http://localhost:5173", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", "placeholder");
      },
    });
    cy.get("[data-testid=constructor-drop-region]").as("drop-region");
  });

  it("drag bun", () => {
    cy.get("[data-testid=ingredients-item-bun]").first().as("ingredient-card");

    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Булка #1");
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .find("[data-testid=constructor-item]")
      .should("have.length", 2);
  });

  it("drag ingredient", () => {
    cy.get("[data-testid=ingredients-item-main]").first().as("ingredient-card");

    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Котлета");
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .find("[data-testid=constructor-item]")
      .should("have.length", 1);
  });

  it("drag multiple instances of ingredient", () => {
    cy.get("[data-testid=ingredients-item-main]").first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Котлета");

    // drag first element
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .find("[data-testid=constructor-item]")
      .should("have.length", 1);

    // drag second element
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .find("[data-testid=constructor-item]")
      .should("have.length", 2);
  });

  it("show modal", () => {
    cy.get("[data-testid=ingredients-item-main]").first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Котлета")
      .click();

    cy.get("[data-testid=modal]").should("exist");
    cy.get("[data-testid=modal-overlay]").should("exist");
  });

  it("close modal by click on overlay", () => {
    cy.get("[data-testid=ingredients-item-main]").first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Котлета")
      .click();

    cy.get("[data-testid=modal-overlay]")
      .should("exist")
      .click({ force: true })
      .should("not.exist");
  });

  it("close modal by click on close button", () => {
    cy.get("[data-testid=ingredients-item-main]").first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Котлета")
      .click();

    cy.get("[data-testid=modal-close-button]")
      .should("exist")
      .click({ force: true })
      .should("not.exist");
  });

  it("create order", () => {
    cy.get("[data-testid=ingredients-item-bun]").first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Булка #1")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.get("[data-testid=ingredients-item-main]").first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Котлета")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.get("[data-testid=ingredients-item-sauce]")
      .first()
      .as("ingredient-card");
    cy.get("@ingredient-card")
      .find("[data-testid=ingredient-title]")
      .should("have.text", "Соус")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.get("[data-testid=total-price]").should("have.text", "170 ");

    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "create-order",
    });
    cy.get("[data-testid=checkout-button]").click();
    cy.get("[data-testid=modal]").should("exist");
  });
});
