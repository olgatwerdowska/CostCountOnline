var ProfileUI=function(){function t(){var t=this;this.getDada=function(){t.titlePosition=document.getElementById("title-position").value,t.desctiptioPosition=document.getElementById("description").value,t.typePosition=document.getElementById("type-position").value,t.inputDate=document.getElementById("date").value,t.date=new Date(t.inputDate),t.date.toDateString(),console.log(t.titlePosition,t.typePosition,t.date,t.desctiptioPosition),(new List).addItemToList(t.titlePosition,t.desctiptioPosition,t.typePosition,t.inputDate),t.clearInputs()},this.addPositionButton=document.getElementById("add-position").addEventListener("click",this.getDada),this.singOutButton=document.getElementById("singOut").addEventListener("click",this.singOut)}return t.prototype.singOut=function(){(new Profile).singOut()},t.prototype.clearInputs=function(){this.titlePosition=document.getElementById("title-position").value=" ",this.desctiptioPosition=document.getElementById("description").value=" ",this.typePosition=document.getElementById("type-position").value="Choose.."},t}(),List=function(){function t(){}return t.prototype.addItemToList=function(t,e,i,o){var n=localStorage.getItem("user");firebase.database().ref("users/"+n+"/listPosition").push({title:t,description:e,type:i,date:o})},t}(),Profile=function(){function t(){}return t.prototype.singOut=function(){firebase.auth().signOut().then(function(){window.location.href="C:/Users/User/Desktop/CostCount/index.html"}).catch(function(t){console.log(t)})},t}();window.onload=function(){new ProfileUI};