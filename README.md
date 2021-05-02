# routine
or `Stuff you do, and redo, and redo, and now it's a routine.`.

App available under https://routine-cvs.herokuapp.com/
`PERN` stack: Postgres, Express, React, Nodejs.

## FrontEnd peculiarities
Template: npx create-react-app w/o options. 

### defineVariableHeight
Because my Samsung has a weird behavior with the height parameter, I have to calculate the fake height when mounting the app and with every resize (via an event listener). See function `defineVariableHeight`. The max height is saved as a "css variable", in this case `--vh`.
