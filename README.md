<h1 align="center">
 Grocermatic - Australian Grocery Comparison
</h1>

<div align="center">
  <a href="https://www.grocermatic.org](https://www.grocermatic.org">
    <img width="400" src="https://github.com/MengLinMaker/Grocermatic/assets/39476147/ef580265-7427-4491-96e2-739a54dc44f7">
  </a>
</div>

Grocermatic is a web app for comparing and tracking Australian grocery prices. This price tracker identifies good sale prices and exposes price gouging practices from the Woolworths and Coles duopoly. The PWA app is downloadable and accessible offline to aid users with poor internet connections.

Test the application at [www.grocermatic.org](https://www.grocermatic.org) or access the [raw json data](https://product.grocermatic.org/cleanProductInfo.json)

<div flex align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/MengLinMaker/Grocermatic/scrape.yml?style=for-the-badge&label=Webscrape">
  <img src="https://img.shields.io/website?url=https%3A%2F%2Fwww.grocermatic.org&style=for-the-badge">
</div>
<div flex align="center">
  <img src="https://img.shields.io/mozilla-observatory/grade-score/grocermatic.pages.dev?style=for-the-badge">
  <img src="https://img.shields.io/hsts/preload/grocermatic.pages.dev?style=for-the-badge&label=hsts">
  <img src="https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fwww.grocermatic.org&style=for-the-badge">
</div>

<div>&nbsp</div>

## Local Deployment

You must have `node.js` and `git` installed.

1. Clone repository: `git clone https://github.com/MengLinMaker/Grocermatic.git`
2. Install packages: `npm i`
3. Run development frontend: `npm run dev` and visit `localhost:5174`
4. Preview build frontend: `npm run start` and visit `localhost:4174`
5. Scrape data: `npm run scrape`

<div>&nbsp</div>

## Design Docs

The progress and design of the system are **[documented in the wiki](https://github.com/MengLinMaker/Grocery-Suggester/wiki)**.
