chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){ 
        var site = location.hostname;
        //bets.gg
        if(site == 'bets.gg'){
            //alert('bets.gg')
            $('.store-inner > tm ').each(function(){
                //declare item
                var item = {name : '', price : ''};

                //parse data
                var name = $(this).find('n').html();
                var wear = $(this).find('wr').html();
                var statTrak = (wear.includes("<st>ST</st>"));

                //check if StatTrak and set item name 
                if(statTrak){
                    if(name.includes('★'))
                    {
                        name = name.replace('★ ','');
                        item.name = '★ ';
                        item.name += 'StatTrak™ ';
                        item.name += name;
                    }
                    else{
                        item.name = 'StatTrak™ ';
                        item.name += name;
                    }
                }
                else{
                    item.name += name;
                }
                                
                //add item wear to name
                if(wear.includes("FN")){
                    item.name += ' (Factory New)';
                }
                else if(wear.includes("MW")){
                    item.name += ' (Minimal Wear)';
                }
                else if(wear.includes("FT")){
                    item.name += ' (Field-Tested)';
                }
                else if(wear.includes("WW")){
                    item.name += ' (Well-Worn)';
                }
                else if(wear.includes("BS")){
                    item.name += ' (Battle-Scarred)';
                }
                //set item price
                item.price = $(this).attr('data-p');
                console.log(item.name + ' : ' + item.price)
            });
        }
        //CsgoDouble && CsgoPolygon
        else{
            //alert('other');
            var itemsList = new Array([]);
            $('.reals > div').each(function(){
                if($.inArray($(this).attr("data-name"), $.map(itemsList, function(v) { return v.name; })) === -1)
                {
                    var aLength = (itemsList.length);
                    var a = $(this).attr("data-price");
                    var b =  $(this).attr("data-bot");
                    var n = $(this).attr("data-name");
                    itemsList[aLength] = {
                        name : n,
                        price : a,
                        bot : b,
                        total : 1
                    };
                }
                else
                {
                    var y = ($.inArray($(this).attr("data-name"),$.map(itemsList, function(v) { return v.name; }))) + 1;
                    itemsList[y].total += 1;
                }
            });
            sendResponse(itemsList);
        }
});





//
//fun
//
/*
function getFont() {
  var fonts = [
    "calibri"
    , "wingdings"
    , "webdings"
    , "times new roman"
  ];
  return fonts[Math.floor((Math.random() * fonts.length) + 1)];
};
function getColour() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function MessStuffUp() {
    var x = $('*');


    $.each(x, function (index, value) {
        $(this).css({'font-family' : getFont(), 'colour' : getColour(), 'backgroundColor' : getColour() });
    });
}



$( "body" ).on( "mousemove", function(){
    MessStuffUp();
} );
   
*/
