import { useEffect, useState, useContext } from "react";
//import $ from "jquery";
//import "./App.css";
//import axios from "axios";
//import { Link } from "react-router-dom";
import '../home/Home.css';
import Podcast from "../Podcast/Podcast";
import { AuthContext } from '../../api/AuthProvider';

function Trending() {
    const [state]  = useContext(AuthContext);

    function json2array(json_1_){  //This function is used to convert from json objects into an array
      var result = [];
      var keys = Object.keys(json_1_);
      keys.forEach(function(key){
          result.push(json_1_[key]);
      });
      return result;
    }

    function setInnerHeightOnMobile(){
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    let json_1;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let url = 'https://startechies.000webhostapp.com/server/podcast_scripts/fetch_podcast_list.php/'; //Link to the database that displays all podcasts and their information
        fetch(url)
        .then(res => res.json())
        .then((out) => { //This is a json object
          json_1 = JSON.stringify(out); //This is a json string
          const practice_array = [];
          const  jsonParsedArray = JSON.parse(json_1); //This is a normal string
          
          for ( var key in jsonParsedArray) { //for each json object in the string, push it into an array
            if(jsonParsedArray[key]instanceof Object){
              practice_array.push(jsonParsedArray[key]);
            }
          }

          if(practice_array.length != 0){
            setUsers(practice_array);
          }
        })
        .catch(err => { throw err });
    }, []); //This makes sure that useeffect only runs once
    
    const total_practice_array = [];
      for (var i = 0; i < users.length; i++){
        total_practice_array.push(json2array(users[i])); //This pushes every item into a new array
    }

    const array_json = total_practice_array;

    function createPodcastSquares_2(array){ //This is the main function that creates a podcast
      if (array.length === 0){
        return;
      }
      else{
        var final_array = [];

        for (var i = 0; i < array.length; i++){
          const new_array = array[i];
          final_array.push(
          <div className="inner-podcast-item">
          <Podcast //This creates a podcast component for each podcast in the database and sends in all relevant information
            podcast_id = {new_array[0]}
            podcast_title = {new_array[1]}
            podcast_description =  {new_array[2]}
            podcast_audio = {new_array[3]}
            podcast_likes = {new_array[4]}
            podcast_user_id = {new_array[5]}
            podcast_username = {new_array[10]}
            podcast_profile_image = {new_array[11]}
            podcast_back_image = {new_array[12]}
          /></div>
          )
        }

        return(final_array);
      }
    }


  return ( 
    //<div className="main_card">
        // <div className="container-fluid bg-dark">
        //   {createPodcastSquares_2(array_json)}
        //   <br/>
        // </div>

        <>
          <div className="outer-box">
            <script>{setInnerHeightOnMobile()}</script>
            {/* <div className="inner-podcast-item"></div> */}
            {createPodcastSquares_2(array_json)}
          </div>
        </>
    //</div>
    //{createPodcastSquares_2(array_json)}
  );
}

export default Trending 