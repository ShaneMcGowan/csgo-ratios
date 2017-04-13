

window.onload = function() {
    
    //////////////////
    // Polygon
    /////////////////
    chrome.storage.local.get('lastUpdate',function(localStorageData){
        if(localStorageData.lastUpdate != null){
            $('#tbxCsgoPolygonLastUpdate').html('Last update : ' + localStorageData.lastUpdate);
        }
        else{
            $('#tbxCsgoPolygonLastUpdate').html('No data, click update in the home tab to get data.')
        }
    });
    chrome.storage.local.get('csgoPolygon',function(localStorageData){ //******* csgoPolygon is temp name
        var tblData = '';
        var data = localStorageData.csgoPolygon; //******* csgoPolygon is temp name       
        //For all
        data.forEach(function(element) {
            if(element.name != null ){
                tblData += `<tr>
                <td> ` + element.name + `</td>
                <td>` + element.price + `</td>
                <td>` + element.total + `</td>
                </tr>`;        
            }
        });
        $('#tblCsgoPolygon').html(tblData);
    });

    //////////////////////
    // Op Skins
    /////////////////////

    //Prices
    chrome.storage.local.get('opSkinsData',function(localStorageData){
        var tblData = '';
        var itemArray = localStorageData.opSkinsData;
        itemArray.forEach(function(element) {
            if(element.name != null ){
                var urlString = "https://opskins.com/?loc=shop_search&app=730_2&search_item=" + element.name + "&min=&max=&sort=lh&stat=&grade=&exterior=&type=";
                tblData += `<tr>
                <td><a href='` + urlString + `' target='_blank'>` + element.name + `</a></td>
                <td>` + priceFormatter(element.price) + `</td>
                <td>` + element.quantity + `</td>
                </tr>`        
            }
        });
        $('#tblOpSkins').html(tblData);
    });
    //Time
    chrome.storage.local.get('opSkinsTime',function(localStorageData){
        if(localStorageData.opSkinsTime != null){
            $('#tbxOpSkinsLastUpdate').html('Last update : ' + localStorageData.opSkinsTime);
        }
        else{
            $('#tbxOpSkinsLastUpdate').html('No data, click update in the home tab to get data.')
        }
    });
    var ratioSortType = $('#ddlCompareRatio :selected').text();
    var ratioSortValue = $('#tbxCompareRatio').val();
    var sort = $('#ddlCompareSort :selected').text();
    compare(sort,ratioSortType,ratioSortValue,0);

    
//button get site prices csgoPolygon
document.getElementById('btnUpdatePrices').addEventListener('click',function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "getPrices"}, function(response) {

            chrome.storage.local.set({ 'csgoPolygon' : response}); //puts data in local storage ******* csgoPolygon is temp name
            chrome.storage.local.set({ 'lastUpdate' : Date() });

            var tblData = '';
            var data;
            chrome.storage.local.get('csgoPolygon',function(localStorageData){ //******* csgoPolygon is temp name
                
                data = localStorageData.csgoPolygon; //******* csgoPolygon is temp name
                
                data.forEach(function(element) {
                    if(element.name != null ){
                        tblData += `<tr>
                        <td> ` + element.name + `</td>
                        <td>` + element.price + `</td>
                        <td>` + element.total + `</td>
                        </tr>`        
                    }
                });
                $('#tblCsgoPolygon').html(tblData);
            });
        });
    });
    createAlertBox('CsgoPolygon prices updated!');
});

//button clear storage
/*
document.getElementById('btnClearStorage').addEventListener('click',function(){
    chrome.storage.local.clear();
});*/

//button get opskins prices
document.getElementById('btnUpdateOpSkins').addEventListener('click',function(){
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.opskins.com/IPricing/GetAllLowestListPrices/v1/?appid=730", false);
    xhr.send();

    var data = JSON.parse(xhr.responseText);
    //If success
    if(data.status == 1){
        var itemArray = [];
        //Itterate through opskins data, parse into array
        for (var key in data.response) {
            if (!data.response.hasOwnProperty(key)) continue;
            //Item Name
            var item = {name : 'hi', price : '', quantity : ''};
            
            //Special character remover \u2605 \u2122
            var charStar = key.includes("\u2605");
            var charTM = key.includes("\u2122");
            var tempName = key;
            if(charStar){
                tempName = tempName.replace("\u2605 ", "");
            }
            if(charTM){
                tempName = tempName.replace("\u2122","");
            }
            
            item.name = tempName;
            var obj = data.response[key];
            //Itterate through item properties
            for (var prop in obj) {
                if(!obj.hasOwnProperty(prop)) continue;
                if(prop == 'price'){
                    item.price = obj[prop];
                }
                else if(prop == 'quantity'){
                    item.quantity = obj[prop];
                }
            }
            itemArray.push(item);
        }
        //Last time API Data was cached.
        $('#tbxOpSkinsLastUpdate').html(dateDifference(data.time));
        //Fill table with data
        var tblData = '';
        itemArray.forEach(function(element) {
            if(element.name != null ){
                var urlString = "https://opskins.com/?loc=shop_search&app=730_2&search_item=" + element.name + "&min=&max=&sort=lh&stat=&grade=&exterior=&type=";
                tblData += `<tr>
                <td><a href='` + urlString + `' target='_blank'>` + element.name + `</a></td>
                <td>` + priceFormatter(element.price) + `</td>
                <td>` + element.quantity + `</td>
                </tr>`        
            }
        });
        $('#tblOpSkins').html(tblData);
        //Write to local storage
        chrome.storage.local.set({ 'opSkinsData' : itemArray});
        var date = new Date(data.time * 1000);
        chrome.storage.local.set({ 'opSkinsTime' : date.toString()});
        createAlertBox('OpSkins prices updated!');
    }
    else{ //If failed
        createAlertBox('Error');
    }
});

