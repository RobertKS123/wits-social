import React from "react";
import reactRouterDom from "react-router-dom";
import { useRef, useState, useEffect, useContext } from 'react';

const Password = () =>{

    return (

        <>
        <form action="/">
            <input type="password" id="password1" name="password1">Enter password</input>
            <input type="password" id="password2" name="password2">Re-enter password</input>
            <input type="submit" value="submit"></input>
        </form>
      
        </>

    )
}
export default Password