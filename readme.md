# Deque Workshop

## Prerequisites

- [`node.js`](https://nodejs.org/en/) version 14 or greater.
- [`yarn`](https://yarnpkg.com/) package

### Be sure to install:

- node version 14+
- yarn

## Setup

### Install dependencies

```sh
yarn
```

## Workshop!

**NOTE**: this particular app is built with react, an understanding of react will be helpful but is not required. We will walk you through everything!

Go ahead and run your local dev server (`yarn start`). Feel free to play around with the app and get familiar with it.

### [install "axe Accessibility Linter" if using VSCode!](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)

### Component structure

- `src/index.js` is the entry point to the app. It handles rendering the whole app and, when not in production, will include [`@axe-core/react`](https://www.npmjs.com/package/@axe-core/react)
- `containers/App/index.js` handles the "states" of the `<App />` component. It's sole purpose is to handle state and pass relevant props down to `components/App/index.js`
- `components/App/index.js` renders the "structure" of the app. It is where the global navigation/skip link/main elements live.
- `components/Stats/index.js` is where the recipe stats live ("X eggs used", "Y recipes made", etc.)
- `components/Recipes/index.js` is where the recipe tiles live. It also instantiates the view/edit modals for each recipe.

### Unit tests

_review existing unit tests / assertions_

```sh
yarn test --watch # you may have to type "a" into the console to get *all* tests to run!
```

Fix the failing tests!

Test the live region out with a screen reader!

### axe DevTools

Let's run axe on our app now that we've got passing unit tests.

1. install the [axe extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd?hl=en-US)

- sign up for devtools too! https://www.deque.com/axe/devtools/

1. navigate browser to `http://localhost:1235`
1. open up axe devtools
1. scan the page
1. save results!

- _if you happened to have opened up the devtools console earlier, you probably saw a few of these violations printed out in the console via [`@axe-core/react`](https://www.npmjs.com/package/@axe-core/react)_

1. review serious and critical issues
1. fix all of those issues
1. run the scan again until you have 0 violations (you can ignore the needs review color contrast issues -- no real issues there)

#### Enter IGT

> Intelligent what!?!

axe Devtools Pro's Intelligent Guided Tests will guide you through testing that can't be fully automated and needs a human to answer simple questions in order to raise accessiblity violations that axe can't find on its own. Don't worry, these questions will be very easy to answer and require 0 accessiblity testing expertise.

##### Page Info IGT

Run the very simple Page Info IGT to get acclimated with Intelligent Guided Testing

- fix the title issue by adding a descriptive document title
- run Page Info IGT again and verify that no remaining Page Info issues exist (#axeCleanPageInfoIGT)

##### Keyboard IGT

Run the keyboard IGT and observe what it finds.

- fix the focus indication issues
    <details><summary>hint</summary> see `components/Recipes/index.css` (`.Recipes__card-edit:focus` style declaration)</details>
- fix the fact that the recipe card's edit button is not marked up as a real button :facepalm:
  - write a new unit test for this!
- run the keyboard IGT again to verify that the issues have been resolved! (#axeCleanKeyboardIGT)

##### Images IGT

Run the images IGT and observe what it finds.

- fix the stats images by marking them up as presentational
    <details><summary>hint</summary> adding `alt=""` is sufficient (but you _can_ go above and beyond and also set `role=presentation`)</details>
    - write a unit test for this!
- make the pencil icons "Edit" image's alt text descriptive / unique by following the wireframe's requirement and appending the recipe name to the alt text
  - write a unit test for this!

##### Forms IGT

Click on "COOK CHOCOLATE CAKE" button to launch the modal. In devtools, click "Start testing forms".

- fix the `aria-required` issue
  - bonus: add some visual indication that the field is required!
- make the error messages more descriptive
  - write a unit test for this!
- run the IGT again to verify that no remaining Forms issues exist (#axeCleanFormsIGT)

##### Keep it going

If you have time, run through the other IGTs and see if you can find any other issues

#### Sustainability

We wrote unit tests as we found issues...This prevents us from making the same mistake in the future and ensures these issues do not creep back into the source code.

<details>
  <summary>Example: test that the stats images are all properly marked as decorative/presentational</summary>

```js
// components/Stats/index.test.js
test('marks each icon as decorative', () => {
  const stats = shallow(<Stats stats={statsStub} />);

  stats.find('.Stat__value img').forEach(icon => {
    expect(icon.is('[alt=""]')).toBeTruthy();
  });
});
```

</details>

## Try these techniques on your own content!

- get axe running in your unit tests
- write a11y-specific unit tests
- run IGTs on your page(s)
