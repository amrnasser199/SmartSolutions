export function LoadTabs()
{
    'use strict';
    // Deal With Tabs
    $('.tab-switch li').click(function () {
        // Add Selected Class To Active Link
        $(this).addClass('selected').siblings().removeClass('selected');
        // Hide All Divs
        $('.tabs-section .tabs-content > div').hide();
        // Show Div Connected With This Link
        $($(this).data('class')).show();
    });
    $('.carousel').carousel({
        interval: true,
        direction: "left",

    });
    

    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    })
}



export function scrollsection() {
    let listOfLink = Array.from(document.querySelectorAll(".navbar-nav li a"));
    listOfLink.map((li) => {
        li.addEventListener("click", (e) => {
            e.preventDefault()
            //document.querySelector(`#${li.getAttribute("data-scroll")}`).scrollIntoView({
            //    behavior: 'smooth',
            //    alignToTop: true
            //});

            window.scrollTo({
                top: document.querySelector(`#${li.getAttribute("data-scroll")}`).offsetTop + 40 ,
                left: 0,
                behavior: 'smooth',
                speed:10000
            });

            listOfLink.map((lis) => {
                lis.classList.remove("active")
            })

            li.classList.add("active");
            document.querySelector(".navbar-collapse").classList.remove("show")
        })
    })
}
//function bgnav() {
//    if (document.querySelector(".sliderview") == null) return;
//    document.addEventListener('scroll', () => {
//        if (document.querySelector(".sliderview") == null) return;
//        if (document.querySelector(".sliderview").clientHeight-300 <= window.scrollY) {
//            document.querySelector("nav").classList.add("bg-dark")
//        } else {
//            document.querySelector("nav").classList.remove("bg-dark")

//        }
//    })
//}
//bgnav()



export function scrollActive() {
    if (document.querySelector(".sliderview") == null) return;
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#mainnavbar',
        offset: 50
    })
}

