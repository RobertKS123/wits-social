import { useState } from 'react';
//import Modal from './Modal';
//import Backdrop from './Backdrop';


//{/* A fucntion in react is just a component. Also, the name of a fucntion must begin with a capital letter. Props is a javascript object parameter */}
function Podcast(props) {           
    
    //{/* function from react library that states wiich "state" we want to use in each component. This must be used INSIDE a function */}
    //const [modalIsOpen, setModalIsOpen] = useState(false); 
    //{/* useSate alwasy returns an array with 2 elements. 1st elemet is either true or false which yiu specify. 2nd element is a fucntion which assigns a new value to the 1st element */}

    // function deleteHandler() {
    //     console.log('Clicked : ' + props.text);
    //     {/*console.log(props.text);*/}
    //     setModalIsOpen(true);
    // }

    // function closeModalHandler (){
    //     setModalIsOpen(false);
    // }

    function playAudio(audio_link){
        var new_audio_link = "'"+audio_link+"'";
        var audio = new Audio(new_audio_link);
        audio.play();
    }

    
    
    return(
        <div className="card" background-image = {props.podcast_back_image}> {/*this contains the item "Podcast"*/}
        
            <h2> Podcast: {props.podcast_title} </h2> {/* if you just say "props.text", then the title cahnges to that. 
                                      You indicate that you are uisng {} to show that it is a javascript expression */}
            <br />
            <h3> User: {props.podcast_username}</h3>
            <br />
            <h4> Description : {props.podcast_description} </h4> 
            <div className="actions"> 
            <br />
            <button className="btn"  > PLAY </button>
            {/* <button className="btn" onClick={playAudio(props.podcast_audio)} > PLAY </button> */}
            <br className='br_main'/>
            <br className='br_main'/>
            
            <button className="btn" > LIKES  </button>
            {/* <button className="btn" onClick={} > LIKES  </button>  */}
            {/* you can't have deletehandler() bevcause this means that the fnction will operate wehn we get to this code not when we click the button */}
            <span> {props.podcast_likes} </span>
            </div>
            
            {/* { modalIsOpen ? <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler}/> : null} {/* if modal is open is ture, go to modal file, else do nothing*                         
            { modalIsOpen ? <Backdrop onCancel = {closeModalHandler}/> : null} */}

      </div>
    )
}

export default Podcast;