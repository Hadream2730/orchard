$(document).ready(function () {
    var url = window.location.href;
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    url = url.substr(url.lastIndexOf("/") + 1);
    var pageName = url.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
    if (url == '') {
        url = '/';
    } else { $(document).prop('title', pageName + " | The Woodleigh Mall"); }

    $('.menu li').each(function () {
        var href = $(this).find('a').attr('href').replace("/", "");
        if (url == href) {
            $(this).find('a').addClass('active');
        }
    });
});

function search() {
    var query = $("#input-search").val();
    window.location = "/search?terms=" + query;
}
$("#btn-search").click(function () {
    search();
});

$(document).on("keypress", "#input-search", function (e) {
    if (e.which == 13) {
        search();
        return false;
    }
});

//if ($(".promotions-section").length > 0 && $(".promotions-section .row").first().html().trim().length == 0) {
//    $(".promotions-section .container").append('<p class="mt-4 fs-4 text-center">Coming Soon...</p>');
//}

//if ($(".event-section").length > 0 && $(".event-section .row").first().html().trim().length == 0) {
//    $(".event-section .container").append('<p class="mt-4 fs-4 text-center">Coming Soon...</p>');
//}


