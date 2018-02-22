// Initialize Firebase
var config = {
    apiKey: "AIzaSyCjrPNmOdaBc8cQVjVJb1e2JkuSRLvXGhA",
    authDomain: "dmaic-db196.firebaseapp.com",
    databaseURL: "https://dmaic-db196.firebaseio.com",
    projectId: "dmaic-db196",
    storageBucket: "dmaic-db196.appspot.com",
    messagingSenderId: "661466842340"
};
firebase.initializeApp(config);

var database = firebase.database();


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    console.log(result);
    return result;
}

var cr = findGetParameter("cr");
var medicion = findGetParameter("medicion");


var pathInicialObreros = "obreros/" + cr + "/" + medicion + "/";
var pathInicialActividades = "actividades/" + cr + "/" + medicion + "/";
var pathDatosMedicion = "mediciones/" + cr + "/" + medicion + "/";
var pathInicial = "mediciones-registro/" + cr + "/" + medicion + "/";

var duracion;
var HOUR;
var intervalo;
var isPaused = false;

// Inicializadores
$('select').material_select();


firebase.database().ref(pathDatosMedicion).on('value', function (data) {
    duracion = data.val().duracion;
    intervalo = Number(duracion) * 1000;//60000;
});



// dorp
var droppableOptions = {
    accept: ".element-drag",
    hoverClass: "cell-highlght",
    tolerance: "pointer",
    drop: function (event, ui) {
        $(this).addClass("cell-dropped").removeClass("col").removeClass("s2");

        //blancquear
        $(this).html("");

        // if ($("div",this).length === 0) {
        ////         $("#dvDest").html("");
        //       } 
        //else {
        //   $(this +" div:first").hide(200);


        //Añadir solo el texto 
        $(this).html($(ui.draggable).clone().text());
        $(this).attr("data-tipo", $(ui.draggable).attr("data-tipo"));
        // $(ui.draggable).clone().text().appendTo(this);
    }


}
$('[id^="cell-"]').each(function (index) {
    $(this).droppable(droppableOptions);


});

//$('[id^="drag-"]').each(function() {
$('.element-drag').each(function () {
    $(this).draggable({
        opacity: 0.7,
        cursorAt: { top: 15, left: 50 },//Default 15 50
        revert: true,
        helper: 'clone',
        //     helper: function(){
        //      $('#left').append('<div id="clone" class="cartridge">' + $(this).html() + '</div>');    
        //    // // Hack to append the cartridge to the body (visible above others divs), but still bellonging to the scrollable container  
        //     $("#clone").hide();
        //       setTimeout(function(){$('#clone').appendTo('body'); $("#clone").show();},1);
        //          return $("#clone");
        //        },
        appendTo: '.principal2',
        containment: '.principal2',
        scroll: true
    });
});

function hacerDraggable(element) {
    $(element).draggable({
        opacity: 0.7,
        cursorAt: { bottom: 0 },//Default 15 50
        revert: function(event, ui) {
            // on older version of jQuery use "draggable"
            // $(this).data("draggable")
            // on 2.x versions of jQuery use "ui-draggable"
            // $(this).data("ui-draggable")
            // $(this).data("uiDraggable").originalPosition = {
            //     top : 0,
            //     left : 0
            // };
            // return boolean
            return !event;
        },
        helper: 'clone',
        //     helper: function(){
        //      $('#left').append('<div id="clone" class="cartridge">' + $(this).html() + '</div>');    
        //    // // Hack to append the cartridge to the body (visible above others divs), but still bellonging to the scrollable container  
        //     $("#clone").hide();
        //       setTimeout(function(){$('#clone').appendTo('body'); $("#clone").show();},1);
        //          return $("#clone");
        //        },
        appendTo: '.principal2',
        containment: '.principal2',
        scroll: true
    });
}

// $('.item-footer').longpress(700,function(e) {

//     if ($(this).is('.ui-draggable-dragging')) {
//         return; // bar is being dragged
//     }else{

//         var x  = $(this).attr( "datatitulo" );
//         $('mdl_titulo_actividad').text(x);
//          $('#modal1').modal('open');}


// });


$('#grid-actividades').hammer({ domEvents: true, time: 1100 }).on("press", ".item-footer", function () {
    var x = $(this).attr("tittle");
    $('#mdl_titulo_actividad').text(x);
    $('#modal1').modal('open');


});

