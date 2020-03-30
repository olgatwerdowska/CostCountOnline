var LoginUI = /** @class */ (function () {
    function LoginUI() {
    }
    // button:void = (<HTMLButtonElement>document.getElementById('btn-login')).addEventListener('click', this.getData);
    LoginUI.prototype.getData = function () {
        this.email = document.getElementById("input-email").value;
        this.password = document.getElementById("input-password").value;
        console.log(this.email, this.password);
        this.formValidation();
    };
    LoginUI.prototype.formValidation = function () {
        if (this.password.length < 8) {
            console.log('dfgh');
        }
    };
    return LoginUI;
}());
window.onload = function () {
    var button = document.getElementById('btn-login').addEventListener('click', LoginUI.prototype.getData);
};
