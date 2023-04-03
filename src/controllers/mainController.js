const express = require("express");
const fetch = require("node-fetch");

//Seteamos la variable path para contener el path a la pagina
const path = require('path');

const controller = {

    home: (req, res) => {

        let page = 1;
        const url = "https://api.disneyapi.dev/characters?page=" + page;    

        fetch(url)
        .then(response => response.json())     //--> La respuesta que sea procesada en un formato JSON
        .then(disneyCharacters => {            //--> En este then yo ya puedo trabajar con la info de la API
            
                return res.render(path.join(__dirname, '../views/home'), {
                    'disneyCharacters': disneyCharacters.data,
                    'page': page });
            });

        //Llamamos a la API para levantar los registros y enviarlos a 
        //res.sendFile(path.resolve(__dirname, '../views/home.html' ));;
    },

    page: (req, res) => {

    let page = req.params.id;

    let url = "";
    
    if (page <= 0) { 
       
        page = 1;     //si la pagina es menor a 0, seteamos pagina 1 de inicio
        url = "https://api.disneyapi.dev/characters?page=1";   

    } else {
        
        url = "https://api.disneyapi.dev/characters?page=" + page;

    }
    fetch(url)
    .then(response => response.json())     //--> La respuesta que sea procesada en un formato JSON
    .then(disneyCharacters => {            //--> En este then yo ya puedo trabajar con la info de la API
        
            return res.render(path.join(__dirname, '../views/home'), {
                'disneyCharacters': disneyCharacters.data,
                'page': page });
        });
    
    }
}

// Finalizamos devolviendo el objeto
module.exports = controller; 