//Escribir item en la BD
function escribirItem(item, esUltimo) {
    var dataObrero = $(item).attr("data-obrero");
    var dataHora = $(item).attr("data-hora");
    var dataId = $(item).attr("data-id");
    var actividad = $(item).text();
    var tipoActividad = $(item).attr("data-tipo") === undefined ? "" : $(item).attr("data-tipo");

    firebase.database().ref(pathInicial + 'datos/' + dataId + '/').set({
        obrero: dataObrero,
        hora: dataHora,
        actividad: actividad,
        tipoActividad: tipoActividad

    });

    if(esUltimo){
        Materialize.toast('Guardado correctamente', 4000);
    }

}



$(function () {
    $('.modal').modal({
        ready: function (modal, trigger) {
            modal.find('input[name="nom"]').val(trigger.data('nom'))
        }
    });

    //MATERIALIZE Tooltip
    $('.tooltipped').tooltip({ delay: 50 });



    // var last_hour = $("#last_hour").text("").text(moment().format('HH:mm:ss'));
    // last_hour = $(last_hour).text();

    // var count = 3,
    //     first_row = $('#row_master');
    // while (count-- > 0) {
    //     // var last_hour = moment( $("#last_hour").html());
    //     //last_hour = $(last_hour).text();
    //     var clone = first_row.clone();
    //     last_hour = moment(last_hour, 'HH:mm:ss').add(1, 'minute').format("HH:mm");
    //     clone.appendTo('#t').removeClass("hide").find(".row-title").html(last_hour);
    //     clone.find('.ui-droppable').each(function () {
    //         $(this).droppable(droppableOptions);
    //     });

    // };

    // $('#btnAdd').click(function () {
    //     var count = 3,
    //         first_row = $('#row_master');
    //     while (count-- > 0) {
    //         // var last_hour = moment( $("#last_hour").html());
    //         //last_hour = $(last_hour).text();
    //         var clone = first_row.clone();
    //         last_hour = moment(last_hour, 'HH:mm:ss').add(1, 'minute').format("HH:mm");
    //         clone.appendTo('#t').removeClass("hide").find(".row-title").html(last_hour);
    //         clone.find('.ui-droppable').each(function () {
    //             $(this).droppable(droppableOptions);
    //         });
    //     };
    // });



    /* new */





    $('#btn_iniciar').on('click', function (e) {
        e.preventDefault();
        HOUR = moment().format('HH:mm:ss');
        AñadirFila();


        // Añadir intervalo 
        setInterval(function () {
            if (!isPaused) {
                AñadirFila();
                EscribirDB();
            }
        }, intervalo);

        EscribirDB();

    });




    $('.pause').on('click', function (e) {
        e.preventDefault();
        isPaused = true;

        //Mostrar el boton PLAY
        $('.play').show();
        // ocultar el boton PAUSE
        $('.pause').hide();
    });

    $('.play').on('click', function (e) {
        e.preventDefault();
        isPaused = false;

        // mostrar el boton PAUSE
        $('.pause').show();
        //ocultar el boton PLAY
        $('.play').hide();
    });




    $('#btn_row').click(function () {
        AñadirFila();

    });


    $('#btn_guardar').click(function () {

        //Mostrar Toast
        Materialize.toast('Guardando ...', 4000);

        var uidd = "";

        var grids = $('.grid');
        var lengthGrids = grids.length;
        grids.each(function (index, element) {


            uidd = $(this).attr("id"); //e.g. 13:00

            var gridsItems = $(this).find('.grid-item');
            var lengthGridsItems = gridsItems.length;
            gridsItems.each(function (index2, element2) {

                var esUltimo = false;
                //Verificar si es el ultimo elemento a guardar
                if (index === (lengthGrids - 1) && index2 === (lengthGridsItems - 1)) {
                    esUltimo= true;                    
                }
                //Nuevo escribir item                
                escribirItem(this, esUltimo);
                

                var uid2 = $(this).attr("id"); //e.g. PEON 1
                var tipo = $(this).attr("data-tipo");//e.g. TP

                var actividad = $(this).text().replace(/(\r\n|\n|\r)/gm, "").trim();
                // guardar
                firebase.database().ref(pathInicial + 'datos_hora/' + uidd + '/' + uid2).set(
                    actividad
                );

                firebase.database().ref(pathInicial + 'datos_peon/' + uid2 + '/' + uidd).set(
                    actividad
                );

                if (actividad !== "") {
                    firebase.database().ref(pathInicial + 'datos_actividad/' + tipo + '/' + uid2 + '/' + actividad + '/' + uidd).set(
                        true
                    );
                }
            });


        });



    });


    //añadir NUEVA COLUMNA
    $('#btn_nuevoObrero_añadir').click(function () {

        var nombre = $('#txt_nuevoObrero_nombre').val();
        //Añadir el nombre a la cabecera
        AñadirObrero(nombre);
        // $('#grid-cabecera').append('<div class="grid-item">' + nombre + '</div>');

        // //Añadir un grid-item a todos los grid
        // $('.grid,#grid-master').each(function (i, val) {

        //     var dataHora = $(val).attr('id');
        //     //clonar Grid-item
        //     var clone = $('#grid-item').clone()
        //         .removeClass('hide')
        //         .attr("id", nombre)//////////////// id BBORRAR
        //         .attr("data-obrero", nombre)
        //         .attr("data-hora", dataHora);

        //     //Hacer cada gri-item droppeable
        //     clone.droppable(droppableOptions);

        //     //Añadir el clon al grid
        //     $(this).append(clone);
        // });
    });


    function AñadirFila() {
        //Deshabilitar todos los dropables 
        $('.ui-droppable').droppable('disable')
        //Aumentar en uno la hora
        HOUR = moment(HOUR, 'HH:mm:ss').add(duracion, "seconds").format("HH:mm:ss");

        // Clonar la fila del MASTER
        var fila = $('#grid-master').clone().addClass("grid").attr("id", HOUR);

        //Establecer la celda Hora(grid-hora)
        fila.find('.grid-hora').html(HOUR);

        fila.find('.grid-item').each(function () {
            var dataObrero = $(this).attr("data-obrero");
            $(this).droppable(droppableOptions)
                .attr("data-hora", HOUR)
                .attr("data-id", HOUR + dataObrero);
        });

        // Añadir la fila  a la tabla
        $('#tabla').append(fila);
        fila.show('slow');
    }






});

