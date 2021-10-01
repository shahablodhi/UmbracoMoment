////////////////////////////////Global Declaration Starts///////////////////
var elementClicked = "";
var childrenCount = $("#jsTransferer").data('childrencount');
var currUrl = $("#jsTransferer").data('url');
currUrl = (window.location.pathname + window.location.hash);
//incase we need it just remove the below statement
currUrl = "inactiveFunction";
if (currUrl === "/") {
    currUrl = "null"; //could be any value which dont matches to any node
}
////////////////////////////////Global Declaration Ends/////////////////////

////////////////////////////////function Section Starts/////////////////////
//closing all neighbors if there is open in a background menu
function closeNeighbours(e) {
    if (elementClicked === e.dataset.sample) {
        return false;
    }
    elementClicked = e.dataset.sample;
    $('.collapse.in').removeClass("in");
}
////////////////////////////////function Section Ends//////////////////////

////////////////////////////////Ready Starts///////////////////////////////
$(function () {
    //disabling orignal sticky menus
    $("li").removeClass("hoverTrigger");
    $(".menu-links > li:nth-of-type(" + childrenCount + ")").addClass("active");
    $('a[href*="' + currUrl + '"]').parent().addClass("active");

});
////////////////////////////////Ready Ends////////////////////////

////////////////////////////////Event Section Starts//////////////
$('a.custom-anchor').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            var gap = 70;
            if ($('.navbar-default').hasClass('no-sticky')) {
                gap = 0;
            }
            $('html,body').animate({
                scrollTop: target.offset().top - gap
            }, 900);

            return false;
        }
    }
});
////////////////////////////////Event Section Ends////////////////