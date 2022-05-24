import validator from 'validator';

class Validation {
    
    validateName(inputName) {
        if (validator.isEmpty(inputName)) return 'Please enter your name.'

        if (!validator.isLength(inputName, {min: 3, max:20})) return 'Please enter more than 3 characters.'
        return null;
    }

    validateEmail(inputEmail) {
        if (validator.isEmpty(inputEmail)) return 'Please enter your Email.'

        if (!validator.isEmail(inputEmail)) return 'Please enter a valid Email.'
        return ''
    }
    validatePassword(inputPassword) {
        if (validator.isEmpty(inputPassword)) return 'Please enter your password.'

        if (!validator.isLength(inputPassword, {min: 8})) return 'Password must be more than 8 characters.'

        return '';
    }
    validateAge(inputAge) {
        if (validator.isEmpty(inputAge)) return 'Please enter your age.'

        if ( inputAge < 18 ) return 'You are not qualified.' 
        return '';
    }

};

const validateFields = new Validation();

export  {validateFields};