//button get bitskins prices
document.getElementById('btnUpdateBitSkins').addEventListener('click',function(){
    /*chrome.storage.local.get('opSkins',function(localStorageData){
        var opSkins = localStorageData.opSkins

        var itemString = '';
        var iterations = opSkins.length / 50;
        
        var data = [];
        for(var i = 0; i < iterations; i++){
            var addition = (i * 50);
            if(i != iterations){
                for(var j = 0; j < 50; j++){
                    try{
                        itemString += opSkins[j + addition].name;
                        itemString += ',';          
                    }
                    catch(err){
                        console.log('error on itteration : ' + i + ' - ' + j);
                    }
                }
            }
            var xhr = new XMLHttpRequest();
            var apiKey = '4148eb49-6b5b-49d2-b745-eecc89f86b3a';
            var code = $('#tbxBitSkinsCode').val();
            var urlBase = 'https://bitskins.com/api/v1/get_price_data_for_items_on_sale/?api_key=' + apiKey +'&code=' + code + '&names=';
            xhr.open("GET", (urlBase + itemString), false);
            xhr.send();

            var tempObject = JSON.parse(xhr.responseText);
            data[i] = tempObject.data.items;
            //alert(data[i][0].market_hash_name);
            //alert(JSON.stringify(data[i]));
            itemString = '';
            console.log(i);
        }
        
        var itemArray = [];
        for(var j = 0; j < data.length; j++){
            for(var i = 0; i < data[j].length; i++){

                var item = {name : '', price : '', quantity : ''};
                item.name = data[j][i].market_hash_name;
                item.price = data[j][i].lowest_price;
                item.quantity = data[j][i].total_items;
                
                itemArray.push(item);
            }
        }
        var tblData = '';
        itemArray.forEach(function(element) {
            if(element.name != null ){
                var urlString = "https://bitskins.com/?market_hash_name=" + element.name + "&is_stattrak=0&has_stickers=0&is_souvenir=0&sort_by=price&order=asc";
                tblData += `<tr>
                <td><a href='` + urlString + `' target='_blank'>` + element.name + `</a></td>
                <td>` + priceFormatter(element.price) + `</td>
                <td>` + element.quantity + `</td>
                </tr>`        
            }
        });
        $('#tblBitSkins').html(tblData);

    });*/
    alert('fix this');
});

//button Open Sites
document.getElementById('btnOpenSites').addEventListener('click',function(){
    openSites();
});

//button compare
document.getElementById('btnCompare').addEventListener('click',function(){
    compare($('#ddlCompareSort :selected').text());
});

/////////////////////////////////////////////////////////////////////
// Compare Page
/////////////////////////////////////////////////////////////////////

//apply button clicked
document.getElementById('btnCompareRatio').addEventListener('click',function(){
    var ratioSortType = $('#ddlCompareRatio :selected').text();
    var ratioSortValue = $('#tbxCompareRatio').val();
    var sort = $('#ddlCompareSort :selected').text();
    var coins = $('#tbxCompareCoins').val();
    compare(sort,ratioSortType,ratioSortValue,coins);
});

document.getElementById('btnCompareDeposit').addEventListener('click',function(){
    /* Set up search criteria, make values changable in preferences later */
    $('#tbxCompareRatio').val('13.5');
    $('#ddlCompareRatio').val('Above').change();
    $('#ddlCompareSort').val('Descending').change();

    // Do sort
    var ratioSortType = $('#ddlCompareRatio :selected').text();
    var ratioSortValue = $('#tbxCompareRatio').val();
    var sort = $('#ddlCompareSort :selected').text();
    var coins = $('#tbxCompareCoins').val();
    compare(sort,ratioSortType,ratioSortValue,coins);
});
document.getElementById('btnCompareWithdraw').addEventListener('click',function(){
    /* Set up search criteria, make values changable in preferences later */
    $('#tbxCompareRatio').val('11.5');
    $('#ddlCompareRatio').val('Below').change();
    $('#ddlCompareSort').val('Ascending').change();

    // Do sort
    var ratioSortType = $('#ddlCompareRatio :selected').text();
    var ratioSortValue = $('#tbxCompareRatio').val();
    var sort = $('#ddlCompareSort :selected').text();
    var coins = $('#tbxCompareCoins').val();
    compare(sort,ratioSortType,ratioSortValue,coins);
});
/////////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////////
function testClick(){
    var $textbox = $('#urls');
    $textbox.val("Hi friend");
    chrome.runtime.sendMessage("Hi", insertText)
}

