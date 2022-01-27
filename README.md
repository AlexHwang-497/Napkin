# Napkin - The back of the Napkin Portfolio/Asset Management Tool

<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). -->

# Overview

Napkin is a social media MERN application that allows users to create, manage and interact with various user investment portfolios. The application allows users to analyze, compare, comment and gain insights into a portfolio’s historical risk/return profile by examining various sectors, holdings, and statistical performance and risk metrics against market benchmarks.

Technologies used include MERN (MongoDB, Express.js, React, Node.js) stack, Redux, Webpack, Materail UI, CSS3, HTML5, Recharts and the third-party data from Financial Modeling Prep API. 

the project is currently hosted at https://portfoliobuildertool.herokuapp.com/

# Architecture and Technologies
* JavaScript, the project's front and backend programing language.
* React, a JavaScript library used to assist with efficient management of rapidly changing data and maintaining a single-page web application structure.
* Redux, a JavaScript library used in coordination with React to create a centralized store for organizing and accessing data.
* Node.js, a runtime environment used to execute JavaScript for server-side scripting.
* Express.js, a web application framework, used with Node.js, to provide server-side structure for querying and retrieval of API data.
* MongoDB, a document-oriented (NoSQL) database system used for storage and management of information.
* Webpack, a JavaScript bundler to assist with development and production builds.
* Materaial UI, CSS3 and HTML5, used to manage the presentation and styling of the project.
* Apex Charts, a modern JavaScript charting library that helps developers to create beautiful and interactive visualizations in a React based project.
* Financial Modeling Prep, a third-party finance API used to query and receive real-time stock prices.
* __Heroku__, a cloud hosting platform.

# Functionality
* Comprehensive registration/authentication behavior for management of user sessions, and keeping track of user information (e.g. user portfolios, user comments, trades association and etc).
* Error handling for input fields to prevent invalid entries along with appropriate error messages (e.g. prevents users from signing in with incorrect credentials, stops a user from registering an account under a previously used email address, prevent purchase of a stocks that cost more than a user's available cash, etc.).
* Separate Portfolio and Transaction pages. Portfolio page displays an aggregated list of all stocks a user has purchased, and lists in alphabetical order based on stock ticker. If a stock was purchased in two separate transactions then the transactions are grouped together. Transaction page displays a list of each individual trade in reverse-chronological order.
* Color indicators for the pricing information on the Portfolio page to indicate if a stock's value has increased (green) or decreased (red) in price between the most recent opening and closing values.
* An interactive stock chart, with hover effects, to allow users to review a selected stock's history before completing a purchase.
* A polished, intuitive, responsive user interface/experience.
# Known Issues
* The application might not load properly occassionally due to the data constraints of the Financail Modeling Prep API
# Future Updates
* ability to stress test a user portfolio with various hypothetical economic scenarios
* a portfolio ranking of all portfolios created in the app to see which portfolio ranks the best due to a risk/resturn reward profile.

# How to install
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
