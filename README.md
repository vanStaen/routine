# routine
or `Stuff you do, and redo, and redo, and now it's a routine.`.
`PERN` stack: Postgres, Express, React, Nodejs.

## Redirection
App available under https://www.venja.org/ (`dig CNAME www.venja.org`).
Venja means "habit", "to get used to", "to accustom" in icelandic / old norse.

## FrontEnd peculiarities
Template: npx create-react-app w/o options. 

### defineVariableHeight
Because my Samsung has a weird behavior with the height parameter, I have to calculate the fake height when mounting the app and with every resize (via an event listener). See function `defineVariableHeight`. The max height is saved as a "css variable", in this case `--vh`.
