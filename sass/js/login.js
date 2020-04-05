var LoginUI = /** @class */ (function () {
    function LoginUI() {
        this.button = document.getElementById('btn-login').addEventListener('click', this.getData);
    }
    LoginUI.prototype.getData = function () {
        this.email = document.getElementById("input-email").value;
        this.password = document.getElementById("input-password").value;
        var controller = new ControllerLogin();
        controller.login(this.email, this.password);
    };
    return LoginUI;
}());
var ControllerLogin = /** @class */ (function () {
    function ControllerLogin() {
    }
    ControllerLogin.prototype.login = function (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)["catch"](function (error) {
            var errorMessage = error.message;
            window.alert(errorMessage);
        });
        var user = firebase.auth().currentUser;
        var form = document.getElementById('f');
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (user != null) {
                user.providerData.forEach(function (profile) {
                    localStorage.setItem('user', user.uid);
                });
            }
        });
    };
    return ControllerLogin;
}());
window.onload = function () {
    // const button: void = ( < HTMLButtonElement > document.getElementById('btn-login')).addEventListener('click', LoginUI.prototype.getData);
    var obj = new LoginUI();
};
