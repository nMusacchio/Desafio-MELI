module.exports = {
    formatCurrency: function(value) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    },
    putDecimals: function(value){
        if(value != 0)
            return value;
        
        return;
    },
    formatCondition: function(value){
        return value == "new" ? "Nuevo" : "Usado"
    }
}