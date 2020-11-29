const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send('Get all contacts');
});


router.post('/', (req, res) => {
    res.send('aadddd contacts');
});


router.put('/:id', (req, res) => {
    res.send('update contacts');
});


router.delete('/:id', (req, res) => {
    res.send('delete contacts');
});


module.exports = router;