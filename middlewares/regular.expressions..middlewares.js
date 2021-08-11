const emailSyntaxError = (req,res,next) => {
    const {username, nameSurname, email, telephone, address, password} = req.body;
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(emailRegex.test(email)){
        next();
    }else{
        res.status(403).send('Email con formato incorrecto');
    }
};
const weakPassword = (req,res,next) => {
    const {username, nameSurname, email, telephone, address, password} = req.body;
    const passwordRegex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    if (passwordRegex.test(password)) {
        next();
    } else {
        res.status(403).send('Contraseña Debil (debe contener al menos: una letra minuscula, una letra mayuscula, un numero, un caracter especial y tener al menos 8 caracteres)');
    }
}

module.exports={
    emailSyntaxError,
    weakPassword
}