function EscribirDB() {

    var uid = "";
    $('.grid').each(function () {

        uid = $(this).attr("id"); //e.g. 13:00

        $(this).find('.grid-item').each(function () {

            //Nuevo escribir
            escribirItem(this);

            var uid2 = $(this).attr("id"); //e.g. PEON 1

            var actividad = $(this).text().replace(/(\r\n|\n|\r)/gm, "").trim();
            // guardar
            firebase.database().ref(pathInicial + 'datos_hora/' + uid + '/' + uid2).set(
                actividad
            );

            firebase.database().ref(pathInicial + 'datos_peon/' + uid2 + '/' + uid).set(
                actividad
            );

        });


    });




};

//
firebase.database().ref(pathInicialActividades).on('child_added', function (data) {
    var clone = $('#master_actividad').clone().removeClass("hide");
    clone.html(data.val().abreviatura);
    clone.attr("data-tooltip", data.val().nombre);
    clone.attr("data-tipo", data.val().TipoActividad);
    clone.tooltip({ delay: 50 });
    hacerDraggable(clone)
    $('#grid-actividades').append(clone);
});


//leer obreors
firebase.database().ref(pathInicialObreros).on('child_added', function (data) {
    AñadirObrero(data.val().nombre)
});

function AñadirObrero(nombre) {

    $('#grid-cabecera').append('<div class="grid-item">' + nombre + '</div>');

    //Añadir un grid-item a todos los grid
    $('.grid,#grid-master').each(function (i, val) {

        var dataHora = $(val).attr('id');
        //clonar Grid-item
        var clone = $('#grid-item').clone()
            .removeClass('hide')
            .attr("id", nombre)//////////////// id BBORRAR
            .attr("data-obrero", nombre)
            .attr("data-hora", dataHora)
            .attr("data-id", dataHora + nombre);

        //Hacer cada gri-item droppeable
        clone.droppable(droppableOptions);

        //Añadir el clon al grid
        $(this).append(clone);
    });
}


$('#tabla').hammer({ domEvents: true, time: 100 }).on("press", ".ui-droppable", function (e) {

    var target = $(e.target);
    target.html("");
    target.removeAttr("data-tipo");
    target.removeClass("cell-dropped");
    //$('#modal1').modal('open');


});




//Actividad
$('#btn_anadirActividad').on('click', function () {
    var nombre = $('#txt_nombreActividad').val();
    var abrev = $('#txt_abrevActividad').val();
    var TipoActividad = $('#slc_tipoActividad').val();
    añadirActividad(nombre, abrev, TipoActividad);

    //blanquear    
    $('.inputActividad').val("");
    $('#slc_tipoActividad').val("");
});

function añadirActividad(nombre, abrev, TipoActividad) {
    firebase.database().ref(pathInicialActividades).push({
        nombre: nombre,
        abreviatura: abrev,
        TipoActividad: TipoActividad
    });
}

