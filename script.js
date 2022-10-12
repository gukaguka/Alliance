


// prevent reload on submit.
function mySubmitFunction(e) {
  	e.preventDefault();
  	return false;
}

// global Variables (getting field values). 
		var id = 0;
		var firstName = document.getElementById("fname");
		var lastName = document.getElementById("lname");
		var adress = document.getElementById("adress");
		var sex = document.getElementById("sex")? document.getElementById("sex") : " " ;
		var dateOfBirth = document.getElementById("birthday") ? document.getElementById("birthday") : " " ;
		var textArea = document.getElementById("textArea") ? document.getElementById("textArea") : " " ;
		var letters = /^[A-Za-z]+$/;
		var forms = [];


function storeData() {


// Validation logic.
    if( firstName.value == " " || firstName.value.match(letters) )
    	{
     	  var validName = true;
     	}

    if( lastName.value == " " || lastName.value.match(letters) )
     	{
     	  var validLname = true;  
     	}


    if( adress.value == " " || adress.value.length <= 35 )
     	{
     	  var validAdress = true;
     	}




//render validated accounts.
    if(validName == true && validLname == true && validAdress == true ){

      id++;
      idNumber = JSON.stringify(id);

//get submitted form values and create object and store them in localstorage.
      var form = {id: idNumber ,lastName: lastName.value, firstName: firstName.value,
       adress: adress.value, sex: sex.value, birth: dateOfBirth.value, text: textArea.value};

       forms.push(form);

      window.localStorage.setItem(idNumber,JSON.stringify(form));


//create single elements and rendering them in the 'root' div
  	  var elem = document.createElement("div");
      document.getElementById("root").appendChild(elem);
      elem.setAttribute("id", idNumber);
  	  elem.setAttribute("class", "display-user-style");
  	  

  	  var button = document.createElement("button");
  	  document.getElementById(idNumber).appendChild(button);
  	  button.innerHTML = "X";
  	  button.setAttribute("class", "delete-button");
  	  button.addEventListener("click", function(e) {
  	  	window.localStorage.removeItem(idNumber);
  	  	window.location.reload();
  	  	e.stopPropagation();

      });


// getting data back from localstorage, looping through and rendering it to the html
  	  var data = JSON.parse(window.localStorage.getItem(idNumber));

  	    Object.entries(data).forEach(([key, value]) => {


  	if(key == "text"){
  	    		var singleField = document.createElement("h5");
		    document.getElementById(idNumber).appendChild(singleField);
		    singleField.setAttribute("class", "accordion");
		    singleField.innerHTML = value ;
  	    	}
  	    	else{
  	    	var singleField = document.createElement("h6");
		    document.getElementById(idNumber).appendChild(singleField);
		    singleField.innerHTML = value ;
  	    	}
        })

          elem.addEventListener("click", function() {
  	  	var child = elem.querySelectorAll('h5');
  	  	child[0].classList.toggle('show');
  	  });   
  	    }
};



window.onload = function() {

	if(window.localStorage.length > 0 ){
		var toInteger = Object.keys(window.localStorage);
		var maxIdNumb = Math.max(...toInteger);
		id = maxIdNumb;
		console.log(maxIdNumb);
		Object.entries(localStorage).forEach(([key, value]) => {

			var idNumber = key;
			console.log(key);

	  var elem = document.createElement("div");
      document.getElementById("root").appendChild(elem);
      elem.setAttribute("id", idNumber );
  	  elem.setAttribute("class", "display-user-style");

  		

        var data = JSON.parse(window.localStorage.getItem(idNumber));
        console.log(data);

  	    Object.entries(data).forEach(([k, value]) => {
  	    	if(k == "text"){
  	    		var singleField = document.createElement("h5");
		    document.getElementById(idNumber).appendChild(singleField);
		    singleField.setAttribute("class", "accordion");
		    singleField.innerHTML = value ;
  	    	}
  	    	else{
  	    	var singleField = document.createElement("h6");
		    document.getElementById(idNumber).appendChild(singleField);
		    singleField.innerHTML = value ;
  	    	}
		    
        });

         elem.addEventListener("click", function() {
  	  	var child = elem.querySelectorAll('h5');
  	  	child[0].classList.toggle('show');
  	  });

        	  var button = document.createElement("button");
  	  document.getElementById(idNumber).appendChild(button);
  	  button.setAttribute("class", "delete-button");
  	  button.innerHTML = "X";
  	  button.addEventListener("click", function(e) {
  	  	window.localStorage.removeItem(idNumber);
  	  	window.location.reload();
  	  	e.stopPropagation();
      });

	    });


    };

};

function showNameValidationMessage() {

		document.querySelectorAll('.message-box')[0].style.visibility = "visible";
		document.querySelectorAll('.message-box')[1].style.visibility = "visible";
	
}

function showAdressMessage(){
	document.querySelector('.message-box-2').style.visibility = "visible";
}