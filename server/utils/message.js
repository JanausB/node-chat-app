function genMsg(text, from){
    return {
        text : text,
        from : from,
        time : new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMilliseconds()
    }
}

module.exports = {genMsg};