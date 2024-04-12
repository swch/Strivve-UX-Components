describe("Strivve Component Integration Tests", function () {
  // Configure the environment
  before(() => {
    if (Cypress.env("CONFIG_OVERRIDES")) {
      const { cardupdatr_ui_url } = Cypress.env("CONFIG_OVERRIDES");
      cy.log(cardupdatr_ui_url);
      if (cardupdatr_ui_url) {
        Cypress.config("baseUrl", `${cardupdatr_ui_url}`);
      } else {
        Cypress.config("baseUrl", `https://staging.cardupdatr.app`);
      }
    } else {
      Cypress.config("baseUrl", `https://staging.cardupdatr.app`);
    }

    Cypress.config("pageLoadTimeout", 60000);
    Cypress.config("defaultCommandTimeout", 60000);
  });
  //checking the URL works or not
  beforeEach(() => {
    cy.visit("/components.html");
    cy.get(".loader").should("be.visible");
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  xit("Functional Check - Credential Entry & Successful TFA", function () {
    cy.get("#account-link-username").type("good_email");
    cy.get("#account-link-password").type("tfa{enter}");
    cy.wait(3000);

    cy.get('[data-testid="account-link-progress"]').should("be.visible");
    cy.get('[data-testid="account-link-progress"]').should("be.visible");
    cy.wait(3000);
    cy.get("#account-link-tfa").type("1234{enter}");
    cy.wait(3000);
    cy.get('[data-testid="account-link-progress"]').should("be.visible");

    cy.get('[data-testid="account-link-success"]').should("be.visible");
  });

  xit("Functional Check - Credential Entry & Multiple Failed TFA Requests", function () {
    cy.get("#account-link-username").type("good_email");
    cy.get("#account-link-password").type("tfa{enter}");
    cy.wait(3000);

    cy.get('[data-testid="account-link-progress"]').should("be.visible");
    cy.wait(3000);

    cy.get("#account-link-tfa").should("be.visible");
    cy.wait(3000);
    cy.get("#account-link-tfa").type("5555{enter}");
    cy.wait(3000);
    cy.get('[data-testid="account-link-progress"]').should("be.visible");

    cy.get("#account-link-tfa").should("be.visible");
    cy.wait(3000);
    cy.get("#account-link-tfa").type("1111{enter}");
    cy.wait(3000);
    cy.get('[data-testid="account-link-progress"]').should("be.visible");

    cy.get("#account-link-tfa").should("be.visible");
    cy.wait(3000);
    cy.get("#account-link-tfa").type("2222{enter}");
    cy.wait(3000);
    cy.get('[data-testid="account-link-progress"]').should("be.visible");

    cy.get('[data-testid="account-link-error"]').should("be.visible");
  });

  xit("Functional Check - Credential Entry & Good Credentials", function () {
    cy.get("#account-link-username").type("good_email");
    cy.get("#account-link-password").type("no_tfa{enter}");
    cy.wait(3000);

    cy.get('[data-testid="account-link-progress"]').should("be.visible");
    cy.wait(3000);

    cy.get('[data-testid="account-link-success"]').should("be.visible");
  });

  xit("Functional Check - Credential Entry & Multiple Failed Credentials", function () {
    cy.get("#account-link-username").type("asdsd");
    cy.get("#account-link-password").type("ssssss{enter}");
    cy.wait(3000);

    cy.get('[data-testid="account-link-progress"]').should("be.visible");
    cy.wait(3000);

    cy.get("#account-link-username").should("be.visible");
    cy.get("#account-link-username").type("asdsd");
    cy.get("#account-link-password").type("aaaaaa{enter}");
    cy.wait(3000);

    cy.get('[data-testid="account-link-progress"]').should("be.visible");
    cy.wait(3000);

    cy.get('[data-testid="account-link-error"]').should("be.visible");
  });

  xit("Functional Check - Credential Entry & Single Bad Credentials", function () {
    cy.get("#account-link-username").type("asdsd");
    cy.get("#account-link-password").type("ssssss{enter}");
    cy.wait(3000);

    cy.get('[data-testid="account-link-progress"]').should("be.visible");
    cy.wait(3000);

    cy.get("#account-link-username").should("be.visible");
    cy.get("#account-link-username").type("good_email");
    cy.get("#account-link-password").type("no_tfa{enter}");
    cy.wait(3000);

    cy.get('[data-testid="account-link-progress"]').should("be.visible");
    cy.wait(3000);

    cy.get('[data-testid="account-link-success"]').should("be.visible");
  });
});
