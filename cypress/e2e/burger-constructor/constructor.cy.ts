/// <reference types="cypress" />

describe("burger constructor page", () => {
  const mainIngredientSelector = "[data-testid=ingredients-item-main]";
  const bunIngredientSelector = "[data-testid=ingredients-item-bun]";
  const sauseIngredientSelector = "[data-testid=ingredients-item-sauce]";
  const ingredientTitleSelector = "[data-testid=ingredient-title]";

  const constructorItemSelector = "[data-testid=constructor-item]";

  const modalSelector = "[data-testid=modal]";
  const modalOverlaySelector = "[data-testid=modal-overlay]";
  const modalCloseButtonSelector = "[data-testid=modal-close-button]";

  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", {
      fixture: "user",
    });
    cy.intercept("GET", "api/ingredients", {
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
    cy.get(bunIngredientSelector).first().as("ingredient-card");

    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Булка #1");
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .find(constructorItemSelector)
      .should("have.length", 2);
  });

  it("drag ingredient", () => {
    cy.get(mainIngredientSelector).first().as("ingredient-card");

    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Котлета");
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .find(constructorItemSelector)
      .should("have.length", 1);
  });

  it("drag multiple instances of ingredient", () => {
    cy.get(mainIngredientSelector).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Котлета");

    // drag first element
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .find(constructorItemSelector)
      .should("have.length", 1);

    // drag second element
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .find(constructorItemSelector)
      .should("have.length", 2);
  });

  it("show modal", () => {
    cy.get(mainIngredientSelector).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Котлета")
      .click();

    cy.get(modalSelector).as("modal").should("exist");
    cy.get(modalOverlaySelector).should("exist");
    cy.get("@modal").find("[data-testid=ingredient-image]").should("exist");
    cy.get("@modal").find("[data-testid=ingredient-name]").should("exist");
  });

  it("close modal by click on overlay", () => {
    cy.get(mainIngredientSelector).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Котлета")
      .click();

    cy.get(modalOverlaySelector)
      .should("exist")
      .click({ force: true })
      .should("not.exist");
  });

  it("close modal by click on close button", () => {
    cy.get(mainIngredientSelector).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Котлета")
      .click();

    cy.get(modalCloseButtonSelector)
      .should("exist")
      .click({ force: true })
      .should("not.exist");
  });

  it("create order", () => {
    cy.get(bunIngredientSelector).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Булка #1")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.get(mainIngredientSelector).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Котлета")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.get(sauseIngredientSelector).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .find(ingredientTitleSelector)
      .should("have.text", "Соус")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.get("[data-testid=total-price]").should("have.text", "170 ");

    cy.intercept("POST", "api/orders", {
      fixture: "create-order",
    });
    cy.get("[data-testid=checkout-button]").click();
    cy.get(modalSelector).should("exist");

    cy.get(modalCloseButtonSelector)
      .should("exist")
      .click({ force: true })
      .should("not.exist");
  });
});
