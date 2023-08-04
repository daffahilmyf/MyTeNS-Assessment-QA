import { Given } from "@badeball/cypress-cucumber-preprocessor";

import { faker } from "@faker-js/faker";

Given("A web browser is at the coco landing page", () => {
  cy.url().should("eql", Cypress.config("baseUrl"));
});

Given("The user navigates to the sign up page", () => {
  const password =
    "Test1" +
    faker.internet.password({
      length: 6,
    });

  const credentials = [
    { id: '[id="user_merchant_name"]', value: faker.person.jobTitle() },
    {
      id: '[id="user_full_name"]',
      value: faker.person.fullName({ firstName: "John" }),
    },
    {
      id: '[id="user_email"]',
      value: faker.internet.email({ provider: "gmail.com" }),
    },
    { id: '[id="user_phone"]', value: faker.phone.number("818#######") },
    { id: '[id="user_password"]', value: password },
    { id: '[id="user_password_confirmation"]', value: password },
  ];

  const reasons = [
    { id: '[id="user_business_type_corporate"]' },
    { id: '[id="user_business_type_individual"]' },
  ];

  cy.wrap(credentials).as("signUpCredentials");
  cy.wrap(reasons).as("signUpReasons");

  cy.get('a[class*="btn btn-signup"]', {
    timeout: 10000,
  })
    .and("be.visible")
    .invoke("removeAttr", "target")
    .click();

  cy.url().should("contain", "dashboard.midtrans.com/register");
});
