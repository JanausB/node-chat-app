var moment = require("moment");

function genMsg(text, from){
    return {
        text : text,
        from : from,
        time : moment.valueOf()
    }
}

function genPosMsg(lat, lng, from){
    return {
        from: from,
        text: `https://www.google.com/maps?=${lat},${lng}`,
        time : moment.valueOf()
    }
}
module.exports = {genMsg, genPosMsg};