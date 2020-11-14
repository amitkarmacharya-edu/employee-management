class ValidateInput {

    async name(input) {
        if(!input){
            console.log("\x1b[31m", "\n Cannot be empty");
            return false
        }
        
        let re = /^[A-Za-z]+$/;
        if(re.test(input)) {
            return true;
        } else {
            console.log("\x1b[31m","\n can only be alphabets");
            return false;
        }
            
    }

    async num(input) {

        if(!input){
            console.log("\x1b[31m", "\n Cannot be empty");
            return false
        }

        let re = new RegExp("[0-9]+");
        if(re.test(input)) {
            return true;
        }

        console.log("\x1b[31m", "\n Must be Numerical Value ");
        return false;
    }

    async email(input) {

        if(!input){
            console.log("\x1b[31m", "\n Cannot be empty");
            return false
        }

        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        
        if(re.test(String(input).toLowerCase())) {
            return true;
        } else {
            console.log("\x1b[31m", "\n Email Address format is not valid");
            return false;
        }
    }

    async phoneNumber(input) {

        let re = new RegExp('^[0-9]{10}$');

        if(re.test(input)) {
            return true;
        } 

        console.log("\x1b[31m", "\n Number must be at least 10 digit long");
        return false;
        
    }

    async github(input) {

        if(!input){
            console.log("\x1b[31m", "\n Cannot be empty");
            return false
        }

        const re = new RegExp('([a-z0-9](?:-?[a-z0-9]){0,38})');
        if(re.test(input)) {
            return true;
        } else {
            console.log("\x1b[31m", "\n Github username can only container Alphanumeric character and hyphen");
            return false;
        }
    }
    

   
}

const Validate = new ValidateInput();

module.exports = Validate;