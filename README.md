# routine
or `Stuff you do, and redo, and redo, and now it's a routine.`.

App available under https://routine-cvs.herokuapp.com/
`PERN` stack: Postgres, Express, React, Nodejs.

## FrontEnd peculiarities
Created with ReactApp. Javascript. 

### defineVariableHeight
Because my Samsung has a weird behavior with the height parameter, I have to calculate it when mounting the app + by every resize (via event listener). See function `defineVariableHeight`. The max height is saved in a "css variable2, in this case `--vh`.