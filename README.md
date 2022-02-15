# Napkin - The back of the Napkin Portfolio/Asset Management Tool

# Overview

![projectImage](/client/src/images/napkin.gif)

Napkin is a social media MERN application that allows users to create, manage and interact with various user investment portfolios. The application allows users to analyze, compare, comment and gain insights into a portfolio’s historical risk/return profile by examining various sectors, holdings, and statistical performance and risk metrics against market benchmarks.

Technologies used include MERN (MongoDB, Express.js, React, Node.js) stack, Redux, Webpack, Material UI, CSS3, HTML5, Apex Charts and the third-party data from Financial Modeling Prep API. 

the project is currently hosted at https://portfoliobuildertool.herokuapp.com/ 

the project's video demonstration is currently hosted at https://www.youtube.com/watch?v=NdOayZv6vw8

# Architecture and Technologies
* JavaScript, the project's front and backend programing language.
* React, a JavaScript library used to assist with efficient management of rapidly changing data and maintaining a single-page web application structure.
* Redux, a JavaScript library used in coordination with React to create a centralized store for organizing and accessing data.
* Node.js, a runtime environment used to execute JavaScript for server-side scripting.
* Express.js, a web application framework, used with Node.js, to provide server-side structure for querying and retrieval of API data.
* MongoDB, a document-oriented (NoSQL) database system used for storage and management of information.
* Webpack, a JavaScript bundler to assist with development and production builds.
* Material UI, CSS3 and HTML5, used to manage the presentation and styling of the project.
* Apex Charts, a modern JavaScript charting library that helps developers to create beautiful and interactive visualizations in a React based project.
* Financial Modeling Prep, a third-party finance API used to query and receive real-time stock prices.
* Heroku, a cloud hosting platform.

# Functionality
* Comprehensive registration/authentication behavior for management of user sessions, and keeping track of user information (e.g. user portfolios, user comments, trades association and etc).
* Error handling for input fields to prevent invalid entries along with appropriate error messages (e.g. prevents users from signing in with incorrect credentials, stops a user from registering an account under a previously used email address, prevent user from creating a portfolio that is larger then the allotted amount or bifurcation of a securities and etc.).
* Individual Portfolio and Data/Information pages that include the following:
  * Portfolio Overview
    * Provides a general summary of current investment portfolio's securities
    * Summary of portfolio's risk and return metrics(annualized return, standard deviation, Beta and Alpha) from a 1yr to 10yr basis
    * Allows various users viewing the portfolio to comment on portfolio
    * Ability to recalculate data, risk and return calculations by changing to any month end date and view data and calculations in various time frames(trailing 12 months, 3-yr, 5-yr and 10-yr)
  * Holdings
    * identify the bifurcation, construction and sectors that have contributed to your portfolio’s performance and compare it relative important data types to the understanding of one's investment portfolio.
  * Total Return Graphs
    * provides graphs and visual representation of portfolio $10,000 growth various time frames(trailing 12 months, 3-yr, 5-yr and 10-yr)
  * Seasonal Analysis
    * provides user a visual representation of monthly returns of portfolio, benchmark and individual securities of portfolio on monthly basis
    * helps user understand why your portfolio outperformed or underperformed a benchmark over a historical time period and analyze how the structure of your portfolio contributed to your active performance.
    * assists user to see trends in the risk/return profile
  * Statistical Summary
    * provides user insights into created portfolio’s historical risk/return profile by examining  returns, standard deviation, and other statistical measures.
* Ability to search and filter our a specific portfolio based on specific securities
* Interactive stock chart, with hover effects, to allow users to review a selected stock's history before completing a purchase.
* A polished, intuitive, responsive user interface/experience.
* Users have the ability to create, update, delete, like, and comment on portfolios in application.  
# Known Issues
* The application may occasionally not load due to the data constraints of the Financial Modeling Prep API.
*Currently, the app only utilizes monthly data due to the limitations and availability of API requests per minute.
# Future Updates
* Ability to stress test a user portfolio with various hypothetical economic scenarios.
* Ranking of portfolio based on various return and risk metrics.  
* Daily and weekly stock data.
* Inclusion of Dividend Data.  

 




