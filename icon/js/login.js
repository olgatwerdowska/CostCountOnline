var LoginUI = function () {
        function t() {
            this.button = document.getElementById("btn-login").addEventListener("click", this.getData)
        }
        return t.prototype.getData = function () {
            this.email = document.getElementById("input-email").value, this.password = document.getElementById("input-password").value, (new ControllerLogin).login(this.email, this.password)
        }, t
    }(),
    ControllerLogin = function () {
        function t() {}
        return t.prototype.login = function (t, n) {
            firebase.auth().signInWithEmailAndPassword(t, n).then(function (t) {
                var n = t.user.uid;
                localStorage.setItem("user", n), window.location.href = "C:/Users/User/Desktop/CostCount/profile.html"
            }).catch(function (t) {
                var n = t.message;
                window.alert(n)
            })
        }, t
    }();
window.onload = function () {
    new LoginUI
};