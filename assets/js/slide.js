
$(document).ready(function () {
    if ($('section.slide').length) {

        $.getJSON('./Arquivos/JSON/slide.json', function (response) {
            var data = response[0];
            var setQuantidade = data.imagens.length;
            if (setQuantidade > 0) {
                var onPath = './Arquivos/Imagens/Slide/';
                for (var i = 0; i < setQuantidade; i++) {

                    $('section.slide').find('#list-slide')
                        .append(
                            $('<div><div/>')
                                .addClass(slide.itemByClass)
                                .attr('id', 'slide' + i)
                                .css('background', 'url(' + onPath + data.imagens[i] + ') no-repeat center center')
                        );
                }
                slide.init();
            }
        });
    }
    $('header .icon-menu').click(function () {
        $('nav.navbar').slideToggle(200);
    });
});


$(document).on('click', '.dot', function () {
    slide.autoPlay = false;
    slide.dotAlt($(this).data('slide'));
});

$(document).on('click', '.nav-next', function () {
    slide.autoPlay = false;
    slide.next();
});

$(document).on('click', '.nav-prev', function () {
    slide.autoPlay = false;
    slide.prev();
});


var slide = {
    slides: null,
    onClassActive: 'active-slide',
    itemByClass: 'item-slide',
    onNav: 'navigation-slide',
    time: 6000,
    autoPlay: true,
    qtdSlides: 0,
    init: function () {
        this.slides = $('.' + this.itemByClass);
        this.qtdSlides = this.slides.length;
        this.play();
        this.doNavigate();
    },
    play: function () {
        var that = this;
        $(this.slides[0]).addClass(this.onClassActive);
        setInterval(function () {
            if (that.autoPlay) {
                that.next();
            }
        }, this.time);
    },
    prev: function () {
        var prevElement = $('.' + this.itemByClass).filter('.' + this.onClassActive).prev();
        if (prevElement[0] == null) {
            prevElement = $(this.slides[this.qtdSlides - 1]);
        }
        $('.' + this.itemByClass).filter('.' + this.onClassActive).hide().removeClass(this.onClassActive);
        prevElement.addClass(this.onClassActive).show();
        this.checkDot($(prevElement).attr('id'));
    },
    next: function () {
        var nextElement = $('.' + this.itemByClass).filter('.' + this.onClassActive).next();
        if (nextElement[0] == null) {
            nextElement = $(this.slides[0]);
        }
        $('.' + this.itemByClass).filter('.' + this.onClassActive).hide().removeClass(this.onClassActive);
        nextElement.addClass(this.onClassActive).show();
        this.checkDot($(nextElement).attr('id'));
    },
    checkDot: function (id) {
        $('#' + this.onNav)
            .find('.dot')
            .removeClass(this.onClassActive)
            .filter('[data-slide="#' + id + '"]')
            .addClass(this.onClassActive);
    },
    doNavigate: function () {
        var that = this;
        $('#' + this.onNav)
            .append(
                $('<div></div>')
                    .addClass('nav-dots')
            )
            .append(
                $('<div></div>')
                    .text('<')
                    .addClass('nav-prev')
            )
            .append(
                $('<div></div>')
                    .text('>')
                    .addClass('nav-next')
            );
        for (var i = 0; i < that.qtdSlides; i++) {
            $('#' + this.onNav).find('.nav-dots').append(
                $('<div></div>')
                    .addClass('dot')
                    .attr('data-slide', '#slide' + i)
            )
        }
        $($('#' + this.onNav).find('.dot')[0]).addClass(this.onClassActive);
    },
    dotAlt: function (id) {
        this.checkDot(id.replace('#', ''));
        $('.' + this.itemByClass).hide().removeClass(this.onClassActive);
        $('.' + this.itemByClass).filter(id).show().addClass(this.onClassActive);
    }
};
