"use strict";

require('dotenv').config();

const fetch = require("fetch").fetchUrl;
const request = require('request');
const amazon = require('amazon-product-api');
const express = require('express');
const router  = express.Router();
const movie = require('node-movie');


module.exports = (knex) => {

  router.post("/", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    knex
      .select("*")
      .from("users")
      .where("username", username)
      .then((results) => {
        // res.json(results);
        // console.log(results);

        if(results[0]){
          res.cookie("username", results[0].id);
          res.redirect("/");

        }else{
          res.redirect("/login")
        }
    });
  });





  return router;
}



//write function that takes username & password and returns data or error

//select user from database with matching username and has matching pswd (knex)

//if returns data => write cookie and take data from database
