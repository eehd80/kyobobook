$(document).ready(function () {
    $("ul.cover-list").hover(
        function () {
            $("#nav").addClass("hover");
        },
        function () {
            $("#nav").removeClass("hover");
        },
    );
    $(".list-wrapper").hover(
        function () {
            $("#nav").addClass("hover");
        },
        function () {
            $("#nav").removeClass("hover");
        },
    );
});
