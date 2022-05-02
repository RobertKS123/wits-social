import Podcast from './newhome_comp/Podcast';
import { useEffect, useState } from "react";
//import $ from "jquery";
//import "./App.css";
//import axios from "axios";
//import { Link } from "react-router-dom";

function Home() {
    
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     getUsers();
    // }, []);
    // function getUsers() {
    //     axios.get('https://startechies.000webhostapp.com/server/podcast_scripts/fetch_podcast_list.php/').then(function(response) {
    //         console.log(response.data);
    //         setUsers(response.data);
    //     });
    // }

    function json2array(json_1){
      var result = [];
      var keys = Object.keys(json_1);
      keys.forEach(function(key){
          result.push(json_1[key]);
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

        //setUsers(json_1.split(','));

        const  jsonParsedArray = JSON.parse(json_1);
        for ( var key in jsonParsedArray) {
          // if (jsonParsedArray.hasOwnProperty(key)) {
          //   setUsers("% "+key + " = " + jsonParsedArray[key]);
          // }
          if(jsonParsedArray[key]instanceof Object){
            setUsers(jsonParsedArray[key]);
          }
        }

        //console.log('Checkout this JSON! ', json_1);

        })
        .catch(err => { throw err });
    }, []);
    
    const array_json = json2array(users);
    

    function createPodcastSquares(num){
      
      var real_num = num / 13;
      var iter_num = 0;
      for (var i = 0; i < real_num; i++){
        
        iter_num = iter_num + 1;
      {/*  for any array_json[iter_num] - remember to minus 1 */}

        return(
          <Podcast 
            podcast_title = {array_json[iter_num]}
            podcast_description =  {array_json[iter_num + 1]}
            podcast_audio = {array_json[iter_num + 2]}
            podcast_likes = {array_json[iter_num + 3]}
            podcast_username = {array_json[iter_num + 9]}
            
          />
          
        );

        
      }
    }
    
  return (
      
    <div> 
        {/* <div> 
            {useEffect()}
        </div> */}
      

      <h1> YOUR 'FOR-YOU' PODCAST PAGE </h1>

    
        
      <div className="main_card" >
        
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


        {createPodcastSquares(array_json.length)}
      
      </div>
    </div>
    
  );
}

export default Home; 