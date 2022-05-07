import React, { Component, useContext } from "react";
import './CommentComponent.css';
import CommentByUser from "./CommentByUser";
import { useEffect, useState } from "react";



function CommentComponent(props) {

    function json2array(json_1_){
        var result = [];
        var keys = Object.keys(json_1_);
        keys.forEach(function(key){
            result.push(json_1_[key]);
        });
        return result;
      }
  
      
      let json_1;
  
      const [users, setUsers] = useState([]);
  
      useEffect(() => {
          let url = 'https://startechies.000webhostapp.com/server/podcast_scripts/fetch_podcast_comments.php'+'?podcast_id='+props.podcast_id_comment;
          //console.log("URL LINK = ", url)
          fetch(url)
          .then(res => res.json())
          .then((out) => {
            json_1 = JSON.stringify(out);
            const practice_array = [];
            const  jsonParsedArray = JSON.parse(json_1);
            
            for ( var key in jsonParsedArray) {
              if(jsonParsedArray[key]instanceof Object){
                practice_array.push(jsonParsedArray[key]);
              }
            }
  
            if(practice_array.length != 0){
              setUsers(practice_array);
            }
          })
          .catch(err => { throw err });
      }, []);
      
      const total_practice_array = [];
      for (var i = 0; i < users.length; i++){
          total_practice_array.push(json2array(users[i]));
      }
  
      const array_json = total_practice_array;
  
      function createComment(array){

        if (array.length == 0){
          return;
        }
        else{
          var final_array = [];
  
          for (var i = 0; i < array.length; i++){
            const new_array = array[i];
            final_array.push(
            <CommentByUser 
              user_posted = {new_array[9]}
              comment = {new_array[1]}
            />
            )
          }
          return(final_array);
        }
      }

    return (
        <div className="commentScrollBox w3-border">
            {createComment(array_json)}
        </div>
    )
    
  }

export default CommentComponent