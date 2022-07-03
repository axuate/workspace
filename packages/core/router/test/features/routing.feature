Feature: Routing

  Scenario: Routing a path without routes
    Given no routes
    When routing /a
    Then return undefined

  Scenario: Routing with one matching route defined
    Given route /a
    When routing /a
    Then return /a

  Scenario: Routing with two routes defined
    Given route /a
    And route /b
    When routing /a
    Then return /a

  Scenario: Routing with a variable defined
    Given route /a/{id}
    When routing /a/3
    Then return /a/{id}

  Scenario: Routing multiple segments
    Given route /a/b/c
    When routing /a/b/c
    Then return /a/b/c

  Scenario: Resolve variables
    Given route /a/{id}/b
    When routing /a/2/b
    Then id should be 2

  Scenario: Resolving multiple variables
    Given route /a/{id}/b/{name}
    When routing /a/2/b/test
    Then id should be 2
    And name should be test

  Scenario: Prefer static segments over variable ones
    Given route /a/{name}/b
    And route /a/test/b
    When routing /a/test/b
    Then return /a/test/b

  Scenario: Add a shorter route after a longer one
    Given route /a/b/c
    And route /a/b
    When routing /a/b
    Then return /a/b