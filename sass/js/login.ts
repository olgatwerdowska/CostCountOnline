class LoginUI {
    email: string;
    password: string;

    button:void;
    constructor(){
        this.button = ( < HTMLButtonElement > document.getElementById('btn-login')).addEventListener('click', this.getData);
    }

    getData() {
        this.email = ( < HTMLInputElement > document.getElementById("input-email")).value;
        this.password = ( < HTMLInputElement > document.getElementById("input-password")).value;
        const controller: ControllerLogin = new ControllerLogin();
        controller.login(this.email, this.password);
    }

}

class ControllerLogin {
    
    login(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorMessage: string = error.message;
            window.alert(errorMessage);
        });

        const user: any = firebase.auth().currentUser;
        const form: HTMLElement = document.getElementById('f');
        form.addEventListener("submit", e => {
            e.preventDefault();
            if (user != null) {
                user.providerData.forEach(function (profile) {

                });
            }
        })
    }
}


window.onload = () => {
    // const button: void = ( < HTMLButtonElement > document.getElementById('btn-login')).addEventListener('click', LoginUI.prototype.getData);
    const obj:LoginUI = new LoginUI();
}