const mongoose = require('mongoose')

const CartScheema = new mongoose.Schema({
    order_data:{
        type: Array,
        required:true,

    },
})

const CartModel = mongoose.model('orders' , CartScheema)

module.exports = CartModel;

