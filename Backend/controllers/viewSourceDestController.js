const Trip = require("../model/tripModel");


const viewSourceDest = async (req, res) => {
    try{
        const sourceList = await Trip.distinct('source');
        const destList = await Trip.distinct('destination');
        res.send({"sourceList": sourceList, "destList": destList});
    }catch(err){
        console.log(err);
    }
}

module.exports = viewSourceDest;