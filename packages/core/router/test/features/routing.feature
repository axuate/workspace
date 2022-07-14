Feature: Routing

  Scenario: Routing a path without routes
    Given no routes
    When routing GET /a
    Then return undefined

  Scenario: Register same router with different methods
    Given route GET /a
    And route POST /a
    When routing POST /a
    Then return /a

  Scenario: Return undefined if method is wrong
    Given route GET /a
    When routing POST /a
    Then return undefined

  Scenario: Routing with one matching route defined
    Given route GET /a
    When routing GET /a
    Then return /a

  Scenario: Routing with two routes defined
    Given route GET /a
    And route GET /b
    When routing GET /a
    Then return /a

  Scenario: Routing with a variable defined
    Given route GET /a/{id}
    When routing GET /a/3
    Then return /a/{id}

  Scenario: Routing multiple segments
    Given route GET /a/b/c
    When routing GET /a/b/c
    Then return /a/b/c

  Scenario: Resolve variables
    Given route GET /a/{id}/b
    When routing GET /a/2/b
    Then id should be 2

  Scenario: Resolving multiple variables
    Given route GET /a/{id}/b/{name}
    When routing GET /a/2/b/test
    Then id should be 2
    And name should be test

  Scenario: Prefer static segments over variable ones
    Given route GET /a/{name}/b
    And route GET /a/test/b
    When routing GET /a/test/b
    Then return /a/test/b

  Scenario: Add a shorter route after a longer one
    Given route GET /a/b/c
    And route GET /a/b
    When routing GET /a/b
    Then return /a/b