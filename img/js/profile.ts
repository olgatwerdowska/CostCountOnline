class ProfileUI {
    addPositionButton:void;
    singOutButton:void;
    titlePosition:string;
    desctiptioPosition:string;
    typePosition:string;
    inputDate:string;
    date:Date;

    constructor(){
        this.addPositionButton = ( < HTMLButtonElement > document.getElementById('add-position')).addEventListener('click', this.getDada);
        this.singOutButton = ( < HTMLButtonElement > document.getElementById('singOut')).addEventListener('click', this.singOut);
    }

    getDada = () => {
        this.titlePosition = ( < HTMLInputElement > document.getElementById("title-position")).value;
        this.desctiptioPosition = ( < HTMLInputElement > document.getElementById("description")).value;
        this.typePosition =  ( < HTMLInputElement > document.getElementById("type-position")).value;
        this.inputDate = ( < HTMLInputElement > document.getElementById("date")).value;
        this.date = new Date(this.inputDate);
        this.date.toDateString();

        console.log(this.titlePosition, this.typePosition, this.date, this.desctiptioPosition);

        const controller:List = new List();
        controller.addItemToList(this.titlePosition, this.desctiptioPosition, this.typePosition, this.inputDate);

        this.clearInputs();
    }

    singOut(){
        const profile:Profile = new Profile();
        profile.singOut();
    }

    clearInputs(){
        this.titlePosition = ( < HTMLInputElement > document.getElementById("title-position")).value = ' ';
        this.desctiptioPosition = ( < HTMLInputElement > document.getElementById("description")).value = ' ';
        this.typePosition =  ( < HTMLInputElement > document.getElementById("type-position")).value = 'Choose..';
    }

}

class List {
    addItemToList(
        titlePosition:string,
        desctiptioPosition:string,
        typePosition:string,
        date:string){
        const userId:string = localStorage.getItem('user');
        firebase.database().ref('users/' + userId + '/listPosition').push({
            title: titlePosition,
            description: desctiptioPosition,
            type: typePosition,
            date: date
        });
    }
}


class Profile{
    singOut(){
        firebase.auth().signOut().then(function() {
            window.location.href = "C:/Users/User/Desktop/CostCount/index.html";
          }).catch(function(error) {
            console.log(error)
        });
    }
}
window.onload = () => {
    const Ui:ProfileUI = new ProfileUI();
}