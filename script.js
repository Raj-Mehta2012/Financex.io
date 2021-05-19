$("#myCarousel").carousel({
  interval: false
});

console.log('page load - entered main.js for js-other api');

// stock predictor
var submitButton = document.getElementById('stock_button');
submitButton.onmouseup = getFormInfo;

function getFormInfo(){
    console.log('entered getFormInfo!');
    // call displayinfo
    var name = document.getElementById("stock_name").value;
    console.log('Stock you entered is ' + name);
    makeNetworkCallToAgeApi(name);

} // end of get form info

function makeNetworkCallToAgeApi(name){
    console.log('entered make nw call' + name);
    alert("Making 1st API call!");
    // set up url
    var xhr = new XMLHttpRequest(); // 1 - creating request object
    var url = "http://localhost:51056/stockpredictions/" + name; 
    console.log(url)
    xhr.open("GET", url, true); // 2 - associates request attributes with xhr

    // set up onload
    xhr.onload = function(e) { // triggered when response is received
        // must be written before send
        console.log(xhr.responseText);
        // do something
        updateAgeWithResponse(name, xhr.responseText);
    }

    // set up onerror
    xhr.onerror = function(e) { // triggered when error response is received and must be before send
        console.error(xhr.statusText);
    }

    // actually make the network call
    xhr.send(null) // last step - this actually makes the request

} // end of make nw call

function updateAgeWithResponse(name, response_text){
    var response_json = JSON.parse(response_text);
    // update a label
    var label1 = document.getElementById("response-line1");
    console.log('Closing Price is : ', +response_json['ClosingPrice'])
    if(response_json['ClosingPrice'] == null){
        label1.innerHTML = 'Apologies, we could not find the desired stock.'
    } else{
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        newdate = month + "/" + day + "/" + year;
        label1.innerHTML =  name + ', Predicted Closing Price for next trading session is ' + response_json['ClosingPrice'];
    }
} // end of updateAgeWithResponse


//StockInfo
var stockInfoButton = document.getElementById('stock_info_button');
stockInfoButton.onmouseup = getStockInfo;

function getStockInfo(){
    console.log('entered StockInfo!');
    // call displayinfo
    var name = document.getElementById("stock_name").value;
    console.log('Stock you entered is ' + name);

    var xhr = new XMLHttpRequest(); // 1 - creating request object
    var url = "http://localhost:51056/stockinfo/" + name; 
    console.log(url)
    xhr.open("GET", url, true); // 2 - associates request attributes with xhr

    // set up onload
    xhr.onload = function(e) { // triggered when response is received
        // must be written before send
        console.log(xhr.responseText);
        // do something
        updateStockInfo(name, xhr.responseText);
    }

    // set up onerror
    xhr.onerror = function(e) { // triggered when error response is received and must be before send
        console.error(xhr.statusText);
    }

    // actually make the network call
    xhr.send(null) // last step - this actually makes the request


} // end of get form info


function updateStockInfo(name, response_text){
    var response_json = JSON.parse(response_text);
    // update a label
    var label1 = document.getElementById("response-line1");
    console.log('Closing Price is : ', +response_json['ClosingPrice'])
    if(response_json['ClosingPrice'] == null){
        label1.innerHTML = 'Apologies, we could not find the desired stock.'
    } else{
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        newdate = month + "/" + day + "/" + year;
        console.log(response_json['ClosingPrice']);
        label1.innerHTML =  name + ', ClosingPrice for ' +newdate+ ' is ' + response_json['ClosingPrice'];
    }
} // end of updateStockInfo



//StockDetailedInfo
var stockDetailedInfoButton = document.getElementById('stock_detinfo_button');
stockDetailedInfoButton.onmouseup = getStockDetInfo;

