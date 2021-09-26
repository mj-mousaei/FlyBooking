const mongoose = require("mongoose");
const config = require("config");
const Amadeus = require('amadeus');


const amadeus = new Amadeus({
  clientId: 'qRuk0mCId8ZdhbswtNpT5uMNFCdqs4w2',
  clientSecret: 'uVkYOvMqSkFKGFjt'
});




module.exports = new class ThemeController {

    async citySearch(req,res){
        console.log(req.query);
        var keywords = req.query.keyword; 
        const response = await amadeus.referenceData.locations 
        .get({ 
          keyword: keywords, 
          subType: "CITY,AIRPORT", 
        }) 
        .catch((x) => console.log(x)); 
      try { 
        await res.json(JSON.parse(response.body)); 
      } catch (err) { 
        await res.json(err); 
      }
    }
};
