$(document).ready(function () {
    $(".customer-logos").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });


    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });


    var url = $("#cartoonVideo").attr('src');


    $("#exampleModal").on('hide.bs.modal', function () {
        $("#cartoonVideo").attr('src', '');
    });
    $("#exampleModal").on('show.bs.modal', function () {
        $("#cartoonVideo").attr('src', url);
    });


    // $(document).on('click', function() {

    //   $('.navbar-collapse').hasClass('show');
    //   if($('body').on('click', function(){

    //   }));


    // });


    $(".filter-button").click(function () {
        var value = $(this).attr("data-filter");

        if (value == "all") {
            $(".filter").show("1000");
        } else {
            $(".filter")
                .not("." + value)
                .hide("3000");
            $(".filter")
                .filter("." + value)
                .show("3000");
        }
    });


    $(".filter-button").click(function () {
        $(".filter-button").removeClass("filterActive");
        // $(".tab").addClass("filterActive"); // instead of this do the below
        $(this).addClass("filterActive");
    });


    $(this).addClass("active");

    if ($(window).width() < 1340) {
        $("#navbar").removeClass("MainnavbarMenu");
    }

    $("#navbar").addClass("#cstmBgwhite");

    function openNav() {
        document.getElementById("mySidenav").style.width = "100%";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }


    window.document.onkeydown = function (e) {
        if (!e) {
            e = event;
        }
        if (e.keyCode == 27) {
            lightbox_close();
        }
    };

    function lightbox_open() {
        var lightBoxVideo = document.getElementById("VisaChipCardVideo");
        //   window.scrollTo(0, 0, 1);
        document.getElementById("light").style.display = "block";
        document.getElementById("fade").style.display = "block";
        lightBoxVideo.play();
    }

    function lightbox_close() {
        var lightBoxVideo = document.getElementById("VisaChipCardVideo");
        document.getElementById("light").style.display = "none";
        document.getElementById("fade").style.display = "none";
        lightBoxVideo.pause();
    }


    var itemSelector = '.grid-item';

    var $container = $('#container').isotope({
        itemSelector: itemSelector,
        masonry: {
            columnWidth: itemSelector,
            isFitWidth: true
        }
    });

//Ascending order
    var responsiveIsotope = [
        [480, 7],
        [720, 10]
    ];

    var itemsPerPageDefault = 12;
    var itemsPerPage = defineItemsPerPage();
    var currentNumberPages = 1;
    var currentPage = 1;
    var currentFilter = '*';
    var filterAtribute = 'data-filter';
    var pageAtribute = 'data-page';
    var pagerClass = 'isotope-pager';

    function changeFilter(selector) {
        $container.isotope({
            filter: selector
        });
    }


    function goToPage(n) {
        currentPage = n;

        var selector = itemSelector;
        selector += (currentFilter != '*') ? '[' + filterAtribute + '="' + currentFilter + '"]' : '';
        selector += '[' + pageAtribute + '="' + currentPage + '"]';

        changeFilter(selector);
    }

    function defineItemsPerPage() {
        var pages = itemsPerPageDefault;

        for (var i = 0; i < responsiveIsotope.length; i++) {
            if ($(window).width() <= responsiveIsotope[i][0]) {
                pages = responsiveIsotope[i][1];
                break;
            }


        }

        return pages;
    }

    function setPagination() {

        var SettingsPagesOnItems = function () {

            var itemsLength = $container.children(itemSelector).length;

            var pages = Math.ceil(itemsLength / itemsPerPage);
            var item = 1;
            var page = 1;
            var selector = itemSelector;
            selector += (currentFilter != '*') ? '[' + filterAtribute + '="' + currentFilter + '"]' : '';

            $container.children(selector).each(function () {
                if (item > itemsPerPage) {
                    page++;
                    item = 1;
                }
                $(this).attr(pageAtribute, page);
                item++;
            });

            currentNumberPages = page;

        }();

        var CreatePagers = function () {

            var $isotopePager = ($('.' + pagerClass).length == 0) ? $('<div class="' + pagerClass + '"></div>') : $('.' + pagerClass);

            $isotopePager.html('');

            for (var i = 0; i < currentNumberPages; i++) {
                var $pager = $('<a href="javascript:void(0);" class="pager" ' + pageAtribute + '="' + (i + 1) + '"></a>');
                $pager.html(i + 1);

                $pager.click(function () {
                    var page = $(this).eq(0).attr(pageAtribute);
                    goToPage(page);
                });

                $pager.appendTo($isotopePager);
            }

            $container.after($isotopePager);

        }();

    }

    setPagination();
    goToPage(1);

//Adicionando Event de Click para as categorias
    $('.filters a').click(function () {
        var filter = $(this).attr(filterAtribute);
        currentFilter = filter;

        setPagination();
        goToPage(1);


    });

//Evento Responsivo
    $(window).resize(function () {
        itemsPerPage = defineItemsPerPage();
        setPagination();
    });


// filter items on button click
    $('.filter-button-group').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter');
        $('.grid').isotope({filter: filterValue});
        $('.filter-button-group li').removeClass('active');
        $(this).addClass('active');
    });


// filter items on button click
    $('.isotope-pager').on('click', 'a', function () {
        var filterValue = $(this).attr('data-page');

        $('.isotope-pager a').removeClass('active');
        $(this).addClass('active');
    });
});