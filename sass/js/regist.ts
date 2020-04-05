
class ReagistUI {
    email: string;
    password: string;
    name:string;
    button:void;
    constructor(){
        this.button = ( < HTMLButtonElement > document.getElementById('btn-regist')).addEventListener('click', this.getData);
    }

    startRegist(): void{
        const controller:ControllerRegist = new ControllerRegist();
        controller.regist(this.email, this.password, this.name);
        console.log(this.email, this.password, this.name);
        controller.getcurrentUser();
    }


    getData = () => {
        this.email = ( < HTMLInputElement > document.getElementById("email")).value;
        this.password = ( < HTMLInputElement > document.getElementById("password")).value;
        this.name = ( < HTMLInputElement > document.getElementById("name")).value;
        this.startRegist();
    }
    

}

class ControllerRegist {
    database:any = firebase.database();
    regist(email:string, password:string, name:string) :void{
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert (errorMessage);
        });
    }

    writeDataBase(userId:string){
        firebase.database().ref('users/' + userId).set({
            name : 'xcvbnmk'
        });
    }

    getcurrentUser(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              var uid = user.uid;
              var controller:ControllerRegist = new ControllerRegist();
              controller.writeDataBase(uid);
            } else {
              console.log('User is signed out.')
            }
        });
    }


}


window.onload = () => {
    const obj:ReagistUI = new ReagistUI();
}