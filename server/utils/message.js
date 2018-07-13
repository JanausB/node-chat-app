function genMsg(text, from){
    return {
        text : text,
        from : from,
        time : new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMilliseconds()
    }
}

function genPosMsg(lat, lng, from){
    return {
        from: from,
        url: `https://www.google.com/maps?=${lat},${lng}`,
        time : new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMilliseconds()
    }
}
module.exports = {genMsg, genPosMsg};