class AddPositionSection {
    userId: string = localStorage.getItem('user');
    addPositionButton: void;
    titlePosition: string;
    desctiptioPosition: string;
    typePosition: string;
    inputDate: string;
    date: Date;
    coust: string;

    constructor() {
        this.addPositionButton = ( < HTMLButtonElement > document.getElementById('add-position')).addEventListener('click', this.onAddPositionPress);
        const inicializeType: TypeCard = new TypeCard;
        inicializeType.initializationTypes('type-position');
        inicializeType.initializationTypes('typeFilterParameter');
    }

    private onAddPositionPress = () => {
        this.getDataFromInputs();
        const controller: List = new List();
        controller.addItemToList(this.titlePosition, this.desctiptioPosition, this.typePosition, this.coust, this.inputDate);
        this.clearInputs();
        controller.createCards();
    }

    private getDataFromInputs() {
        this.titlePosition = ( < HTMLInputElement > document.getElementById("title-position")).value;
        this.desctiptioPosition = ( < HTMLInputElement > document.getElementById("description")).value;
        this.typePosition = ( < HTMLInputElement > document.getElementById("type-position")).value;
        this.inputDate = ( < HTMLInputElement > document.getElementById("date")).value;
        this.coust = (( < HTMLInputElement > document.getElementById('coust')).value)
        this.coust = this.coust.toLocaleString();
        this.date = new Date(this.inputDate);
    }

    private clearInputs() {
        this.titlePosition = ( < HTMLInputElement > document.getElementById("title-position")).value = '';
        this.coust = ( < HTMLInputElement > document.getElementById("coust")).value = '';
        this.desctiptioPosition = ( < HTMLInputElement > document.getElementById("description")).value = '';
    }
}

class List {
    userId: string = localStorage.getItem('user');
    filterButton: void;
    showAllButton: void;

    constructor() {

        this.filterButton = ( < HTMLButtonElement > document.getElementById('filter-btn')).addEventListener('click', this.onFilterPress);
        this.showAllButton = ( < HTMLButtonElement > document.getElementById('show-all')).addEventListener('click', this.onShowAllPress);
        const typeFilterParameter: HTMLInputElement = ( < HTMLInputElement > document.getElementById('typeFilterParameter'));
        // typeFilterParameter.innerHTML = ""
        // const inicializeType: TypeCard = new TypeCard;
        // inicializeType.initializationTypes('typeFilterParameter');
    }

    public addItemToList(
        titlePosition: string,
        desctiptioPosition: string,
        typePosition: string,
        coust: string,
        date: string) {
        firebase.database().ref('users/' + this.userId + '/listPosition').push({
            title: titlePosition,
            description: desctiptioPosition,
            type: typePosition,
            date: date,
            coust: coust
        });
    }

    public  async getItemToList() {
        let listItems: Promise < any > ;
        const snapshot: any = await firebase.database().ref('/users/' + this.userId + '/listPosition/').once('value');
        listItems = snapshot.val();
        return listItems;
        //add error catch when listItems = null
    }

    public createCards() {
        const items: Promise < any > = this.getItemToList();
        const divWrap: HTMLDivElement = ( < HTMLDivElement > document.getElementById("cardList"));
        divWrap.innerHTML = " ";

        let titlePosition: string,
            desctiptioPosition: string,
            typePosition: string,
            coust: string,
            date: string,
            cardId: string;

        items.then((item) => {
            for (const key in item) {
                titlePosition = item[key].title;
                desctiptioPosition = item[key].description;
                typePosition = item[key].type;
                coust = item[key].coust;
                date = item[key].date;
                cardId = key;

                const card: Card = new Card(titlePosition,
                    desctiptioPosition,
                    typePosition,
                    date,
                    coust,
                    cardId
                );
            }
        })
    }

    public deleteCardInDatabase = (id: string) => {
        const elememtRef: any = firebase.database().ref('users/' + this.userId + '/listPosition/' + id);
        elememtRef.remove();
    }

    private onFilterPress = () => {
        this.getParametersFromFilterPanel();
        this.clearInputsInFilterSection();
    }

    private getParametersFromFilterPanel() {
        const dateFilterParameter: string = ( < HTMLInputElement > document.getElementById('dateFilterParameter')).value;
        const typeFilterParameter: string = ( < HTMLInputElement > document.getElementById('typeFilterParameter')).value;
        this.filterCardsInListSection(typeFilterParameter, dateFilterParameter);
        //add error catch when listItems = null

    }
    private clearInputsInFilterSection() {
        const dateFilterParameter: HTMLInputElement = ( < HTMLInputElement > document.getElementById('dateFilterParameter'));
        const typeFilterParameter: HTMLInputElement = ( < HTMLInputElement > document.getElementById('typeFilterParameter'));
        dateFilterParameter.value = '';
    }

