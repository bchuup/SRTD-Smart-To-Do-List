'use strict';

// require('dotenv').config({path: '../.env'});
// npm install node-movie --save

const fetch = require("fetch").fetchUrl;
const movie = require('node-movie');
var books = require('google-books-search');


const options = {
headers: {
  'user-key': process.env.userkey
  }
}



const searchRestauraunt = function(todo) {
  return new Promise((resolve, reject) => {
    fetch(`https://developers.zomato.com/api/v2.1/search?q=${todo}`, options, function(err, response, body) {
      if(err) { reject("error")}
      if (!JSON.parse(body.toString()).restaurants[0]){
        resolve("not found")
      } else if (JSON.parse(body.toString()).restaurants[0].restaurant.name) {
        resolve({restauraunt: JSON.parse(body.toString()).restaurants[0].restaurant.name});
      } else {
        resolve("not found")
      }
    });
  });
}

const searchMovie = function(todo) {
  return new Promise((resolve, reject) => {
    movie(todo, (err, data) => {
      if (err) { reject("error")}
      if (data.Title) {
        resolve({movie: data.Title});
      } else {
        resolve("not found")
      }
    });
  });
}

const searchBooks = function(todo) {
  return new Promise((resolve, reject) => {
    books.search(todo, (err, results) => {
      if (err) { reject("error")}
      if (results[0].title) {
        resolve({book: results[0].title})
      } else {
        resolve({book: null})
      }
    });
  });
}

module.exports = {
  searchRestauraunt: searchRestauraunt,
  searchMovie: searchMovie,
  searchBooks: searchBooks
}




