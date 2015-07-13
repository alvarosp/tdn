// ==UserScript==
// @name         Calendario Actividades TDN
// @namespace    http://www.jornadas-tdn.org
// @version      1.0.0
// @description  Este script permite crear tu propio calendario con tus actividades favoritas en las TDN, para que te resulte más sencillo organizarte.
// @author       beholderalv
// @match        *://www.jornadas-tdn.org/*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==

$(function() {
    var days = {'jueves': 6, 'viernes': 7, 'sábado': 8, 'domingo': 9, 'lunes': 10};
    var path = window.location.pathname.split('/');
    var actividades_sort = [];
    if (path[2] === 'a4'){//Horarios
        addStarsInHorarios();
    } else if(path[1] === 'actividad'){//Una actividad en concreto
        addBootstrap();
        addMisActividades();
        addStarinActivity();
    } else if(path[1] === 'actividades'){//Lista de actividades
        addBootstrap();
        addMisActividades();
        addStarsInLista();
    } else {
        return;
    }
    function addBootstrap(){
        $('head').prepend( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css') );
    }
    function addStarinActivity(){
        var id = $('#tdn_modulos_evento').children().attr('id').split('_')[2];
        var data = localStorage.getItem(id);
        if (data){
            $('.banda_superior h2').append('<div class="star">&#9733;</div>');
        } else {
            $('.banda_superior h2').append('<div class="star">&#9734;</div>');
        }
        $('.star').css({
            'color':'yellow',
            'float':'right',
            'font-size':'larger',
            'margin-right':'5px',
            'cursor':'pointer'});
        $('.star').click(function(){
            var id = $('#tdn_modulos_evento').children().attr('id').split('_')[2];
            var data = localStorage.getItem(id);
            if (data){
                localStorage.removeItem(id);
                $(this).html('&#9734;');
            } else {
                var tmp_date = $(this).parent().parent().children('.tdn_modulos_horarios').children('ul').children('li').text().split(' ');
                var event = {
                    'id': id,
                    'title': $('.banda_superior h2').text().slice(0,-1),
                    'day': days[tmp_date[6].toLowerCase()] + " " + tmp_date[6].toLowerCase(),
                    'hour': tmp_date[9]+"-"+tmp_date[11],
                    'type': $('#tdn_modulos_titulo_cabecera a:nth-child(2)').text(),
                    'link': window.location.pathname};
                console.log(event);
                localStorage.setItem(id,JSON.stringify(event));
                $(this).html('&#9733;');
            }
        });
    }
    function addStarsInHorarios(){
        $('#tdn_listado_actividades > table > thead > tr').prepend('<th>&#9733;</th>');
        $('#tdn_listado_actividades > table > tbody > tr').each(function(){
            var id = $(this).children('.actividad').children('a').attr('href').split('/')[2];
            var data = localStorage.getItem(id);
            if (data){
                $(this).prepend('<td class="star">&#9733;</td>');
            } else {
                $(this).prepend('<td class="star">&#9734;</td>');
            }
        });
        $('.star').css({
            'cursor':'pointer'});
        $('.star').click(function(){
            var id = $(this).parent().children('.actividad').children('a').attr('href').split('/')[2]
            var data = localStorage.getItem(id);
            if (data){
                localStorage.removeItem(id);
                $(this).html('&#9734;');
            } else {
                var tmp_day = $('h1').text().split(" ")[5];
                var event = {
                    'id': id,
                    'title': $(this).parent().children('.actividad').children('a').text(),
                    'day': days[tmp_day] + " " + tmp_day,
                    'hour': $(this).parent().children('.inicio').text()+"-"+$(this).parent().children('.final').text(),
                    'type': $(this).parent().children('.tipo').text(),
                    'link': $(this).parent().children('.actividad').children('a').attr('href')};
                console.log(event);
                localStorage.setItem(id,JSON.stringify(event));
                $(this).html('&#9733;');
            }
        });
    }
    function addMisActividades(){
        $('#tdn_modulos_menu').append('<span class="tdn_modulos_opcion" id="mis_actividades"><a href="#">Mis actividades</a></span>');
        $('#tdn_modulos_menu span a').css('min-height','35px');
        $('body').append('<div id="overlay"><div id="modal"><div class="modal-content"><div class="modal-header"><h1 class="modal-title">Mis actividades</h1></div><div class="modal-body"><table id="actividades" class="table"></table><input id="button_remove" type="button" class="btn btn-default" value="Eliminar todas"/><a id="download_csv" href="#" download="mis_actividades.csv">Descargar CSV</a></div></div></div>');
        $('#button_remove').click(function(){
            for (var i = localStorage.length - 1; i >= 0; i--) {
                localStorage.removeItem(localStorage.key(i));
            }
            $('.star').html('&#9734;');
            $('#actividades').html('');
        });
        $('#download_csv').css({
            'margin': '5px'});
        $('#download_csv').click(function(){
            var data = "Día,Hora,Tipo,Titulo,URL";
            for (var i = 0; i < actividades_sort.length; i++) {
                var tmp = actividades_sort[i];
                data += '\n"'+tmp.day+'",'+tmp.hour+',"'+tmp.type+'","'+tmp.title+'","'+window.location.host+tmp.link+'"';
            }
            console.log(data);
            this.href = "data:application/csv;charset=UTF-8," + encodeURIComponent(data);
        });
        $('.modal-title').css({
            'font-size': '3em',
            'text-align': 'center'});
        $('.modal-content').css({
            'height': '500px',
            'overflow':'scroll'});
        $('#overlay').css({
            'position':'fixed',
            'top': '0',
            'left': '0',
            'width':'100%',
            'height':'100%',
            'z-index':'99',
            'background-color':'rgba(0,0,0,0.5)'}).hide();
        $('#modal').css({
            'position':'absolute',
            'width':'800px',
            'top':'50%',
            'left':'50%',
            'margin-top':'-250px',
            'margin-left':'-400px'});
        $('#mis_actividades').click(function(){
            $('#actividades').html('');
            $('#actividades').append('<tr><th>Día</th><th>Hora</th><th>Tipo</th><th>Actividad</th></tr>');
            actividades_sort = [];
            for (var i = localStorage.length - 1; i >= 0; i--) {
                actividades_sort.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
            actividades_sort.sort(compare);
            for (var i = 0; i < actividades_sort.length; i++) {
                var tmp = actividades_sort[i];
                $('#actividades').append('<tr id="'+tmp.id+'"><td>'+tmp.day+'</td><td>'+tmp.hour+'</td><td>'+tmp.type+'</td><td><a href="'+tmp.link+'">'+tmp.title+'</a></td></tr>');
            }
            $('#overlay').show();
        });
        $('#modal').click(function(e){
            e.stopPropagation();
        });
        $('#overlay').click(function(){
            $('#overlay').hide();
        });
    }
    function addStarsInLista(){
        $('.tdn_modulos_evento_contenido h3').each(function(){
            var id = $(this).parent().parent().attr('id').split('_')[2];
            var data = localStorage.getItem(id);
            if (data){
                $(this).append('<div class="star">&#9733;</div>');
            } else {
                $(this).append('<div class="star">&#9734;</div>');
            }
        });
        $('.star').css({
            'color':'yellow',
            'float':'right',
            'font-size':'larger',
            'margin-right':'5px',
            'cursor':'pointer'});
        $('.star').click(function(){
            var id = $(this).parent().parent().parent().attr('id').split('_')[2];
            var data = localStorage.getItem(id);
            if (data){
                localStorage.removeItem(id);
                $(this).html('&#9734;');
            } else {
                var tmp_date = $(this).parent().parent().children('.contenedor_horarios').children('.horario_actividad').text().split(' ');
                var event = {
                    'id': id,
                    'title': $(this).parent().children('a').text(),
                    'day': days[tmp_date[0]] + " " + tmp_date[0],
                    'hour': tmp_date[1].slice(0, - 1),
                    'type': $(this).parent().parent().children('.tipo_evento').text().replace(/\s+/g," "),
                    'link': $(this).parent().children('a').attr('href')};
                localStorage.setItem(id,JSON.stringify(event));
                $(this).html('&#9733;');
            }
        });
    }
    function compare(a,b) {
        if (a.day < b.day)
            return -1;
        if (a.day > b.day)
            return 1;
        if (a.hour < b.hour)
            return -1;
        if (a.hour > b.hour)
            return 1;
        return 0;
    }
});