import React from 'react';
import { useEffect, useState } from "react";

function GetFunction(input_url) { //The same function that is used to fetch the podcasts
    
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
          let url = "'"+input_url+"'";
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
       
      function return_final_ans(){
          return (array_json);
      }

      return(
        return_final_ans
      );
}

export default GetFunction