const path = require('path');
const mainGet = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../view', 'index.html'));
}


const projectsPage = 0;

module.exports = {
  mainGet
}
