class LoginUI {
    email: string;
    password: string;

    button:void;
    constructor(){
        this.button = ( < HTMLButtonElement > document.getElementById('btn-login')).addEventListener('click', this.getData);
    }

    private getData(): void {
        this.email = ( < HTMLInputElement > document.getElementById("input-email")).value;
        this.password = ( < HTMLInputElement > document.getElementById("input-password")).value;
        const controller: ControllerLogin = new ControllerLogin();
        controller.login(this.email, this.password);
    }

}

class ControllerLogin {
    
    public login(email: string, password: string): void {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(current) {
            let userId = current.user.uid;
            localStorage.setItem('user', userId);
            window.location.href = "C:/Users/User/Desktop/CostCount/profile.html";
            
        })
        .catch(function (error) {
            var errorMessage: string = error.message;
            window.alert(errorMessage);
        });
    }
}

window.onload = () => {
    const obj:LoginUI = new LoginUI();
}