
**This project is simple work of front-end development by native JS.**

CSS styles was taking by JS course from Udemy.)

**How do you get set up?**

1. Configuration
  Before packajing project you need to configure webpack, but now default values of **webpack.config.js** could help you to package project without configure.
  But if you want to configure, let's use this guide https://webpack.js.org/guides/getting-started/#using-a-configuration

2. for use and run this app, user could packajing project by webpack. For it work, you need to use this command:
npm init -y (for init npm project in your local machine)
npm install webpack webpack-cli --save-dev (for packaging project)

3.Dependencies
  in this project dependencies exist just between modules 

4.Database configuration
  Some data for using this project is information about menu card.
  In project you may to use three ways of data getting:
  1) by static realization of data from script of cards.js
  2) use the java project which store menu data in H2 DB https://github.com/Arsedon/menu-data-storage
  3) use and configure JSON server(but you can configure it yourself)
  