    private filterCardsInListSection(typeFilter: string, dateFilter: string) {
        const divCards: Element[] = Array.from(document.getElementsByClassName('wrapCard'));
        for (const element of divCards) {
            const divCard = < HTMLElement > element;
            const typeCard: string = divCard.getAttribute('type');
            const dateCard: string = divCard.getAttribute('date');
            if (typeCard == typeFilter && dateCard == dateFilter) {
                divCard.style.display = 'flex';
            } else {
                divCard.style.display = 'none';
            }
            console.log(dateCard);
        }
    }

    private onShowAllPress = () => {
        const divCards: Element[] = Array.from(document.getElementsByClassName('wrapCard'));
        for (const element of divCards) {
            const divCard = < HTMLElement > element;
            divCard.style.display = 'flex';
        }
    }

}

class Card {
    divWrap: HTMLDivElement = ( < HTMLDivElement > document.getElementById("cardList"));
    divCard: HTMLDivElement = ( < HTMLDivElement > document.createElement('div'));
    divCardBody: HTMLDivElement = ( < HTMLDivElement > document.createElement('div'));
    cardTitle: HTMLHeadElement = ( < HTMLHeadElement > document.createElement('h5'));
    cardDescription: HTMLParagraphElement = ( < HTMLParagraphElement > document.createElement('p'));
    listGrup: HTMLUListElement = ( < HTMLUListElement > document.createElement('ul'));
    type: HTMLLIElement = ( < HTMLLIElement > document.createElement('li'));
    date: HTMLLIElement = ( < HTMLLIElement > document.createElement('li'));
    coust: HTMLLIElement = ( < HTMLLIElement > document.createElement('li'));
    divCardBody2: HTMLDivElement = ( < HTMLDivElement > document.createElement('div'));
    buttonDelete: HTMLButtonElement = ( < HTMLButtonElement > document.createElement('button'));
    userId: string = localStorage.getItem('user');

    constructor(title: string, description: string, type: string, date: string, coust: string, idCard: string) {
        this.buildCardHTML();
        this.cardTitle.innerHTML = title;
        this.cardDescription.innerHTML = description;
        this.type.innerHTML = 'Type: ' + type;
        this.date.innerHTML = 'Date: ' + date;
        this.coust.innerHTML = 'Coust: ' + coust;
        this.buttonDelete.id = idCard;
        this.divCard.id = idCard;
        this.divCard.setAttribute('date', date);
        this.divCard.setAttribute('type', type);
    }

    private buildCardHTML() {
        this.divWrap.appendChild(this.divCard);
        this.divCard.className = "card wrapCard";
        this.divCardBody.className = "card-body";
        this.divCard.appendChild(this.divCardBody);
        this.divCard.appendChild(this.listGrup);
        this.listGrup.className = 'list-group list-group-flush';
        this.divCard.appendChild(this.divCardBody2);
        this.cardTitle.className = "card-title";
        this.cardDescription.className = "card-text";
        this.divCardBody.appendChild(this.cardTitle);
        this.divCardBody.appendChild(this.cardDescription);
        this.listGrup.appendChild(this.type);
        this.listGrup.appendChild(this.date);
        this.listGrup.appendChild(this.coust);
        this.type.className = 'list-group-item';
        this.date.className = 'list-group-item';
        this.coust.className = 'list-group-item';
        this.divCardBody2.className = 'card-body card-button-wrap';
        this.divCardBody2.appendChild(this.buttonDelete);
        this.buttonDelete.className = 'btn btn-link delete';
        this.buttonDelete.type = 'button';
        this.buttonDelete.innerHTML = 'Delete'
        this.buttonDelete.addEventListener('click', this.onDeletePressed)
    }

    private onDeletePressed = () => {
        const list: List = new List();
        this.removeCardFromUI(this.buttonDelete.id);
        list.deleteCardInDatabase(this.buttonDelete.id);
    }

    private removeCardFromUI(id: string) {
        document.getElementById(id).remove();
    }
}


class LeftSideBad {
    singOutButton: HTMLButtonElement = ( < HTMLButtonElement > document.getElementById('singOut'));
    constructor() {
        this.singOutButton.addEventListener('click', this.singOut);
    }