function getStockDetInfo(){
    console.log('entered StockInfo!');
    // call displayinfo
    var name = document.getElementById("stock_name").value;
    console.log('Stock you entered is ' + name);

    var xhr = new XMLHttpRequest(); // 1 - creating request object
    var url = "http://localhost:51056/stockdetailedinfo/" + name; 
    console.log(url)
    xhr.open("GET", url, true); // 2 - associates request attributes with xhr

    // set up onload
    xhr.onload = function(e) { // triggered when response is received
        // must be written before send
        console.log(xhr.responseText);
        // do something
        updateStockDetInfo(name, xhr.responseText);
    }

    // set up onerror
    xhr.onerror = function(e) { // triggered when error response is received and must be before send
        console.error(xhr.statusText);
    }

    // actually make the network call
    xhr.send(null) // last step - this actually makes the request


} // end of get form info


function updateStockDetInfo(name, response_text){
    var response_json = JSON.parse(response_text);
    // update a label
    var label1 = document.getElementById("response-line1");
    console.log('Closing Price is : ', +response_json['ClosingPrice'])
    if(response_json['ClosingPrice'] == null){
        label1.innerHTML = 'Apologies, we could not find the desired stock.'
    } else{
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        newdate = month + "/" + day + "/" + year;
        label1.innerHTML =  name + ' Closing Price history: ' + response_json['ClosingPrice'];
    }
} // end of updateStockInfo



//Portfolio POST
var AddToPortfolioButton = document.getElementById('portfolio_add_button');
AddToPortfolioButton.onmouseup = AddToPortfolio;

function delete_row(id, given_value) {
    var td = $("#" + id + " td");
    $.each(td, function(i) {
      if ($(td[i]).text() === given_value) {
        $(td[i]).parent().remove();
      } 
    });
  }
  

function AddToPortfolio(){
    console.log('entered Add To Portfolio');
    // call displayinfo
    var stock_name = document.getElementById("portfolio_stock_name").value;
    var stock_qty = document.getElementById("portfolio_stock_qty").value;

    console.log('Stock you entered is ' + stock_name);
    console.log('Qty is ' + stock_qty);
    var xhr = new XMLHttpRequest(); // 1 - creating request object
    var url = "http://localhost:51056/portfolio/";
    var params = {
        'name': stock_name,
        'qty': stock_qty, 
    }; 
    console.log(url)
    xhr.open('POST', url, true); // 2 - associates request attributes with xhr
    xhr.setRequestHeader('Content-type', 'application/json')
    

    // set up onload
    xhr.onload = function(e) { // triggered when response is received
        // must be written before send
        console.log(xhr.responseText);


        tableCode(xhr.response_text);



        // do something
        PortfolioPOSTApiCall(stock_name,stock_qty, xhr.responseText);
    }
    // set up onerror
    xhr.onerror = function(e) { // triggered when error response is received and must be before send
        console.error(xhr.statusText);
    }
    xhr.send(JSON.stringify(params))
    // actually make the network call
   // xhr.send(null) // last step - this actually makes the request
} // end of get form info


function PortfolioPOSTApiCall(name,qty, response_text){
    var response_json = JSON.parse(response_text);
    // update a label
    var label1 = document.getElementById("response-line1");
    if(response_json['Portfolio'] == null){
        label1.innerHTML = 'Apologies, Your Portfolio is currently Empty.'
    } else{
        label1.innerHTML = response_json['Portfolio'];
        console.log("Portfolio: ",response_json['Portfolio']);
    }
}

//PORTFOLIO DELETE
var DeletePortfolioButton = document.getElementById('portfolio_delete_button');
DeletePortfolioButton.onmouseup = DeletefromPortfolio;

