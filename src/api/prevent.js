
module.exports = function(app){
    app.get('/api/assetRegis', (req, res) => {
        res.json(require("./assetRegis.json"))
      });
    app.get('/api/retirement', (req, res) => {
        res.json(require("./retirement.json"))
      });
}