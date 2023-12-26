$(function(){

// Search Stores by Categories
$(".stores-categories").on('change', function(){
    var $selectedStoreCategory = $.trim($(this).val());


    hideStores();


    


    $(".store-card").each(function(){
        var $storeCategory = $.trim($(this).find(".store-card__category").text());

        if($selectedStoreCategory == $storeCategory ) {
            $(this).show();
            
        }
        
    });

    
});


// Search Stores by Location
$(".stores-locations").on("change", function(){
    var $selectedStoreLocation = $(this).val();

    hideStores();

    $(".store-card").each(function(){
        var $storeLocation = $(this).find(".store-card__location").text().split("-")[0];


        if($selectedStoreLocation === $storeLocation ) {
            $(this).show();
        }
        if($selectedStoreLocation === 'All') {
            showStores();
        }
    });

});


// Search Stores by Alphabets
$(".store-alphabet-filters li").on('click', function(){
var $activeClasses, $selectedCharacter;
$activeClasses = "bg-primary text-white";

$(".store-alphabet-filters li").removeClass($activeClasses);
$(this).addClass($activeClasses);

$selectedCharacter = $.trim($(this).text());


hideStores();

$(".store-card").each(function(){
    var $storeNameFirstCharacter = $(this).find(".store-card__name").text().split(" ").map(name => name[0])[0];

    if($selectedCharacter === $storeNameFirstCharacter ) {
        $(this).show();
    }
    
});

});


});


function hideStores() {
    $(".store-card").hide();
}

function showStores() {
    $(".store-card").show();
}