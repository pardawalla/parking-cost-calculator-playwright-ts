# parking-cost-calculator-playwright-ts

Sample automated tests for the [Parking Cost Calculator](https://www.shino.de/parkcalc/), using the Playwright and Typescript.

## Dev Env
- Editor: VScode
- OS: macOS Ventura 13.1
- Browser: Chrome Version 108.0.5359.124 (Official Build) (x86_64)

## To Run
From the terminal type the command `npx playwright test parking-cost-calc.spec.ts`
You can then see the report by running the command `npx playwright show-report`

## To-Do
- Update the tests to now take in time. Otherwise you'll just get zero for the price.
- Write tests for the remaining options, e.g. Long-Term Garage and Long-Term Surface parking options.
- Add tests to check for invalid inputs, e.g date not added, leaving date is before the start date etc.
- Move helper functions to a new file.