 
 	
    // Global variables for the Cartilla js file
    var idNumberCart = 0;
    var nC = "";
    var bC = "";
    var gC = "";
    var eC = "";

   // document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database 
    //
    function populateDBCartilla(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS CART');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CART (id unique, name, birth, gender, email)');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    function insertDBCartilla(tx){
    	tx.executeSql('CREATE TABLE IF NOT EXISTS CART (id unique, name, birth, gender, email)');
    	tx.executeSql('INSERT INTO CART (id, name, birth, gender, email) VALUES ('+(idNumberCart+1)+', "'+nC+'", "'+bC+'", "'+gC+'", "'+eC+'")');
       // tx.executeSql('INSERT INTO DEMO (id, vaccine, location, sd, notes) VALUES (2, "d", "d", "df", "d")');

    }
    // Query the database
    //
    function queryDBCartilla(tx) {
        tx.executeSql('SELECT * FROM CART ORDER BY name', [], querySuccessCartilla, errorCBCartilla);
    }



    // Query the success callback
    //
    function querySuccessCartilla(tx, results) {
        var len = results.rows.length;
        idNumberCart = len;
        console.log("CART table: " + len + " rows found.");

       // if(display){
	        var list  = document.getElementById("listToCartillas");
            while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
	        for (var i=0; i<len; i++){
	        	
	        	var elem = document.createElement("li");
	        	var anchor = document.createElement("a");
	        	anchor.setAttribute('href', '#');
	        	anchor.setAttribute('data-rel', 'popup');
	        	anchor.setAttribute('data-transition', 'slideup');

	        	var content = document.createTextNode(results.rows.item(i).name +"  -- Date of birthx: "value",  "+ results.rows.item(i).birth);
				anchor.appendChild(content);
				elem.appendChild(anchor);
				list.appendChild(elem);

	            console.log("Row = " + i + " ID = " + results.rows.item(i).vaccine + " Data =  " + results.rows.item(i).location +" "+results.rows.item(i).sd);
	        }
            try {
                $('#listToCartillas').listview('refresh');
            } catch(e) {
                // $('#listToEvents').listview();
            }
	        
    	//}	
    }

    // Transaction error callback
    //
    function errorCBCartilla(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCBCartilla() {
        console.log("success creating the table");
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDBCartilla, errorCBCartilla);
    }

    // Cordova is ready
    //
    function onCartillas() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(populateDBCartilla, errorCBCartilla, successCBCartilla);
    }

    // inserting a new event
    function insertCartilla(){
    	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
    	nC = document.getElementById("nameC").value;
        bC = document.getElementById("dayC").value + " - " +document.getElementById("monthC").value + " - " +document.getElementById("yearC").value;
        var radios = document.getElementsByName('radio-choice');
        if (radios[0].checked)
            gC = radios[0].value;
        else
            gC = radios[1].value;
        eC = document.getElementById("emailC");
        db.transaction(insertDBCartilla, errorCBCartilla, successCBCartilla);
    }

    // Getting all the vaccines
    function getCartilla(){
    	display  =true;
    	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDBCartilla, errorCBCartilla, successCBCartilla);
    }


    /*
    Pending to implement delete cartilla
    // Function call: deleteEvents() from html button
    function deleteCartillaFromCalendar(i){
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDB_delete, errorCB, successCB);    
        idDelete = i;
    }

    function deleteCartillaFromDB(i){
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDB_deleteDB, errorCB, successCB);    
        idDelete = i;
    }

    function updateIdCart(){
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(updateIDDB, errorCB);    
    }

    */
   