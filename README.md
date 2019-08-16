This repository includes various dynamic visualizations that were implemented in the mito browser. As the mito browser was implemented in a React environment, this project uses React as well. The folder [LinearGeneSVG_nonreact](https://github.com/lilyzhouZYJ/mito_visualization/tree/master/LinearGeneSVG_nonreact) is the only folder that is not implemented in React.

## Prerequisites

- [npm](https://www.npmjs.com/), which is required for create-react-app
- [React](https://reactjs.org/) environment using either [CDN](https://reactjs.org/docs/cdn-links.html) or [Create React App](https://github.com/facebook/create-react-app), which can be installed with the command: `npm install create-react-app`
- The app also uses [React Router](https://reacttraining.com/react-router/), which can be installed with `npm install react-router-dom`

## Getting Started

If using Create React App, a React app can be created with `npx create-react-app mito_browser`.

In the project directory, start the app in development mode using `npm start`.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Contents

### [/LinearGeneSVG_nonreact](https://github.com/lilyzhouZYJ/mito_visualization/tree/master/LinearGeneSVG_nonreact)

- This folder includes the visualization of mitochondrial DNA in a linear form, and it is not implemented in React.
- [LinearGene.svg](https://github.com/lilyzhouZYJ/mito_visualization/blob/master/LinearGeneSVG_nonreact/LinearGene.svg), the svg file for the visualization
- [LinearGene_nonreact](https://github.com/lilyzhouZYJ/mito_visualization/blob/master/LinearGeneSVG_nonreact/LinearGene_nonreact.html), the html file with JavaScript that creates the visualization in svg

### [/public](https://github.com/lilyzhouZYJ/mito_browser/tree/master/public)

- [index.html](https://github.com/lilyzhouZYJ/mito_browser/blob/master/public/index.html) is the html that is rendered onto the webpage and contains the root div (`<div id="root">`)

### [/src](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src)

- [index.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/index.js), which renders the `App` component to the root div in ../public/index.html
- [App.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/App.js), which renders the various components needed on the webpage
- [components](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components), which includes the components. See below

### [/src/components](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components)
- [Navbar.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/Navbar.js), navigation bar that controls the rendering of the following components
- [Home.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/Home.js), home page and also landing page for the app
- [GeneTool.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/GeneTool.js), a visualization tool for mitochondrial DNA. Allows for 3 types of user input:
  - Mitochondrial gene name
  - Genetic variant
  - Start and end coordinates of a deletion
  Respectively, the tool will highlight either the gene, the variant location, or the deletion region.
  The Google Sign-In feature is also implemented on this page, but since Google only authorize actual domains or localhost (does not allow IPs), this feature has only been tested locally. To still use the tool on a server, comment out all the code related to Google Sign-In.
- [TrnaTool.js](https://github.com/lilyzhouZYJ/mito_visualization/blob/master/src/components/TrnaTool.js), a visualization tool that allows users to input a variant, and it will highlight the variant in ithe respective tRNA. [Currently Not Working]
- [LinearSVG.js](https://github.com/lilyzhouZYJ/mito_visualization/blob/master/src/components/LinearSVG.js), visualization of mitochondrial DNA in a linear form. Does not include highlighting functions.
- *[GeneSVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/GeneSVG.js), visualization for mitochondrial DNA in circular form. Dynamic based on props passed from [App.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/App.js) but not interactive.
- *[TrnaSVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/TrnaSVG.js), visualization of tRNA secondary structure. Also highlights variant base.
  - The components for each tRNA is in the folder [tRNA](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components/tRNA)
- *[TreeSVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/TreeSVG.js), visualization of haplotype tree. Highlights branches based on the haplotypes of variant. The stroke width of highlight changes based on the allele frequency of each haplotype.
- *[RrnaSVG.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/components/RrnaSVG.js), visualization of rRNA secondary structure. Includes a zoomed-out picture for the entire structure as well as a zoomed-in picture centered at the variant location, which is highlighted in both pictures.
  - The components for each rRNA is in the folder [rRNA](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components/rRNA)
  - The js files with "-zoom" in their names are the zoomed-in pictures
  - The js files with "-orig" in their names are the zoomed-out pictures that show the entire structure
- [Signin.js](https://github.com/lilyzhouZYJ/mito_visualization/blob/master/src/components/Signin.js), component for Google Sign-In
- [/styles](https://github.com/lilyzhouZYJ/mito_browser/tree/master/src/components/styles) includes styling for specific components

**Note**: all js files marked with * are dynamic based on the props passed onto them from [App.js](https://github.com/lilyzhouZYJ/mito_browser/blob/master/src/App.js). The props can be edited in App.js.
