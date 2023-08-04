import { Before, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();

  cy.visit("/");
});

When("The user entered the valid data", () => {
  cy.get("@signUpCredentials").then((credentials) => {
    for (const credential of credentials) {
      cy.get(credential.id).should("be.visible").type(credential.value);
    }
  });

  cy.get("@signUpReasons").then((reasons) => {
    const reason = reasons[Math.floor(Math.random() * reasons.length)];

    cy.get(reason.id).should("be.be.visible").click();
  });

  cy.get('[id="signup_btn"]').should("be.visible").click();
});

When("The user entered the invalid data", () => {
  cy.get("@signUpCredentials").then((credentials) => {
    credentials[Math.floor(Math.random() * credentials.length)]["value"] = "";

    for (const credential of credentials) {
      if (String(credential.value) == "") {
        continue;
      }
      cy.get(credential.id).should("be.visible").type(credential.value);
    }
  });
  cy.get('[id="signup_btn"]').should("be.visible").click();
});

Then("The user redirects to the login page", () => {
  cy.url().should("contain", "dashboard.midtrans.com/register");
});

Then("The user shall receive an error message", () => {
  // The cannot bypass captcha
  cy.get('[class="l-wrong-field l-wrong"]').should(($element) => {
    const text = $element.text();
    expect(text).to.match(/can't be blank|type wrong value/);
  });
});