function insertText(response){
    var $textbox = $('#urls');
    $textbox.val(response);
}

//Get difference between date and opskins date 
function dateDifference(dateInput){
    //http://stackoverflow.com/questions/7709803/javascript-get-minutes-between-two-dates 24/12/2016
    var input = new Date(dateInput * 1000);
    var today = new Date();
    var diffMs = (today - input); // milliseconds between now & update
    var diffDays = Math.round(diffMs / 86400000); // days
    var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var returnString = 'Data last cached <strong>' + diffMins + '</strong> minute(s) ago. ( API data should be cached every 30 minutes, Update prices in <strong>' +  (30 - diffMins) + '</strong> minute(s). )';
    return (returnString);
}

//Open in new tab
function openInNewTab(){
    window.open(chrome.extension.getURL("popup.html"), "_blank");
}
//Open Sites
function openSites(){
    chrome.tabs.create({url: 'https://opskins.com/', active: false});
    chrome.tabs.create({url: 'http://csgopolygon.com/withdraw.php', active: false});
}

//convert price to correct format
function priceFormatter(price){
    var formattedPrice = ('$' + ((price / 100).toFixed(2)));
    return formattedPrice;
}

function compare(sort, ratioSortType, ratioSortValue,coins){
        //get opskins data
    chrome.storage.local.get('opSkinsData',function(localStorageData){
        var opSkins = localStorageData.opSkinsData
    
    //get csgo polygon data
    chrome.storage.local.get('csgoPolygon',function(localStorageData){
        var csgoPolygon = localStorageData.csgoPolygon
    
    //build item array
    var itemArray = [];
    for (var i = 0; i < csgoPolygon.length; i++) {
        var item = { name : '', coins : '', price : '', ratio : '' };
        for(var j = 0; j < opSkins.length; j++){
            if(csgoPolygon[i].name == opSkins[j].name){
                item.name = opSkins[j].name;
                item.coins = csgoPolygon[i].price;
                item.price = opSkins[j].price;
                item.ratio = parseFloat(csgoPolygon[i].price / opSkins[j].price).toFixed(2);
                break;
            }
        }
        if(item.name != ''){
            if(ratioSortType == 'Above'){
                if(item.ratio > parseFloat(ratioSortValue)){
                    if(coins == 0 || item.coins < parseFloat(coins)){
                        itemArray.push(item);
                    }
                }
            }
            else if(ratioSortType == 'Below'){
                if(item.ratio < parseFloat(ratioSortValue)){
                    if(coins == 0 || item.coins < parseFloat(coins)){
                        itemArray.push(item);
                    }
                }
            } 
        }
    }
       

    //Sort Array
    if(sort == 'Ascending'){
        itemArray.sort((a, b) => (a.ratio - b.ratio));
    }
    else if(sort == 'Descending'){
        itemArray.sort((a, b) => (b.ratio - a.ratio));
    }
    //build table string
    var tblData = '';
    itemArray.forEach(function(element) {
        if(element.name != null ){
            var urlString = "https://opskins.com/?loc=shop_search&app=730_2&search_item=" + element.name + "&min=&max=&sort=lh&stat=&grade=&exterior=&type=";
            tblData += `<tr>
            <td class="col-xs-9"><a href='` + urlString + `' target='_blank'>` + element.name + `</a></td>
            <td class="col-xs-1">` + element.coins + `</td>
            <td class="col-xs-1">` + priceFormatter(element.price) + `</td>
            <td class="col-xs-1">` + element.ratio + `</td>
            </tr>`        
        }
    });
    //Populate table
    $('#tblComparison').html(tblData);
    $('a[href^="http"]').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        chrome.tabs.create({url: href, active: false});
    });  
   
});
});
}

function createAlertBox(alertMessage){
    var alertBoxHtml = `<div class="alert alert-success alert-dismissable">
                                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   
                                    <span id="homeAlertBoxText">` + alertMessage + `</span>  
                                </div>`;
    $('#homeAlertBoxContainer').html(alertBoxHtml);
}

/////////////////////////////////////////////////
//Any bootstrap and Jquery ui methods go here
/////////////////////////////////////////////////
/*
*/
$(document).ready(function () {
    $('.selectpicker').selectpicker();
    
    });
}









