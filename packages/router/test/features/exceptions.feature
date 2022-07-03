Feature: Adding routes
  Scenario: Adding a route that does already exist
    Given route /a
    And route /a
    Then the router throws "Route /a has already been defined."

  Scenario: Adding a route with variables that does already exist
    Given route /a/{id}
    And route /a/{personId}
    Then the router throws "Route /a/{personId} has already been defined."

  Scenario Template: The router should validate <route>
    Given route <route>
    Then the router throws "<error>"
    Examples:
      | route          | error                                |
      | /              | A single slash is not a valid route  |
      | a              | All routes should start with a slash |
      | /a/            | Routes must not end with a slash     |
      | /a.js          | Dots are not allowed in routes       |
      | /a//b          | Path segments must not be empty      |
      | /a/*/b         | All wildcard must be named           |
      | /a/{id}/b/{id} | Variables must have a unique name    |