    singOut = () => {
        firebase.auth().signOut().then(function () {
            window.location.href = "C:/Users/User/Desktop/CostCount/index.html";
        }).catch(function (error) {
            console.log(error)
        });
    }
}

class Profile {
    newTypeButton: HTMLButtonElement = ( < HTMLButtonElement > document.getElementById('btn-new-type'));
    newTypeInput: HTMLInputElement = ( < HTMLInputElement > document.getElementById('new-type-input'));
    newPasswordButton: HTMLButtonElement = ( < HTMLButtonElement > document.getElementById('newPassword-btn'));
    newPasswordInput: HTMLInputElement = ( < HTMLInputElement > document.getElementById('newPassword'));
    type: TypeCard = new TypeCard();
    constructor() {
        this.newTypeButton.addEventListener('click', this.onPtessNewTypeButton)
        this.newPasswordButton.addEventListener('click', this.onPtessNewPasswordButton)
    }
    private onPtessNewTypeButton = () => {
        let newTypeVal: string;
        newTypeVal = this.newTypeInput.value;
        this.type.addTypeToDatabase(newTypeVal);
        this.reloadType();
        this.newTypeInput.value = " ";
    }
    private onPtessNewPasswordButton = () => {
        const email: Promise < any > = this.getEmail();
        email.then((item) => {
            console.log(item.email);
            this.updatePassword(item.email);
        })
    }
    private async getEmail() {
        const userId: string = localStorage.getItem('user');
        let email: Promise < any > ;
        const snapshot: any = await firebase.database().ref('/users/' + userId).once('value');
        email = snapshot.val();
        return email;
    }
    private updatePassword(emailAddress: string) {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            alert("Email sent")
            // Email sent.
        }).catch(function (error) {
            alert("An error happened")
            // An error happened.
        });
    }
    private reloadType(){
        document.getElementById('type-position').innerHTML = ""
        document.getElementById('typeFilterParameter').innerHTML = "";
        this.type.initializationTypes('type-position');
        this.type.initializationTypes('typeFilterParameter');
    }

}

class TypeCard {
    public addTypeToDatabase(type: string) {
        const userId: string = localStorage.getItem('user');
        firebase.database().ref('users/' + userId + '/Types').push({
            'type': type
        });
    }
    private async getType() {
        const userId: string = localStorage.getItem('user');
        let types: Promise < any > ;
        const snapshot: any = await firebase.database().ref('/users/' + userId + '/Types/').once('value');
        types = snapshot.val();
        return types;
    }
    public initializationTypes(id: string) {
        const types: Promise < any > = this.getType();
        types.then((item) => {
            for (const key in item) {
                this.buildHTML(item[key].type, id);
            }
        })
    }

    public buildHTML(type: string, id: string) {
        let selectElement: HTMLSelectElement = ( < HTMLSelectElement > document.getElementById(id));
        let option: HTMLOptionElement = ( < HTMLOptionElement > document.createElement('option'));
        selectElement.appendChild(option);
        option.value = type;
        option.innerHTML = type;
    }
}

class Charts {

    async getCards() {
        let cards: Promise < any > ;
        const list: List = new List();
        cards = list.getItemToList()
        let filtredCards: Array < object > = [];


        await cards.then((card) => {
            for (const key in card) {
                const dateCard: string = (new Date(card[key].date)).toDateString();
                    filtredCards.push({
                        coust: card[key].coust,
                        type: card[key].type
                    });
            }
        })
        return filtredCards;
    }

    async createChartsLisT() {
        const cards = await this.getCards();
        let mapCard: Map < string, any > = new Map();
        let list = [];
        for (const key in cards) {
            if (mapCard.has(cards[key].type)) {
                const oldValue = parseFloat(mapCard.get(cards[key].type));
                var newValue = oldValue + parseFloat(cards[key].coust);
                mapCard.set(cards[key].type, newValue)
            } else {
                mapCard.set(cards[key].type, cards[key].coust)
            }

        }
        mapCard.forEach(function (value, key) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            list.push({
                type: key, 
                cousr: parseInt(value)});
        });
        localStorage.setItem('charts',JSON.stringify(list));
    }


}

window.onload = () => {
    new AddPositionSection();
    new LeftSideBad();
    new Profile();
    const chart:Charts = new Charts();
    chart.createChartsLisT();
    const list:List = new List();
    list.createCards();
}