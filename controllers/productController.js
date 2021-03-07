const express = require('express');
const { isValidObjectId } = require('mongoose');
var router = express.Router();

// Need to add model here
var { Products } = require('../models/products');


// => localhost:3000/allproducts/
router.get('/', (req, res) => {
    Products.find((err, docs) => {
        if(!err) {res.send(docs); }
        else { console.log('Error in Retriving Products :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Products.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Products :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var pro= new Products({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        image: req.body.image,
    });
    pro.save((err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('Error in Products Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    var pro= {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        image: req.body.image,
    };
    Products.findByIdAndUpdate(req.params.id, { $set: pro}, { new: true }, (err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('Error in Products Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    Products.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('Error in Products Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;
