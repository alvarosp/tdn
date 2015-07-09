// ==UserScript==
// @name         Calendario Actividades TDN
// @namespace    http://www.jornadas-tdn.org
// @version      0.3
// @description  Este script permite crear tu propio calendario con tus actividades favoritas en las TDN, para que te resulte más sencillo organizarte.
// @author       beholderalv
// @match        http://*/actividades/*
// @grant        none
// ==/UserScript==

$(function() {
    var days = {'jueves': 6, 'viernes': 7, 'sábado': 8, 'domingo': 9, 'lunes': 10};
    $('head').prepend( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css') );
    $('.tdn_modulos_evento_contenido h3').each(function(){
        var id = $(this).parent().parent().attr('id').split('_')[2];
        var data = localStorage.getItem(id);
        if (data){
            $(this).append('<div class="star">&#9733;</div>');
        } else {
            $(this).append('<div class="star">&#9734;</div>');
        }
    });
    $('#tdn_modulos_menu').append('<span class="tdn_modulos_opcion" id="mis_actividades"><a href="#">Mis actividades</a></span>');
    $('body').append('<div id="overlay"><div id="modal"><div class="modal-content"><div class="modal-header"><h1 class="modal-title">Mis actividades</h1></div><div class="modal-body"><table id="actividades" class="table"></table><input id="button_remove" type="button" class="btn btn-default" value="Eliminar todas"/></div></div></div>');
    $('#button_remove').click(function(){
        for (var i = localStorage.length - 1; i >= 0; i--) {
            localStorage.removeItem(localStorage.key(i));
        }
        $('.star').html('&#9734;');
        $('#actividades').html('');
    });
    $('.modal-title').css({
        'font-size': '3em',
        'text-align': 'center'});
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
        'max-height':'80%',
        'overflow':'scroll',
        'top':'50%',
        'left':'50%',
        'margin-top':'-200px',
        'margin-left':'-400px'});
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
                'type': $(this).parent().parent().children('.tipo_evento').text(),
                'link': $(this).parent().children('a').attr('href')};
            localStorage.setItem(id,JSON.stringify(event));
            $(this).html('&#9733;');
        }
    });
    $('#mis_actividades').click(function(){
        $('#actividades').html('');
        $('#actividades').append('<tr><th>Día</th><th>Hora</th><th>Tipo</th><th>Actividad</th></tr>');
        var actividades = [];
        for (var i = localStorage.length - 1; i >= 0; i--) {
            actividades.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        actividades.sort(compare);
        for (var i = 0; i < actividades.length; i++) {
            var tmp = actividades[i];
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