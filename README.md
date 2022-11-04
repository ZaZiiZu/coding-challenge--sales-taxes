[ToC]

---
## Prerequisites
- having [node.js](https://nodejs.org/en/) installed (version high enough to run angular 14.2, see [nodejs-angular compatibility matrix](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3))
- do `npm install` in this root folder
## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

## Problem to solve: SALES TAXES
Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical products that are exempt.
Import duty is an additional sales tax applicable on all imported goods at a rate of 5%, with no exemptions.

When I purchase items I receive a receipt which lists the name of all the items and their price (including tax), finishing with the total cost of the items, and the total amounts of sales taxes paid.

The rounding rules for sales tax are that for a tax rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.

Write an application that prints out the receipt details for these shopping baskets...
#### INPUT
Input 1:
> 1 book at 12.49
> 1 music CD at 14.99
> 1 chocolate bar at 0.85

Input 2:
> 1 imported box of chocolates at 10.00
> 1 imported bottle of perfume at 47.50

Input 3:
> 1 imported bottle of perfume at 27.99
> 1 bottle of perfume at 18.99
> 1 packet of headache pills at 9.75
> 1 box of imported chocolates at 11.25

#### OUTPUT
Output 1:
> 1 book: 12.49
> 1 music CD: 16.49
> 1 chocolate bar: 0.85
> Sales Taxes: 1.50
> Total: 29.83

Output 2:
> 1 imported box of chocolates: 10.50
> 1 imported bottle of perfume: 54.65
> Sales Taxes: 7.65
> Total: 65.15

Output 3:
> 1 imported bottle of perfume: 32.19
> 1 bottle of perfume: 20.89
> 1 packet of headache pills: 9.75
> 1 imported box of chocolates: 11.85
> Sales Taxes: 6.70
> Total: 74.68

---
## Work Process

#### Tech stack decision
I went for Angular for following reasons:
- that's the framework I've most experience with (and it uses TypeScript)
- angular-cli creates most of the boiler-plate code
  - project with modules and spec files
  - all wiring done (most frameworks have that kind of cli builder)
- I/O is fairly simple with HTML. Via CLI (e.g. node.js) it's not that user-friendly

#### Coding process
by git commits
1) "initial app (using angular-cli)"
    - basically just ran `ng new sales-taxes` and went through the configuration wizard (selected SCSS, Routing enabled)

2) "add first few functions to help with Problem (updated in Readme.md)"
    - started with some pure functions in /src/lib folder
      - I went for pure functions over some 'class' since those are easy to test (having no dependencies or side-effects) and suffice for the use-case for now
      - the test-cases were mostly 'happy-flow' cases. Any "special cases" I'd prefer doing regression-tests after stuff breaks and the expected behavior got discussed better.
      - it's already clear that some product-names could break the 'algorithm' of parsing and categorizing input (e.g. 'book about imported pills and chocolate' which has all the keywords but should "clearly" be a book)
    - created first few interfaces and constants in /src/lib/models
      - again, no 'classes' in terms of OOP.
    - Biggest challenge here was RegEx. While "RegEx" is my solution to any and every parsing/validation, I always forget soon after how fragile yet difficult those expressions are. Relying on the tests to keep them stable for now.
      - in real world the "products" would come from a database already categorized.
      - the categorizing-problem would then only be that of the database-supplier. And they probably use machine-learning paired with manual/human reviews and/or some fairly sophisiticated algorithms.

3) "add taxes-utils, extend/update input-parser to handle 'imported' keyword"
    - still without any UI, continued with the (helper-) functions and their tests
    - pretty straight forward, no issues

4) "add cart-module containing a cart-facade (wiring all the function into 'getCart' method) and some very basic components to input/output the cart-content"
    - that one looks big due to the cli-generated boilerplate code
    - I created a module "Cart" in feature-module folder /app/cart
      - it contains feature-specific code:
        - module with imports/exports: fairly contained so it eventually can be lazy-loaded (skipped that for now because its the only feature to view)
        - cart.page.html/ts: the page combining all the dumb components and business-logic
        - input- and output-components: basically a textarea as input with an input-debouncer, and simple one-way binding to html inner-text as output
        - all the feature-specific models/interfaces: re-exported the lib models, and extended with new/updated interfaces
        - a facade: 
          - that one combines the big steps: 
            - parse input (which internally also categorizes the products)
            - apply taxes (save as fields in products-/cart-objects)
            - return the 'done' cart model
          - "Vision" for the facade (see [design pattern](https://refactoring.guru/design-patterns/facade)): in a real-world application those steps would most likely be done in backend by different domains/microservices. with the facade the refactoring will be very simple since its' interface stays the same (just becomes async)
          - issue/todo: I noticed the "floating point precision" issue somewhat late. while I 'patched' it for now, I believe the "rounding" needs a more solid solution. In real-world this will probably be done by backend, and should reduce the floating-point issues by a lot. In few cases the number can simply be formatted for user in view while maintaining the precision in model, that was not the case here.
    - In the lib
      - updated taxes-utils to correctly round the taxes (to next 0.05 step as required)
      - added output-parser
    - **Topics I skipped**
      - styling in HTML
        - I did quite a bit of styling in past few years, and this challenge doesn't really 'need' it. So app looks "bad" for now
        - If styling and/or decent user-experience was required, I'd probably pick some UI component library like PrimeNG - good enough for nice looking prototype
      - e2e tests, and unit-tests in non-critical parts (like template bindings or the currently simple angular-components)

