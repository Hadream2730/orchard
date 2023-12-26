$(function(){

var $search = getUrlParameter('terms');

$(".search-result-text").text($search);
$(".search-input").val($search);


$(".store-card__name").each(function(){
    var $currentText = $(this).text();

    if($currentText.search($search) > -1) {
        hideStores();
        $(this).closest('.store-card').show();
    }
});

$(".store-card__category").each(function(){
    var $currentText = $(this).text();

    if($currentText.search($search) > -1) {
        $(this).closest('.store-card').show();
    }
});

});


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
  
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
  };


  
function hideStores() {
    $(".store-card").hide();
}

function showStores() {
    $(".store-card").show();
}