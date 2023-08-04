Feature: Sign Up Feature
    As a user I want to sign up to the system, so i can use it later

    Background:
        Given A web browser is at the coco landing page
        And The user navigates to the sign up page

    Scenario: Successful User Sign Up
        When The user entered the valid data
        Then The user redirects to the login page

    Scenario: Error Handling for Invalid User Sign Up Data
        When The user entered the invalid data
        Then The user shall receive an error message

    