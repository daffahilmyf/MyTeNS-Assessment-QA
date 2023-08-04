Feature: Landing Page
    As a user I want to sign up to the system, so i can use it later

    Background:
        Given A web browser is at the coco landing page
        


    Scenario: Successful change the background
        When The user interacts with carousel button
        Then The user sees the page image change

    Scenario: Successfull buy an item
        When The user buy an items
        And The user entered the valid shopping cart data
        Then The user shall receive checkout message

        Scenario: Error Handling for Invalid Shopping Data
        When The user buy an items
        And The user entered the invalid shopping cart data
        Then The user shall receive a checkout error message

    