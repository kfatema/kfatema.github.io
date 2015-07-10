//if slide = false, timer will be disabled
var slide = true;
//stops slider from transitioning too fast
var sliding = false;

$(document).ready(function () {
    $(".nav-mobile").html($(".nav-main").html());
    $(".nav-trigger span").click(function () {
        if ($("nav.nav-mobile ul").hasClass("expanded")) {
            $("nav.nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
            $(this).removeClass("open");
        } else {
            $("nav.nav-mobile ul").addClass("expanded").slideDown(250);
            $(this).addClass("open");
        }
    });

    $(".nav-mobile li").click(function () {
        if ($("nav.nav-mobile ul").hasClass("expanded")) {
            $("nav.nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
            $(".nav-trigger span").removeClass("open");
        }
    });

    //store the length of the slides
    var maxSlides = 3;
    //set current slide to the active one
    var currentSlide = $(".slides .active").index() + 1;
    //timer time
    var SLIDE_TIMER = 2000;
    //loop through each slide and hide the non active ones
    $(".slide").each(function () {
        //don't hide the active slide
        if (!$(this).hasClass("active")) {
            $(this).hide();
        }
    });
    //add listener for the left arrow
    $(".left-arrow").click(function () {
        slide = false;
        previousSlide();
        slide = true;
    });
    //add listener for the right arrow
    $(".right-arrow").click(function () {
        slide = false;
        nextSlide();
        slide = true;
    });
    //show slider
    $(".slider").fadeIn(250);
    //start timer
    window.setInterval(function () {
        if (slide)
            nextSlide();
    }, SLIDE_TIMER);

    //gets index of next slide
    function nextSlide() {
        if (!sliding) {
            if (currentSlide >= maxSlides) {
                currentSlide = 1;
            } else {
                currentSlide++;
            }
            goToIndex(currentSlide);
        }
    }

    //gets index of previous slide
    function previousSlide() {
        if (!sliding) {
            if (currentSlide <= 1) {
                currentSlide = maxSlides;
            } else {
                currentSlide--;
            }
            goToIndex(currentSlide);
        }
    }
});

//goes to next slide provided the index
function goToIndex(index) {
    var slidenumber = index - 1;
    //loops through slides, shows selected one
    sliding = true;
    $(".slide").each(function () {
        //if the slide has the same index as the tab show, otherwise hide
        if ($(this).index() == slidenumber) {
            $(this).addClass("absolute-slide active").fadeIn(500, function () {
                sliding = false;
                $(this).removeClass("absolute-slide");
            })
        }
        //remove class and fade out other slides
        else {
            $(this).removeClass("absolute-slide active").fadeOut(500);
        }
    });
};
