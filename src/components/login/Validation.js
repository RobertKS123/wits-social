import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers"

const Validation = (values) => {
    let errors={}

    //Put validation code here 
    //Fields aleardy cannot be left empty (classes have been given the reguired property) 
    // if you want custom cannot be left empty messages message me I'll explain it then
    //Regex must be inclosed in 

    //if(values.username){
    //    errors.username="Sample Error" //this is the error message that will be displayed
    //}
    if(!/\S+@\S+\.\S+/.test(values.email)){ //Regex for email format
        errors.email="email is invalid"
    }
    //if(values.password){
    //    errors.password="Sample Error"
    //} else if(values.password) {
    //    errors.password="Sample Erroe"    
    //}

    return (
        <div>

        </div>
    )
}

export default Validation