import { useEffect, useState, useContext } from "react";
//import $ from "jquery";
//import "./App.css";
//import axios from "axios";
//import { Link } from "react-router-dom";
//import './Home.css';
import TopForYou from "./TopForYou/TopForYou";
import Podcast from "../Podcast/Podcast";
import GetFunction from "./GetFunction";
import { AuthContext } from '../../api/AuthProvider';

function Home() {
    const [state]  = useContext(AuthContext);


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
        let url = 'https://startechies.000webhostapp.com/server/podcast_scripts/fetch_podcast_list.php/';
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

    function createPodcastSquares_2(array){
      if (array.length == 0){
        return;
      }
      else{
        var final_array = [];

        for (var i = 0; i < array.length; i++){
          const new_array = array[i];
          final_array.push(
          <Podcast 
            podcast_id = {new_array[0]}
            podcast_title = {new_array[1]}
            podcast_description =  {new_array[2]}
            podcast_audio = {new_array[3]}
            podcast_likes = {new_array[4]}
            podcast_user_id = {new_array[5]}
            podcast_username = {new_array[10]}
            podcast_profile_image = {new_array[11]}
            podcast_back_image = {new_array[12]}
          />
          )
        }
        return(final_array);
      }
    }


  return ( 
    <div className="main_card">
        <div className="container-fluid bg-dark">
          {createPodcastSquares_2(array_json)}
        </div>
    </div>
    //{createPodcastSquares_2(array_json)}
  );
}

export default Home; 

{/* 
        array_json[0] = Podcast_ID
        array_json[1] = Podcast_Title
        array_json[2] = Podcast_Description
        array_json[3] = Podcast_AudioLink
        array_json[4] = Podcast_Likes
        array_json[5] = EndUser_ID
        array_json[6] = EndUser_FName
        array_json[7] = EndUser_LName
        array_json[8] = EndUser_Email
        array_json[9] = EndUser_Password
        array_json[10] = EndUser_Username
        array_json[11] = EndUser_ProfilePicLink
        array_json[12] = EndUser_BannerLink 
        */}

        {/* function createPodcastSquares(array, num){
            
          if (num == 0){
            return;
          }
          var real_num = num / 13;
    
          for (var i = 0; i < real_num; i++){ 
                  
            //iter_num = iter_num + 1;
                    
            for any array_json[iter_num] - remember to minus 1
          
            return(
              <Podcast 
                podcast_title = {array[1]}
                podcast_description =  {array[2]}
                podcast_audio = {array[3]}
                podcast_likes = {array[4]}
                podcast_username = {array[10]}
              />
            );
          }
        }
        */ }

        {/*else{
          for (var i = 0; i < array.length; i++){
            const new_array = array[i];
            console.log("VALUE OF i IS = ", i);
            return(
              <Podcast 
                podcast_title = {new_array[1]}
                podcast_description =  {new_array[2]}
                podcast_audio = {new_array[3]}
                podcast_likes = {new_array[4]}
                podcast_username = {new_array[10]}
              />
            );
            
          }
        }
      */}