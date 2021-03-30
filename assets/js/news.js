$(document).ready(function () {
    if ($('section.editorias').length) {
        news.init();
        $('#change-order').change(function () {
            if ($(this).val() == '1') {
                news.newsByDate();
            } else if ($(this).val() == '2') {
                news.newsByName()
            }
        });
        $('#filter-by').change(function () {
            news.filter($(this).val());
        });
    }
});

var news = {
    imagePath: 'Arquivos/Imagens/Notícias/',
    news: [],
    newsFiltered: [],
    idFilter: '',
    init: function () {
        var that = this;
        $.getJSON('./Arquivos/JSON/noticias.json', function (response) {
            that.trataNews(response[0].Editorias);
            that.select(response[0].Editorias);
            that.newsByDate();
        });
    },
    trataNews: function (news) {
        var that = this;
        news.forEach(function (editoria) {
            editoria['Notícias'].map(function (news) {
                news.Editoria = editoria.Editoria;
                news.Id = editoria.Id;
                that.news.push(news);
            });
        });
    },
    select: function (editorias) {
        editorias.forEach(function (editoria) {
            $('#filter-by')
                .append(
                    $('<option></option>')
                        .text(editoria['Editoria'].toUpperCase())
                        .val(editoria['Id'])
                );
        });
    },
    newsByName: function () {
        this.news = this.news.sort(function (a, b) {
            if (a['Título'] < b['Título']) {
                return -1;
            } else if (b['Título'] < a['Título']) {
                return 1;
            } else {
                return 0;
            }
        });
        this.doList();
    },
    newsByDate: function () {
        this.news = this.news.sort(function (a, b) {
            var dateA = new Date(a['Data de publicação'].split('-').reverse());
            var dateB = new Date(b['Data de publicação'].split('-').reverse());
            if (dateA.getTime() > dateB.getTime()) {
                return -1;
            } else if (dateB.getTime() > dateA.getTime()) {
                return 1;
            } else {
                return 0;
            }
        });
        this.doList();
    },
    doList: function () {
        $('#list-news').html('');
        var that = this;
        that.news.forEach(function (news) {
            var className = news.Id == that.idFilter || that.idFilter == '' ? 'visible' : '';
            $('#list-news').append(
                $('<li></li>')
                    .addClass(className)
                    .attr('data-category', news.Id)
                    .append(
                        $('<div></div>')
                            .addClass('box-news')
                            .append(
                                $('<span></span>')
                                    .addClass('date')
                                    .text(news['Data de publicação'].replace(/-/g, '/'))
                            )
                            .append(
                                $('<h3></h3>')
                                    .text(news.Editoria)
                            )
                            .append(
                                $('<img/>')
                                    .attr('src', that.imagePath + news['Foto'])
                            )
                            .append(
                                $('<h4></h4>')
                                    .text(news['Título'])
                            )
                            .append(
                                $('<p></p>')
                                    .text(news['Texto'])
                            )
                            .append(
                                $('<a></a>')
                                    .text('Saiba mais')
                                    .attr('href', '#')
                            )
                    )
            );
        });
        that.doMargin();
    },
    filter: function (id) {
        this.idFilter = id;
        $('#list-news').find('li').addClass('visible');
        if (id != '') {
            $('#list-news').find('li').not('[data-category="' + id + '"]').removeClass('visible');
        }
        this.doMargin();
    },
    doMargin: function () {
        $('#list-news').find('li').removeClass('last-news');
        $('#list-news').find('li.visible').filter(function (i) {
            if (i > 0 && (i + 1) % 3 == 0) {
                $(this).addClass('last-news');
            }
        });
    }
}