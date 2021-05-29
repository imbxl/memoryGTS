//  Declare SQL Query for SQLite

//(name, version, descrition, db_size)

var seleccionar_todo = "SELECT * FROM MisDatos";
var insertar_dato = "INSERT INTO MisDatos (nombre, altura, peso, edad, sexo, mano) VALUES (?, ?, ?, ?, ?, ?)";
var actualizar = "UPDATE MisDatos SET nombre = ?, altura = ?, peso = ?, edad = ?, sexo = ?, mano = ? WHERE id=?";
//var db = openDatabase("Memory", "1.0", "Pala Memory", 10 * 1024 * 1024); // Open SQLite Database 10MB
var db = null; // Open SQLite Database 10MB

var dataset;
var DataType;

var nombre;
var altura;
var peso;
var edad;
var sexo;
var mano;
var id_registro;
var id_existe = 0;





function insertRecord() { // Get value from Input and insert record . Function Call when Save/Submit Button Click..

    nombre = $('#nombre_inp').val();
    altura = $('#altura').val();
    peso = $('#peso').val();
    edad = $('#edad').val();
    sexo = $('input:radio[name=sexo]:checked').val();
    mano = $('input:radio[name=mano]:checked').val();


    // alert("form = " + nombre + "--" + altura + "--" + peso + "--" + edad + "--" + sexo + "--" + mano);



    db.transaction(function (tx) {
        tx.executeSql(insertar_dato, [nombre, altura, peso, edad, sexo, mano], loadAndReset, onError);
    });

    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

function deleteRecord(id) { // Get id of record . Function Call when Delete Button Click..

    var iddelete = id.toString();
    db.transaction(function (tx) {
        tx.executeSql(borrar, [id], showRecords, onError);
        alert("Delete Sucessfully");
    });
    resetForm();
}

function updateRecord() { // Get id of record . Function Call when Delete Button Click..

    nombre = $('#nombre_inp').val();
    altura = $('#altura').val();
    peso = $('#peso').val();
    edad = $('#edad').val();
    sexo = $('input:radio[name=sexo]:checked').val();
    mano = $('input:radio[name=mano]:checked').val();
    
    id_registro = "1";

    db.transaction(function (tx) {
        tx.executeSql(actualizar, [nombre, altura, peso, edad, sexo, mano, Number(id_registro)], loadAndReset, onError);
    });
}



function loadAndReset() { //Function for Load and Reset...

    $('#mensaje').modal({
        backdrop: 'static'
    });

}

function onError(tx, error) { // Function for Hendeling Error...

    alert("Error: " + error.message);
}

function config_sliders(a, p, e, cual) {

    var altura_val = 100;
    var peso_val = 40;
    var edad_val = 10;

    if (cual == "si") {
        altura_val = a;
        peso_val = p;
        edad_val = e;
    }
   
   
    $("#altura").val(altura_val);
    $("#peso").val(peso_val);
    $("#edad").val(edad_val);
 
    $('#ver1').html(altura_val);
    $('#ver2').html(peso_val);
    $('#ver3').html(edad_val);
    
    $('input[type="range"]').rangeslider('update', true);

}



function showRecords() { // Function For Retrive data from Database Display records as list

    db.transaction(function (tx) {

        tx.executeSql(seleccionar_todo, [], function (tx, result) {

            dataset = result.rows;

            //comprueba si hay un registro o la tabla está vacía
            if (dataset.length >= 1) { //existe datos y actualiza los datos del formularior

                id_existe = 1; //registro que existen datos ya guardados

                var item = null;
                item = dataset.item(0);

                nombre = item['nombre'];
                altura = item['altura'];
                peso = item['peso'];
                edad = item['edad'];
                sexo = item['sexo'];
                mano = item['mano'];

                //actualiza los datos del formulario

                $('#nombre_inp').val(nombre);

                config_sliders(altura, peso, edad, "si");


                if (sexo == 'femenino') {
                    $("#femenino").attr('checked', true);
                } else {
                    $("#masculino").attr('checked', true);
                }

                if (mano == 'derecha') {
                    $("#derecha").attr('checked', true);
                } else {
                    $("#izquierda").attr('checked', true);
                }

                //activo botones menu
                activar();


            } else { //el usuario aun no ha insertado ningún dato

                //bbdd vacia
                config_sliders("0", "0", "0", "no");
                
                //activo botones menu
            }
        });
    });
}
//***************************************************************

function modal_datos_no_guardados() {
    $('#mensaje_1').modal({
        backdrop: 'static'
    });
}

function modal_rellenar() {
    $('#mensaje_2').modal({
        backdrop: 'static'
    });
}


function desactivar() {
    $('.opacidad').css("opacity", "0.5");
    console.log('desactivar');
    desactivar_bot = false;
}

function activar() {
    $('.opacidad').css("opacity", "1");
    // bot_desactivar = '.sin_css';
    console.log('activar');
    desactivar_bot = true;
}

var desactivar_bot = false;

//estados de activacion de las opciones de menu del app
$('.desactivar').click(function () {

    if (desactivar_bot == false) {
        //alert("Debes rellenar todas las opciones de Mi Perfil");
        modal_rellenar();
        return false;
    }
});



//***************************************************************

    document.addEventListener("DOMContentLoaded", function() {
        document.addEventListener('deviceready', function(){
            db = sqlitePlugin.openDatabase({
                name: 'memory.db',
                iosDatabaseLocation: 'Documents'
            });

        desactivar();
        showRecords();


        //cambio de color en los titulos
        $('#nombre_inp').focus(function () {
            $('#atencion1').css('color', 'black');
        });

        $('input:radio[name=sexo]').change(function () {
            $('#atencion2').css('color', 'black');
        });
        $('input:radio[name=mano]').change(function () {
            $('#atencion3').css('color', 'black');
        });


        //INSERTO EL FORMULARIO EN BBDD
        $("#guardar").on('click', function () {

            var comprobar = true;

            //compruebo que se añaden todos los campos
            nombre = $('#nombre_inp').val();
            sexo = $('input:radio[name=sexo]:checked').val();
            mano = $('input:radio[name=mano]:checked').val();


            //comprobar campos
            if (nombre == '' || nombre == undefined) {
                modal_datos_no_guardados();
                $('#atencion1').css('color', 'red');
                comprobar = false;
            } else {
                $('#atencion1').css('color', 'black');

            }

            if (sexo == '' || sexo == undefined) {
                modal_datos_no_guardados();
                $('#atencion2').css('color', 'red');
                comprobar = false;
            } else {
                $('#atencion1').css('color', 'black');
            }

            if (mano == '' || sexo == undefined) {
                modal_datos_no_guardados();
                $('#atencion3').css('color', 'red');
                comprobar = false;
            } else {
                $('#atencion1').css('color', 'black');
            }

            if (comprobar == true) {
                if (id_existe == 1) { //existen datos con lo cual hay que actualizarlos
                    updateRecord();
                } else {
                    insertRecord(); //graba los datos por primera vez
                }
                
                //activo botones menu
                activar();
            }


        });
    });

 $(function() {
    $(document).on('input', '#altura', function(e) {
        $('#ver1').html($('#altura').val());
    });

    $(document).on('input', '#peso', function(e) {
        $('#ver2').html($('#peso').val());
    });
    $(document).on('input', '#edad', function(e) {
        $('#ver3').html($('#edad').val());
    });


    $('.rango').rangeslider({
        polyfill: false
    });
});
