import React from "react";

import TopForYou from "./TopForYou";
import Podcast from "../Podcast/Podcast";


function Home() {
    return <>
        <div className="bg-dark">
        <TopForYou/>
        <div className="container-fluid bg-dark">
            <Podcast/>
            <Podcast/>
            <Podcast/>
            <Podcast/>
        </div>
        </div>
    </>
    
  }

  export default Home;