
class LoginUI{
    email:string;
    password:string;

    getData(){
        this.email =  (<HTMLInputElement>document.getElementById("input-email")).value;
        this.password = (<HTMLInputElement>document.getElementById("input-password")).value;
        console.log(this.email, this.password);
        this.formValidation();
    }

    formValidation (){
        if(this.password.length < 8){
            console.log('dfgh')
        }
    }

}

window.onload = () =>{
    const button:void =(<HTMLButtonElement>document.getElementById('btn-login')).addEventListener('click', LoginUI.prototype.getData);   
}


