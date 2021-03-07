const mongoose = require('mongoose');

var Products = mongoose.model('Products', {
    name: { type: String },
    type: { type: String },
    price: { type: Number },
    image: { type: String }
});

module.exports = {Products};
