var ReagistUI = /** @class */ (function () {
    function ReagistUI() {
        var _this = this;
        this.getData = function () {
            _this.email = document.getElementById("email").value;
            _this.password = document.getElementById("password").value;
            _this.name = document.getElementById("name").value;
            _this.startRegist();
        };
        this.button = document.getElementById('btn-regist').addEventListener('click', this.getData);
    }
    ReagistUI.prototype.startRegist = function () {
        var controller = new ControllerRegist();
        controller.regist(this.email, this.password, this.name);
        console.log(this.email, this.password, this.name);
        controller.getcurrentUser();
    };
    return ReagistUI;
}());
var ControllerRegist = /** @class */ (function () {
    function ControllerRegist() {
        this.database = firebase.database();
    }
    ControllerRegist.prototype.regist = function (email, password, name) {
        firebase.auth().createUserWithEmailAndPassword(email, password)["catch"](function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    };
    ControllerRegist.prototype.writeDataBase = function (userId) {
        firebase.database().ref('users/' + userId).set({
            name: 'xcvbnmk'
        });
    };
    ControllerRegist.prototype.getcurrentUser = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                var controller = new ControllerRegist();
                controller.writeDataBase(uid);
            }
            else {
                console.log('User is signed out.');
            }
        });
    };
    return ControllerRegist;
}());
window.onload = function () {
    var obj = new ReagistUI();
};