function DeletefromPortfolio(){
    console.log('entered Delete Portfolio');
    // call displayinfo
    var name = document.getElementById("portfolio_stock_delete_name").value;
    console.log('Stock you entered is ' + name);
    

    var xhr = new XMLHttpRequest(); // 1 - creating request object
    var url = "http://localhost:51056/portfolio/" + name; 
    console.log(url)
    xhr.open("DELETE", url, true); // 2 - associates request attributes with xhr

    // set up onload
    xhr.onload = function(e) { // triggered when response is received
        // must be written before send
        console.log(xhr.responseText);
        tableCode(xhr.response_text);
        // do something
        PortfolioDeleteApiCall(name, xhr.responseText);
    }
    // set up onerror
    xhr.onerror = function(e) { // triggered when error response is received and must be before send
       // console.error(xhr.statusText);
    }
    // actually make the network call
    xhr.send(null) // last step - this actually makes the request
    
} 

function PortfolioDeleteApiCall(name, response_text){
    var response_json = JSON.parse(response_text);
    // update a label
    var label1 = document.getElementById("response-line1");
    if(response_json['Portfolio'] == null){
        label1.innerHTML = 'Apologies, Your Portfolio is currently Empty.'
    } else{
        label1.innerHTML = response_json['Portfolio'];
        console.log("Portfolio: ",response_json['Portfolio']);
    }
}


//PORTFOLIO PUT
var PutPortfolioButton = document.getElementById('portfolio_put_button');
PutPortfolioButton.onmouseup = PutfromPortfolio;

function PutfromPortfolio(){
    console.log('entered Put Portfolio');
    // call displayinfo
    var name = document.getElementById("portfolio_stock_update_name").value;
    var quantity = document.getElementById("portfolio_put_body").value;
    console.log('Stock you entered is ' + name);

    var xhr = new XMLHttpRequest(); // 1 - creating request object
    var url = "http://localhost:51056/portfolio/" + name; 
    console.log(url)
    xhr.open("PUT", url, true); // 2 - associates request attributes with xhr
    var params = {
        'qty': quantity, 
    }; 
    xhr.setRequestHeader('Content-type', 'application/json')

    // set up onload
    xhr.onload = function(e) { // triggered when response is received
        // must be written before send
        console.log(xhr.responseText);
        tableCode(xhr.response_text);
        // do something
        PortfolioPUTApiCall(xhr.responseText);
    }
    // set up onerror
    xhr.onerror = function(e) { // triggered when error response is received and must be before send
        console.error(xhr.statusText);
    }
    // actually make the network call
    xhr.send(JSON.stringify(params))// last step - this actually makes the request
    
} 

function PortfolioPUTApiCall(response_text){
    var response_json = JSON.parse(response_text);
    // update a label
    var label1 = document.getElementById("response-line1");
    if(response_json['Portfolio'] == null){
        label1.innerHTML = 'Your Portfolio is currently Empty.'
    } else{
        label1.innerHTML = response_json['Portfolio'];
        console.log("Portfolio: ",response_json['Portfolio']);
    }
}


function tableCode(response_text){
    var table = document.getElementById("table_id1");
        


            var http = new XMLHttpRequest();
            var url1 = "http://localhost:51056/portfolio/";
            http.open('GET', url1, true); 

            http.onload = function(e) { // triggered when response is received
                // must be written before send
                console.log(http.responseText);
                temp = http.response;
                temp_stocks= JSON.parse(http.responseText);
                
                // for(var i = 0; i < table.rows.length; i++)
                // {
                //     table.deleteRow(i);
            
                // }

                while(table.hasChildNodes()){
                    table.removeChild(table.firstChild);
                }

                var header = table.createTHead();
                var row = header.insertRow(0);    
                var cell = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell.innerHTML = "<strong>Stock</strong>";
                cell2.innerHTML = "<strong>Quantity</strong>";



                for(var i = 0; i < temp_stocks.stocks.length; i++)
                {
                    var product = temp_stocks.stocks[i];
                    console.log(product.stock);
                    var row = table.insertRow(1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = product.stock;
                    cell2.innerHTML = product.quantity;
            
                }
            }

            http.onerror = function(e) { // triggered when error response is received and must be before send
                // console.error(xhr.statusText);
             }
             // actually make the network call
             http.send(null) // 



}