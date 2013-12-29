set e+
forever stop index.js
set e-
git pull
npm install
forever start index.js
