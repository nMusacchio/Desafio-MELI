const formatNumber = (number) =>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const getParams = (url) =>{
    return new URLSearchParams(url).get('search')
}


module.exports = {
    formatNumber,
    getParams
}