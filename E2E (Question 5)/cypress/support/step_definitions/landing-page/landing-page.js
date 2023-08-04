import { Before, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import {} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("/");
});

When("The user interacts with carousel button", () => {
  const interactButtons = ['[data-slide="next"]', '[data-slide="prev"]'];

  cy.get('[class="item active"]').then(($element) => {
    const reactId = $element.attr("data-reactid");

    cy.get(`[data-reactid="${reactId}"]`).as("previousActiveImage");
  });

  const button =
    interactButtons[Math.floor(Math.random() * interactButtons.length)];

  cy.get(button).click();
});

When("The user buy an items", () => {
  cy.get('[class="btn buy"]').should("be.visible").click();
});
When("The user entered the valid shopping cart data", () => {
  cy.get('[class="cart-checkout"]').should("be.visible").click();
});

When("The user entered the invalid shopping cart data", () => {
  cy.get('[data-reactid=".0.0.1.0.3.0.0.0.1.0"]').clear();
  cy.get('[class="cart-checkout"]').should("be.visible").click();
});

Then("The user shall receive checkout message", () => {
  cy.get('[id="snap-midtrans"]').should("be.visible");
});

Then("The user shall receive a checkout error message", () => {
  cy.get('[id="snap-midtrans"]').should("be.visible");
});

Then("The user sees the page image change", () => {
  cy.get("@previousActiveImage").should(
    "not.have.attr",
    "class",
    "item active"
  );
});
