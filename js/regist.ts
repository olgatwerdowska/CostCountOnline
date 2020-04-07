class ReagistUI {

    email: string;
    password: string;
    button:void;
    constructor(){
        this.button = ( < HTMLButtonElement > document.getElementById('btn-regist')).addEventListener('click', this.getData);
    }

    private startRegist(): void{
        const controller:ControllerRegist = new ControllerRegist();
        controller.regist(this.email, this.password, );
    }

    private getData = () => {
        this.email = ( < HTMLInputElement > document.getElementById("email")).value;
        this.password = ( < HTMLInputElement > document.getElementById("password")).value;
        this.startRegist();
    }
    
}

class ControllerRegist {

    public regist(email:string, password:string):void {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(current) {
            let userId = current.user.uid;
            let email = current.user.email;
            let controller:ControllerRegist = new ControllerRegist();
            controller.writeDataBase(userId,email);
            localStorage.setItem('user', userId);
            window.location.href = "C:/Users/User/Desktop/CostCount/js/profile.ts";
        })
        .catch(function(error) {
            let errorMessage = error.message;
            console.log(errorMessage);
            alert (errorMessage);
        });
    }

    private writeDataBase(userId:string, email:string,):void{
        firebase.database().ref('users/' + userId).set({
            email: email
        });
    }
}

window.onload = () => {
    const obj:ReagistUI = new ReagistUI();
}