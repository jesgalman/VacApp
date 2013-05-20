 
 	var sd= "";
 	var vac = "";
 	var loc = "";
 	var not =  "";
 	var idNumber  = 0;
 	var display = false;
    var idDelete = -1;

    document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database 
    //
    function populateDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, vaccine, location, sd, notes)');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    function insertDB(tx){
    	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, vacccine, location, sd, notes)');
    	tx.executeSql('INSERT INTO DEMO (id, vaccine, location, sd, notes) VALUES ('+(idNumber+1)+', "'+vac+'", "'+loc+'", "'+sd+'", "'+not+'")');
       // tx.executeSql('INSERT INTO DEMO (id, vaccine, location, sd, notes) VALUES (2, "d", "d", "df", "d")');

    }
    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO ORDER BY sd', [], querySuccess, errorCB);
    }

    
    function updateIDDB(tx) {
        tx.executeSql('SELECT * FROM DEMO ORDER BY id DESC', [], querySuccessID, errorCB);
    }

    function queryDB_deleteDB(tx) {
        tx.executeSql('DELETE FROM DEMO WHERE id='+idDelete, [], querySuccess, errorCB);
    }

    // Query db to delete
    function queryDB_delete(tx) {
        tx.executeSql('SELECT * FROM DEMO WHERE id='+idDelete, [], querySuccessDelete, errorCB);
    }


    // Delete event from calendar ios
    function querySuccessID(tx, results) {
        var len = results.rows.length;
        
        if (len == 0)
            idNumber = 0;
        else
            idNumber = results.rows.item(0).id;

        
        try {
            $('#listToEvents').listview('refresh');
        } catch(e) {
           // $('#listToEvents').listview();
        }
        try {
           $('#listToEventsDelete').listview('refresh');
        } catch(e) {
            // $('#listToEvents').listview();
        }
        //} 
    }

    // Delete event from calendar ios
    function querySuccessDelete(tx, results) {
        var len = results.rows.length;
       // idNumber = len;
        console.log("DEMO table: " + len + " rows found.");
        var cal = new calendarPlugin();
        var errCall = function(e) {
                    console.log("Error occurred - " + e);
                }
                var succCall = function(themessage) {
                    console.log("Success");
                    console.log(themessage);
                }
        var date = results.rows.item(0).sd;
        var separate = date.split("/");
        var mm ;
        switch(separate[1]){
            case "jan":
                mm = 1;
            break;

            case "feb":
                mm = 2;
            break;
            case "mar":
                mm = 3;
            break;
            case "apr":
                mm = 4;
            break;
            case "may":
                mm = 5;
            break;
            case "jun":
                mm = 6;
            break;
            case "jul":
                mm = 7;
            break;
            case "aug":
                mm = 8;
            break;

            case "sep":
                mm = 9;
            break;
             case "oct":
                mm = 10;
            break;
             case "nov":
                mm = 11;
            break;
             case "dec":
                mm = 12;
            break;
        }
        var newDate = separate[0]+"/"+mm+"/"+separate[2];
        cal.deleteEvent(results.rows.item(0).vaccine, results.rows.item(0).location, results.rows.item(0).notes, newDate, newDate, true, succCall, errCall);
        //alert(results.rows.item(0).sd);
        try {
            $('#listToEvents').listview('refresh');
        } catch(e) {
           // $('#listToEvents').listview();
        }
        try {
           $('#listToEventsDelete').listview('refresh');
        } catch(e) {
            // $('#listToEvents').listview();
        }
        //} 
    }


    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        updateIdNumber();
        console.log("DEMO table: " + idNumber + " rows found.");

       // if(display){
	        var list  = document.getElementById("listToEvents");
            var listDelete  = document.getElementById("listToEventsDelete");

            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            while (listDelete.firstChild) {
                listDelete.removeChild(listDelete.firstChild);
            }
	        for (var i=0; i<len; i++){
                var title_d = results.rows.item(i).vaccine;
                var location_d = results.rows.item(i).location;
                var notes_d = results.rows.item(i).notes;
                var startDate_d = results.rows.item(i).sd;
	        	
	        	var elem = document.createElement("li");
                elem.setAttribute('data-icon','false');

                var div1 = document.createElement("div");
                div1.setAttribute('class','ui-btn-inner');
                var div2 = document.createElement("div");
                div2.setAttribute('class','ui-btn-text');
                var h3 = document.createElement("h1");
                h3.setAttribute('class','ui-li-heading');
                var pDate = document.createElement("p");
                var pLocation = document.createElement("p");
                var pNotes = document.createElement("p");
                //pDate.setAttribute('class','ui-li-desc');
                //pLocation.setAttribute('class','ui-li-desc');
                //pNotes.setAttribute('class','ui-li-desc');

                 
                h3.innerHTML = results.rows.item(i).vaccine;
                pDate.innerHTML = "<b>Date: </b>"+results.rows.item(i).sd;
                pLocation.innerHTML = "<b>Location: </b>"+ results.rows.item(i).location;
                pNotes.innerHTML = "<b>Notes: </b>"+ results.rows.item(i).notes;

                var elemDelete = document.createElement("li");
                elemDelete.setAttribute('onclick','deleteMyEvent('+results.rows.item(i).id+')');
                elemDelete.setAttribute('data-icon','delete');
	        	
                var anchor = document.createElement("a");
                var anchor2 = document.createElement("a");
	        	
                anchor.setAttribute('href', '#');
	        	anchor.setAttribute('data-rel', 'popup');
	        	anchor.setAttribute('data-transition', 'slideup');
                var anchorD = anchor;

	        	//var content = document.createTextNode("Date: "+results.rows.item(i).sd+"   "+results.rows.item(i).vaccine +"  Location:  "+results.rows.item(i).location);
				var content2 = document.createTextNode("Date: "+results.rows.item(i).sd+"   "+results.rows.item(i).vaccine +"  Location:  "+results.rows.item(i).location);
                
                div2.appendChild(h3);
                div2.appendChild(pDate);
                div2.appendChild(pLocation);
                div2.appendChild(pNotes);
                div1.appendChild(div2);
                anchor.appendChild(div1);
                anchor2.appendChild(content2);
                elemDelete.appendChild(anchor2);
				elem.appendChild(anchor);
				list.appendChild(elem);
                listDelete.appendChild(elemDelete);

	            console.log("Row = " + results.rows.item(i).id + " ID = " + results.rows.item(i).vaccine + " Data =  " + results.rows.item(i).location +" "+results.rows.item(i).sd);
	        }
            try {
                $('#listToEvents').listview('refresh');
            } catch(e) {
                // $('#listToEvents').listview();
            }
	        try {
                $('#listToEventsDelete').listview('refresh');
            } catch(e) {
                // $('#listToEvents').listview();
            }
    	//}	
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        console.log("success creating the table");
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDB, errorCB);
    }

    // Cordova is ready
    //
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(populateDB, errorCB, successCB);
        onCartillas();
    }

    // inserting a new event
    function insert(d, t, l, n){
    	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
    	sd = d;
    	vac = t;
    	loc = l;
    	not = n;
        db.transaction(insertDB, errorCB, successCB);
    }

    // Getting all the vaccines
    function getVaccines(){
    	display  =true;
    	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDB, errorCB, successCB);

    }

    // Function call: deleteEvents() from html button
    function deleteEventFromCalendar(i){
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDB_delete, errorCB, successCB);    
        idDelete = i;
    }

    function deleteEventFromDB(i){
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(queryDB_deleteDB, errorCB, successCB);    
        idDelete = i;
    }

    function updateIdNumber(){
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 2000000);
        db.transaction(updateIDDB, errorCB);    
    }
    

    /*

    <div data-role="controlgroup" data-type="vertical">
        <div class="ui-grid-a">
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
            <div class="ui-block-a"><img src="img/cartillas_juan.png" width= "100%"/> </div>
            <div class="ui-block-b"><img src="img/cartillas_juan.png" width= "100%"/></div>
        </div>
    </div>


    popo up rip
    <!-- /page Pop up info vacunas  -->    
    <div data-role="popup" id="vacInfoPopup" data-overlay-theme="a">
        <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>      
        <ul data-role="listview" data-inset="true">
            <li data-role="list-divider" role="heading" tabindex="0">Vacuna Selecta</li>
            <li><p>Funci&oacute;n: <br /> Protecci&oacute;n al sistema inmunol&oacute;gico...</p></li>
            <li><p>Aplicaci&oacute;n: <br />Debajo de la piel...</p></li>
            <li><p>Contraindicaciones: <br /> No aplica</p></li>
            <li><p>Reacciones Secundarias: <br />Fiebre profunda </p></li>
           <a href="#vacunas" data-role="button" data-transition="slidedown" data-icon="arrow-l" data-theme="a">Back</a>
        </ul>
    </div>  
    */


