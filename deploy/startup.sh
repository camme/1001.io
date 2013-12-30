set e+
forever stop frontend/index.js
set e-
git pull
npm install
grunt build:production
forever start frontend/index.js
