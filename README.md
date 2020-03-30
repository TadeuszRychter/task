Deployed at [http://blog.fullystacked.it/task/](http://blog.fullystacked.it/task/)

Things I did:
- spent ~1.5 MD of effort
- obfuscated sample data, so the repo despite being public is not findable via search engines
- treated this task as a prototyping task - nothing is perfect, usually just good enough, plenty of code is just a first attempt at solving something; the aim was to deliver as much value as possible from a user's perspective and iterate upon it, avoid delving into routine pieces
- let users easily choose different data combinations for analysis; display any number of states at the same time, let to pick only subsets of data and analyse e.g. relative sizes of underage and senior populations without any noise of other age groups 
- considered data as already loaded into the app, CSV too (converted upfront), to me that's "proper engineering skills"
- made some parts of the app generic, especially the data handling; usually I wouldn't do it in a protytype, but it's also supposed to show my skills, so it can be seen that I'm able to shuffle data using mostly functional ES6+
- made it trivial to plug more data sources as long as it's of similar, flat structure 
- used TypeScript (although just a little bit) for my own convenience (mostly "IntelliSense" in WebStorm)
- used bar charts as they are best suited for comparing data (Stephen Few explains it in his seminal Information Dashboard Design: Displaying Data for At-a-Glance Monitoring)
- presented widgets head-to-head so direct comparisons are easy, especially with a button to fit all of the selected into one line; the scales on charts are different, so it's suited for comparing proportions between values across states, not the absolute numbers
- responsive design using custom CSS with modern displays i.e. flex and grid
- fuzzy search in search field

Known issues:
- generally I had issues with the plots; initially I used recharts but they were not really responsive (i.e. setting fixed pixels sizes upon other factors, not really taking into account changes to the containers); after wasting some time I switched to chartist
- chartist has two issues which I didn't have time to solve, especially as it's a 3rd party component:  
  1. hiding parts of labels in low plot sizes
  2. sometimes not displaying bars if a value is 0; it gets back to normal after changing number of displayed widgets up and down  

Things I'd do in next iterations:
- get feedback, discuss with users
- allow to paste lists of states into the search field, delimited by various characters, not necessarily consistently
- allow to search/choose multiple items at once via a regex
- make a generic Chart component (as can be seen in the Widget.tsx its backbone is pretty much ready), make it configurable on the level of general options but also possible to override on the widget level
- let users override all options on the widget level, including data selection
- add more controls next to data selection - filtering by values e.g. "greater than" etc., sorting widgets
- handle nested data structures - data selection should be more like [https://jakezatecky.github.io/react-checkbox-tree/](https://jakezatecky.github.io/react-checkbox-tree/) but I didn't want to only glue together 3rd party components
- add deep linking so the users can easily share exactly the same snapshots easily, that's great for collaboration
- add a drag & drop for changing order (i.e. sorting) of widgets
- add options to set the same scale for charts, so the absolute values are comparable
- unify naming, now it's a bit messy, especially that I didn't want to overuse words that are also names of the data sets (Google findability)
- obviously some things could be simplified or pulled out as separate components, especially now that e.g. shape of data for charts is known

![alt text](http://blog.fullystacked.it/task/mobile-1.jpg "Screenshot from smartphone 1")
![alt text](http://blog.fullystacked.it/task/mobile-2.jpg "Screenshot from smartphone 2")
// an app made the JPGs, I know that PNGs are better suited for this kind of imaging

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
