This repository includes various dynamic visualizations that were implemented in the mito browser. As the mito browser was implemented in a React environment, this project uses React as well.

## Prerequisites

- [npm](https://www.npmjs.com/), which is required for create-react-app
- [Create React App](https://github.com/facebook/create-react-app), which can be installed with the command: `npm install create-react-app`
- The app also uses [React Router](https://reacttraining.com/react-router/), which can be installed with `npm install react-router-dom`

## Getting Started

A React app can be created with `npx create-react-app mito_browser`.

In the project directory, start the app in development mode using `npm start`.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Contents

### [/public](https://github.com/lilyzhouZYJ/mito_browser/tree/master/public)

- [index.html](https://github.com/lilyzhouZYJ/mito_browser/blob/master/public/index.html) is the html that is rendered onto the webpage and contains the root div (`<div id="root">`)

### [/src](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src)

- [index.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/index.js), which renders the `App` component to the root div in ../public/index.html
- [App.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/App.js), which renders the various components needed on the webpage
- [components](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components), which includes the components. See below

### [/src/components](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components)
- [Navbar.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/Navbar.js), navigation bar that includes 6 tabs:
  - Home
  - SVG
  - Gene SVG
  - tRNA SVG
  - Tree SVG
  - rRNA SVG
- [Home.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/Home.js), home page and also landing page for the app
- [SVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/SVG.js), a visualization tool for mitochondrial DNA. Allows for 3 types of user input:
  - Mitochondrial gene name
  - Genetic variant
  - Start and end coordinates of a deletion
  Respectively, the tool will highlight either the gene, the variant location, or the deletion region.
- *[GeneSVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/GeneSVG.js), also provides visualization for mitochondrial DNA. Dynamic based on props passed from [App.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/App.js) but not interactive.
- *[TrnaSVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/TrnaSVG.js), visualization of tRNA secondary structure. Also highlights variant base.
  - The components for each tRNA is in the folder [tRNA](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components/tRNA)
- *[TreeSVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/TreeSVG.js), visualization of haplotype tree. Highlights branches based on the haplotypes of variant. The stroke width of highlight changes based on the allele frequency of each haplotype.
- *[RrnaSVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/RrnaSVG.js), visualization of rRNA secondary structure. Includes a zoomed-out picture for the entire structure as well as a zoomed-in picture centered at the variant location, which is highlighted in both pictures.
  - The components for each rRNA is in the folder [rRNA](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components/rRNA)
  - The js files with "-zoom" in their names are the zoomed-in pictures
  - The js files with "-orig" in their names are the zoomed-out pictures that show the entire structure
- [/styles](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components/styles) includes styling for specific components

**Note**: all js files with "SVG" in their names (those marked with *) are dynamic based on the props passed onto them from [App.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/App.js)
