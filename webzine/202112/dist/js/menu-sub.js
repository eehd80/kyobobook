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

    var current_chapter = "Special Theme";

    if (current_chapter == "Special Theme") {
        $("ul.cover-list li").removeClass("current-chapter");
        $("ul.cover-list li:first-child").addClass("current-chapter");
    } else if (current_chapter == "미래를 향하다") {
        $("ul.cover-list li").removeClass("current-chapter");
        $("ul.cover-list li:nth-child(2)").addClass("current-chapter");
    } else {
        $("ul.cover-list li").removeClass("current-chapter");
        $("ul.cover-list li:nth-child(3)").addClass("current-chapter");
    }
});
