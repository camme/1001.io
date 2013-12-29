set e+
forever stop frontend/index.js
set e-
git pull
npm install
forever start frontend/index.js
