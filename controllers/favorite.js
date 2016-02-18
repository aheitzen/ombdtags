var express = require('express');
var db = require('./../models');
var router = express.Router();

router.post('/', function(req, res) {
  db.favorite.findOrCreate({
    where: {
      imdbID: req.body.imdbID
    },
    defaults: {
      year: req.body.year,
      title: req.body.title
    }
  }).spread(function(favorite, created) {
    console.log(favorite.get());
    res.redirect('/');
  });
});

router.get('/', function(req, res) {
  db.favorite.findAll({
    order: 'title ASC'
  }).then(function(favorites) {
    res.render('favorites/index', {favorites: favorites});
  });
});

router.get('/:id/comments', function(req, res) {
  var favoriteId = req.params.id;
  // db.favorite.findById(favoriteId).then(function(fav) {
  //   fav.getComments().then(function(comments) {
  //     res.send(comments);
  //   });
  // });
  db.favorite.find({
    where: {id: favoriteId},
    include: [db.comment]
  }).then(function(fav) {
    // res.send(fav);
    res.render('favorites/comments', {favorite: fav});
  });
});

router.post('/:id/comments', function(req, res) {
  db.comment.create({
    content: req.body.content,
    author: req.body.author,
    favoriteId: req.params.id
  }).then(function() {
    res.redirect('/favorites/' + req.params.id + '/comments');
  });
});

router.get('/:id/addTag', function(req, res) {
  var favoriteId = req.params.id;
  db.favorite.find({
    where: {id: favoriteId},
    include: [db.tag]
  }).then(function(fav) {
    res.render('tag.ejs', {favorite: fav});
  })
});

router.post('/:id/addTag', function(req, res) {
  db.favorite.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(favorite){
    favorite.addTag({
      where: {
        tag: req.body.tag
      }
    }).then(function() {
      res.redirect('/favorites/' + req.params.id + '/addTag');
    })
  })
});

router.delete('/:imdbID', function(req, res) {
  db.favorite.destroy({
    where: {
      imdbID: req.params.imdbID
    }
  }).then(function() {
    res.send({'msg': 'success'});
  }).catch(function(e) {
    res.send({'msg': 'error', 'error': e});
  })
});





module.exports = router;
