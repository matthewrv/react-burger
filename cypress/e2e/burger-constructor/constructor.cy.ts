/// <reference types="cypress" />

describe("burger constructor page", () => {
  const mainIngredientTestId = "ingredients-item-main";
  const bunIngredientTestId = "ingredients-item-bun";
  const sauseIngredientTestId = "ingredients-item-sauce";
  const ingredientTitleTestId = "ingredient-title";

  const constructorItemTestId = "constructor-item";

  const modalTestId = "modal";
  const modalOverlayTestId = "modal-overlay";
  const modalCloseButtonTestId = "modal-close-button";

  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", {
      fixture: "user",
    });
    cy.intercept("GET", "api/ingredients", {
      fixture: "ingredients",
    });
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", "placeholder");
      },
    });
    cy.getTestItem("constructor-drop-region").as("drop-region");
  });

  it("drag bun", () => {
    cy.getTestItem(bunIngredientTestId).first().as("ingredient-card");

    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Булка #1");
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .findTestItem(constructorItemTestId)
      .should("have.length", 2);
  });

  it("drag ingredient", () => {
    cy.getTestItem(mainIngredientTestId).first().as("ingredient-card");

    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Котлета");
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .findTestItem(constructorItemTestId)
      .should("have.length", 1);
  });

  it("drag multiple instances of ingredient", () => {
    cy.getTestItem(mainIngredientTestId).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Котлета");

    // drag first element
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .findTestItem(constructorItemTestId)
      .should("have.length", 1);

    // drag second element
    cy.get("@ingredient-card").trigger("dragstart");
    cy.get("@drop-region")
      .trigger("drop")
      .findTestItem(constructorItemTestId)
      .should("have.length", 2);
  });

  it("show modal", () => {
    cy.getTestItem(mainIngredientTestId).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Котлета")
      .click();

    cy.getTestItem(modalTestId).as("modal").should("exist");
    cy.getTestItem(modalOverlayTestId).should("exist");
    cy.get("@modal").findTestItem("ingredient-image").should("exist");
    cy.get("@modal").findTestItem("ingredient-name").should("exist");
  });

  it("close modal by click on overlay", () => {
    cy.getTestItem(mainIngredientTestId).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Котлета")
      .click();

    cy.getTestItem(modalOverlayTestId)
      .should("exist")
      .click({ force: true })
      .should("not.exist");
  });

  it("close modal by click on close button", () => {
    cy.getTestItem(mainIngredientTestId).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Котлета")
      .click();

    cy.getTestItem(modalCloseButtonTestId)
      .should("exist")
      .click({ force: true })
      .should("not.exist");
  });

  it("create order", () => {
    cy.getTestItem(bunIngredientTestId).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Булка #1")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.getTestItem(mainIngredientTestId).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Котлета")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.getTestItem(sauseIngredientTestId).first().as("ingredient-card");
    cy.get("@ingredient-card")
      .findTestItem(ingredientTitleTestId)
      .should("have.text", "Соус")
      .trigger("dragstart");
    cy.get("@drop-region").trigger("drop");

    cy.getTestItem("total-price").should("have.text", "170 ");

    cy.intercept("POST", "api/orders", {
      fixture: "create-order",
    });
    cy.getTestItem("checkout-button").click();
    cy.getTestItem(modalTestId).should("exist");

    cy.getTestItem(modalCloseButtonTestId)
      .should("exist")
      .click({ force: true })
      .should("not.exist");
  });
});
