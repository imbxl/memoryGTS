 var lang;

 $('.idioma_b').on('click', function () {

     lang = $(this).data('lang');

     $('html').prop('lang', lang);

     switch (lang) {
         case 'es':
             Cookies.set('idioma', 'esp');
             break;
         case 'en':
             Cookies.set('idioma', 'ing');
             break;
     }
 });

 if (Cookies.get('idioma')) {

     switch (Cookies.get('idioma')) {
         case 'esp':
             lang = 'es';
             $('html').prop('lang', 'es');
             break;

         case 'ing':
             lang = 'en';
             $('html').prop('lang', 'en');
             break;
     }
 } else {
     lang = 'en';
     $('html').prop('lang', 'en');
     Cookies.set('idioma', 'ing');
 }

 if (lang == 'en') {
     $('#txt1').html('Your daily TMB consumption is:');
     $('#txt2').html('Kcal consumed after the game:');
     $('#txt3').html('Drive:');
     $('#txt4').html('Backhand:');
     $('#txt5').html('Smash:');
     $('#txt6').html('Drives:');
     $('#txt7').html('Backhands:');
     $('#txt8').html('Drive lobs:');
     $('#txt9').html('Backhand lobs:');
     $('#txt10').html('Smashes:');
 }

 //RECOJO ID DEL PARTIDO


 var id;
 enlace = location.search;
 cadVariables = location.search.substring(1, location.search.length);
 arrVariables = cadVariables.split("&");

 for (i = 0; i < arrVariables.length; i++) {
     arrVariableActual = arrVariables[i].split("=");
 }

 var id = arrVariableActual[1];


 $("#enviar").on('click', function () {
     location.href = "datos_partido.html?id=" + id;
 });

 /***********************************/


 function calcular_victoria_derrota(set1, set2, set3) {

     arr_set1 = set1.split("/");
     s1 = arr_set1[0];
     s1r = arr_set1[1];

     arr_set2 = set2.split("/");
     s2 = arr_set2[0];
     s2r = arr_set2[1];

     if (set3 == '' || set3 == '-/-') {
         s3 = 0;
         s3r = 0;
     } else {
         arr_set3 = set3.split("/");
         s3 = arr_set3[0];
         s3r = arr_set3[1];
     }


     //calcular victoria o derrota

     var vic = 0;
     var der = 0;

     if (s1 > s1r) {
         vic = 1;
     } else {
         der = 1;
     };

     if (s2 > s2r) {
         vic = vic + 1;
     } else {
         der = der + 1;
     };

     if (s3 > s3r) {
         vic = vic + 1;
     } else {
         der = der + 1;
     };


     if (vic > der) {
         return victoria = true;
     } else {
         return victoria = false;
     }
 }


 /****************************************/

 //var db = openDatabase("Memory", "1.0", "Pala Memory", 10 * 1024 * 1024); // Open SQLite Database 10MB
 var db = null;

 var seleccionar_partido = "SELECT * FROM Partidos WHERE id=?";

 var del_partido = "DELETE FROM Partidos WHERE id=?";


 /****************************************/


 function eliminar_partido() {
     db.transaction(function (tx) {
         tx.executeSql(del_partido, [id], eliminado, onError);
     });
 }

 function onError(tx, error) {
     alert(error.message);
 }

 function eliminado() {
     //oculto y muestro pantallas
     $('#partido_eliminado').show();
     $('#datos').hide();
     $('#fecha').html('-');
     $('#borrar').hide();
 }

 /****************************************/
 function showRecords() { // Function For Retrive data from Database Display records as list

     var dataset;

     db.transaction(function (tx) {

         tx.executeSql(seleccionar_partido, [Number(id)], function (tx, result) {

             dataset = result.rows;
             var item = null;

             for (var i = 0; i < dataset.length; i++) {
                 item = dataset.item(i);

                 if (item['club'] == null || item['posicion'] == null || item['tipo_pista'] == null || item['r_derecha'] == null || item['r_reves'] == null || item['compi'] == null || item['set1'] == null || item['set2'] == null || item['set1'] == '-/-' || item['set2'] == '-/-') {

                     $("#fecha").html(item['fecha']);
                     $("#fhtp").html(item['fecha'] + " - " + item['hora']);

                     var txt_tit = 'Completa todos los datos del partido para que la app pueda calcular los históricos';
                     if (lang == 'en') {
                         txt_tit = 'Complete all the game data so that the app can calculate the historical data';
                     }

                     $("#tit_resultado").html(txt_tit);

                 } else {

                     var txt_tit = 'DATOS DEL PARTIDO';
                     var txt_tit1 = 'YO al revés';
                     var txt_tit2 = 'YO a la derecha';


                     if (lang == 'en') {
                         txt_tit = 'MATCH DATA';
                         txt_tit1 = 'Me in the backhand side';
                         txt_tit2 = 'Me in the drive side';
                     }

                     $("#tit_resultado").html(txt_tit);

                     $("#fecha").html(item['fecha']);
                     $("#fhtp").html(item['fecha'] + " - " + item['hora'] + " H" + "<br>" + item['tipo_pista']);
                     $("#club").html(item['club']);
                     $("#rivales").html(item['r_reves'] + " - " + item['r_derecha']);

                     if (item['posicion'] == 'reves') {
                         $("#pareja").html(txt_tit1 + "  - " + item['compi']);
                     } else {
                         $("#pareja").html(item['compi'] + " - " + txt_tit2);
                     }

                     if (item['set3'] == '' || item['set3'] == '-/-') {
                         $("#resultado").html(item['set1'] + " " + item['set2']);
                     } else {
                         $("#resultado").html(item['set1'] + " " + item['set2'] + " " + item['set3']);
                     }

                     //AVERIGUO SI HUBO VICTORIA
                     victoria = calcular_victoria_derrota(item['set1'], item['set2'], item['set3']);

                     if (victoria == true) {
                         $("#icono").html("<i class='fa fa-trophy  tj_cat tj_icono'></i>");
                     } else {
                         $("#icono").html("<i class='fa fa-thumbs-down  tj_cat tj_icono'></i>");
                     }
                 }
             }
         });
     });
 }

 /****************************************/
 var seleccionar_perfil = "SELECT * FROM MisDatos WHERE id=1";

 var altura = 0;
 var peso = 0;
 var edad = 0;
 var sexo = '';
 var mano = '';
 var radio_mate = '';
 var radio_dr = ''; //radio derecha reves

 var eti_der = 'Derechas';
 var eti_rev = 'Revéses';
 var eti_glo_der = 'Globo D.';
 var eti_glo_rev = 'Globo R.';

 if (lang == 'en') {
     eti_der = 'Drives';
     eti_rev = 'Backhands';
     eti_glo_der = 'Drive lobs';
     eti_glo_rev = 'Backhand lobs';
 }


 function perfil() {
     var dataset;

     db.transaction(function (tx) {
         tx.executeSql(seleccionar_perfil, [], function (tx, result) {

             dataset = result.rows;
             var item = null;


             for (var i = 0, item = null; i < dataset.length; i++) {
                 item = dataset.item(i);

                 altura = item['altura'];
                 peso = item['peso'];
                 edad = item['edad'];
                 sexo = item['sexo'];
                 mano = item['mano'];
             }
             if (altura > 200) {
                 radio_mate = 0.9; //valor en metros
                 radio_dr = 0.75;
             } //medidas en cm
             if (altura >= 180 && altura <= 189) {
                 radio_mate = 0.80;
                 radio_dr = 0.70;
             }
             if (altura >= 160 && altura <= 179) {
                 radio_mate = 0.75;
                 radio_dr = 0.60;
             }
             if (altura >= 140 && altura <= 159) {
                 radio_mate = 0.70;
                 radio_dr = 0.55;
             }
             if (altura >= 120 && altura <= 139) {
                 radio_mate = 0.65;
                 radio_dr = 0.50;
             }
             if (mano == 'izquierda') {
                 $('.t_derecha_p').html('Revés: ');
                 $('.t_derechas_p').html('Revéses: ');
                 $('.t_g_derechas_p').html('Globos revés: ');
                 $('.t_g_derecha').html(' Globos de reves ');
                 $('.t_derechas').html(' Revéses ');
                 $('.t_derecha_s').html('revés ');

                 $('.t_reves_p').html('Derecha: ');
                 $('.t_reveses_p').html('Derechas: ');
                 $('.t_g_reveses_p').html('Globos derecha: ');
                 $('.t_g_reves').html(' Globos de derecha ');
                 $('.t_reveses').html(' Derechas: ');
                 $('.t_reves_s').html('derecha ');

                 eti_der = 'Revéses';
                 eti_rev = 'Derechas';
                 eti_glo_der = 'Globo R.';
                 eti_glo_rev = 'Globo D.';

                 if (lang == 'en') {
                     $('.t_derecha_p').html('Backhand: ');
                     $('.t_derechas_p').html('Backhands: ');
                     $('.t_g_derechas_p').html('Backhand lob: ');
                     $('.t_g_derecha').html(' Backhand lobs ');
                     $('.t_derechas').html(' Backhands ');
                     $('.t_derecha_s').html('Backhand ');

                     $('.t_reves_p').html('Drive: ');
                     $('.t_reveses_p').html('Drives: ');
                     $('.t_g_reveses_p').html('Drive lob: ');
                     $('.t_g_reves').html(' Drive lobs ');
                     $('.t_reveses').html(' Drives: ');
                     $('.t_reves_s').html('Drive ');

                     eti_der = 'Backhands';
                     eti_rev = 'Drives';
                     eti_glo_der = 'Backhand lob';
                     eti_glo_rev = 'Drive lob';
                 }
             }

             golpes();

         });
     });
 }




 /****************************************/

 function calcular_velocidad(v_gx) {

     v_rad = Math.round(v_gx) / 57, 2958; //radianes/sg
     vel = v_rad * radio_dr; // velocidad de impacto m/sg

     return vel;
 }


 var seleccionar_golpes = "SELECT * FROM Partidos WHERE id=?";


 var tiempo = 0;
 var zancada = 0;

 var max_derecha = 0;
 var max_reves = 0;
 var max_remate = 0;

 var arr_g_dere = [];
 var arr_g_reve = [];
 var arr_g_glod = [];
 var arr_g_glor = [];
 var arr_g_rema = [];

 var arr_v_dere = [];
 var arr_v_reve = [];
 var arr_v_glod = [];
 var arr_v_glor = [];
 var arr_v_rema = [];

 var arr_pasos = [];


 function golpes() {

     var sum_v_dere = 0;
     var sum_v_reve = 0;
     var sum_v_glod = 0;
     var sum_v_glor = 0;
     var sum_v_rema = 0;

     var total_golpes = 0;

     var total_dere = 0;
     var total_reve = 0;
     var total_glod = 0;
     var total_glor = 0;
     var total_rema = 0;

     var total_v_dere = 0;
     var total_v_reve = 0;
     var total_v_glod = 0;
     var total_v_glor = 0;
     var total_v_rema = 0;

     var g_derechas = 0;
     var g_reveses = 0;
     var g_globo_der = 0;
     var g_globo_rev = 0;
     var g_remates = 0;

     var v_derechas = 0;
     var v_reveses = 0;
     var v_globo_der = 0;
     var v_globo_rev = 0;
     var v_remates = 0;

     var calorias_tmb = 0;
     var calorias = 0;

     var pasos = 0;

     var dataset;

     db.transaction(function (tx) {

         tx.executeSql(seleccionar_golpes, [Number(id)], function (tx, result) {

             dataset = result.rows;
             var item = null;


             for (var i = 0, item = null; i < dataset.length; i++) {
                 item = dataset.item(i);

                 //Recojo variables de BBDD

                 g_derechas = item['g_derechas'];
                 g_reveses = item['g_reveses'];
                 g_globo_der = item['g_globo_der'];
                 g_globo_rev = item['g_globo_rev'];
                 g_remates = item['g_remates'];

                 v_derechas = item['v_derechas'];
                 v_reveses = item['v_reveses'];
                 v_globo_der = item['v_globo_der'];
                 v_globo_rev = item['v_globo_rev'];
                 v_remates = item['v_remates'];

                 pasos = item['pasos'];

                 tiempo = item['tiempo'];

                 max_derecha = item['max_derecha'];
                 max_reves = item['max_reves'];
                 max_remate = item['max_remate'];

             }

             //console.log("dataset=" + dataset.length);

             //SPLIT
             arr_g_dere = g_derechas.split(",");
             arr_g_reve = g_reveses.split(",");
             arr_g_glod = g_globo_der.split(",");
             arr_g_glor = g_globo_rev.split(",");
             arr_g_rema = g_remates.split(",");

             arr_v_dere = v_derechas.split(",");
             arr_v_reve = v_reveses.split(",");
             arr_v_glod = v_globo_der.split(",");
             arr_v_glor = v_globo_rev.split(",");
             arr_v_rema = v_remates.split(",");

             arr_pasos = pasos.split(",");

             //radianes * radio * 10 = m/s - 10 es una correccion de arduino
             var grad_rad_m = (0.0174533 * 0.9) * 10;
             grad_rad_m = grad_rad_m.toFixed(2);

             //calculo maximas
             max_derecha = Number(max_derecha * grad_rad_m);
             max_reves = Number(max_reves * grad_rad_m);
             max_remate = Number(max_remate * grad_rad_m);

             max_derecha = Math.round(max_derecha);
             max_reves = Math.round(max_reves);
             max_remate = Math.round(max_remate);




             //1-CALCULAR MEDIAS
             //10 corrige el giroscopo de arduino 0,1

             for (i = 0; i < arr_v_dere.length; i++) {
                 arr_v_dere[i] = Number(arr_v_dere[i] * grad_rad_m);
                 arr_v_reve[i] = Number(arr_v_reve[i] * grad_rad_m);
                 arr_v_glod[i] = Number(arr_v_glod[i] * grad_rad_m);
                 arr_v_glor[i] = Number(arr_v_glor[i] * grad_rad_m);
                 arr_v_rema[i] = Number(arr_v_rema[i] * grad_rad_m);

                 sum_v_dere += arr_v_dere[i];
                 sum_v_reve += arr_v_reve[i];
                 sum_v_glod += arr_v_glod[i];
                 sum_v_glor += arr_v_glor[i];
                 sum_v_rema += arr_v_rema[i];
             }

             var tiempo_partido = Math.round(tiempo / 10); //10 FREQUENCIA EN MINUTOS

             if (sum_v_dere != 0 && tiempo_partido >= 1) {
                 sum_v_dere = sum_v_dere / tiempo_partido;
                 sum_v_dere = Math.round(sum_v_dere);
             } else {
                 sum_v_dere = 0;
             }

             if (sum_v_dere != 0 && tiempo_partido >= 1) {
                 sum_v_reve = sum_v_reve / tiempo_partido;
                 sum_v_reve = Math.round(sum_v_reve);
             } else {
                 sum_v_reve = 0;
             }

             if (sum_v_dere != 0 && tiempo_partido >= 1) {
                 sum_v_glod = sum_v_glod / tiempo_partido;
                 sum_v_glod = Math.round(sum_v_glod);
             } else {
                 sum_v_glod = 0;
             }

             if (sum_v_dere != 0 && tiempo_partido >= 1) {
                 sum_v_glor = sum_v_glor / tiempo_partido;
                 sum_v_glor = Math.round(sum_v_glor);
             } else {
                 sum_v_glor = 0;
             }

             if (sum_v_dere != 0 && tiempo_partido >= 1) {
                 sum_v_rema = sum_v_rema / tiempo_partido;
                 sum_v_rema = Math.round(sum_v_rema);
             } else {
                 sum_v_rema = 0;
             }




             //2-CALCULAR NUMERO DE GOLPES

             for (i = 0; i < arr_g_dere.length; i++) {
                 total_dere += Number(arr_g_dere[i]);
                 total_reve += Number(arr_g_reve[i]);
                 total_glod += Number(arr_g_glod[i]);
                 total_glor += Number(arr_g_glor[i]);
                 total_rema += Number(arr_g_rema[i]);
             }

             total_golpes = total_dere + total_reve + total_glod + total_glor + total_rema;

             tiempo = Math.round(tiempo);



             $("#tiempo").html(tiempo + ' min');
             $("#derecha").html(total_dere + ' ' + eti_der);
             $("#reves").html(total_reve + ' ' + eti_rev);
             $("#globo_d").html(total_glod + ' ' + eti_glo_der);
             $("#globo_r").html(total_glor + ' ' + eti_glo_rev);
             $("#mate").html(total_rema + ' Remates');
             $("#total_golpes").html(total_golpes + ' Golpes');

             if (lang == 'en') {
                 $("#mate").html(total_rema + ' Smashes');
                 $("#total_golpes").html(total_golpes + ' Strokes');
             }




             //paso de m/s a km/h
             var km_h = 3.6;

             //m/sg
             //paso de m/sg a km/h
             var k_max_derecha = Math.round(max_derecha * km_h);
             var k_max_reves = Math.round(max_reves * km_h);
             var k_max_remate = Math.round(max_remate * km_h);

             var k_sum_v_dere = Math.round(sum_v_dere * km_h);
             var k_sum_v_reve = Math.round(sum_v_reve * km_h);
             var k_sum_v_glod = Math.round(sum_v_glod * km_h);
             var k_sum_v_glor = Math.round(sum_v_glor * km_h);
             var k_sum_v_rema = Math.round(sum_v_rema * km_h);


             $("#max_vel_derecha").html(max_derecha + ' m/s' + '<span class="tam_txt"> - ' + k_max_derecha + ' km/h</span>');
             $("#max_vel_reves").html(max_reves + ' m/s' + '<span class="tam_txt"> - ' + k_max_reves + ' km/h</span>');
             $("#max_vel_mate").html(max_remate + ' m/s' + '<span class="tam_txt"> - ' + k_max_remate + ' km/h</span>');

             $("#media_derechas").html(sum_v_dere + ' m/s' + '<span class="tam_txt"> - ' + k_sum_v_dere + ' km/h</span>');
             $("#media_reveses").html(sum_v_reve + ' m/s' + '<span class="tam_txt"> - ' + k_sum_v_reve + ' km/h</span>');
             $("#media_globos_derecha").html(sum_v_glod + ' m/s' + '<span class="tam_txt"> - ' + k_sum_v_glod + ' km/h</span>');
             $("#media_globos_reves").html(sum_v_glor + ' m/s' + '<span class="tam_txt"> - ' + k_sum_v_glor + ' km/h</span>');
             $("#media_mates").html(sum_v_rema + ' m/s' + '<span class="tam_txt"> - ' + k_sum_v_rema + ' km/h</span>');


             //PASOS CALCULO DE RECORRIDO Y CALORIAS
             var suma_pasos = 0;

             for (i = 0; i < arr_pasos.length; i++) {
                 suma_pasos += Number(arr_pasos[i]);
             }

             peso = Number(peso);
             altura = Number(altura);
             edad = Number(edad);

             //calcular kcalorias 
             if (sexo == 'masculino') {
                 tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
                 kcalorias = (tmb / 24) * 6; //calorias consumidas en 1 hora
                 kcalorias = (kcalorias / 60) * tiempo; //calorias entre minutos por la duracion del partido
             } else {
                 tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
                 kcalorias = (tmb / 24) * 5.5; //calorias consumidas en 1 hora
                 kcalorias = (kcalorias / 60) * tiempo;
             }

             kcalorias = Math.round(kcalorias);
             tmb = Math.round(tmb);

             if (altura < 170) {
                 zancada = 0.9;
             } else {
                 zancada = 1.2;
             }

             suma_pasos = Math.round(suma_pasos * zancada); //0.67 media en cm zancada de una persona 

             $("#total_pasos").html(suma_pasos + ' m');
             $("#tmb").html("<span style='font-size:14px'>" + tmb + ' kcal</span>'); //tasa metabolismo 24 horas 1 día
             $("#kcalorias").html(kcalorias + ' kcal'); //kcal quemadas durante el partido


             //EJECUTO GRAFICAS

             grafica_1();
             grafica_2();
             grafica_3();
             grafica_3_a();
             grafica_4();
             grafica_5();
             grafica_6();
             grafica_7();
             grafica_8();
             grafica_9();
             grafica_esfuerzo();

         });
     });
 }

 /****************************************/

 //https://www.foroatletismo.com/entrenamiento/cuantas-calorias-quemas-haciendo-deporte/
 //cálculo de la Tasa de Metabolismo Basal (TMB)
 //Hombres: TMB = (10 x peso kg) + (6,25 × altura cm) – (5 × edad años) + 5
 //Mujeres: TMB = (10 x peso kg) + (6,25 × altura cm) – (5 × edad años) – 161
 //Veamos un ejemplo para Juanito, que pesa 70 kilogramos, mide 180 centímetros y tiene 35 años:
 //TMB = (10 x 70) + (6,25 x 180) – (5 * 35) + 5 = 1655 kcal
 //Es decir, Juanito quema en un día, sin hacer nada, ni siquiera moverse del sofá, 1655 kcal que, si dividimos entre 24, nos sale que equivalen a unas 68,96 kcal cada hora.

 //Un MET se define como 1 kcal / kg / hora 
 //MET TENIS-PADEL NO COMPETICIÓN 5 A 6 COMPETICION SUBE A 7.5

 //Tercer paso: cuántas calorías quemas haciendo deporte
 //Una vez que ya tenemos calculada nuestra Tasa de Metabolismo Basal (TMB) y sabemos los MET de nuestro deporte sólo queda hacer una sencilla multiplicación para saber cuánto quemamos con ese deporte en cada hora de ejercicio:

 //Consumo por Hora = (TMB /24) x MET


 function pasos() {

     var arr_pasos = [];
     var suma_pasos = 0;

     arr_pasos = pasos.split(",");

     //1-CALCULAR VELOCIDAD a partir de gx

     for (i = 0; i < arr_pasos.length; i++) {
         suma_pasos += arr_pasos[i];
     }

     peso = Number(peso);
     altura = Number(altura);
     edad = Number(edad);
     tiempo = Number(tiempo);

     //calcular kcalorias 
     if (sexo == 'masculino') {
         tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
         kcalorias = (tmb / 24) * 6; //calorias consumidas en 1 hora
         kcalorias = (kcalorias / 60) * tiempo; //calorias entre minutos por la duracion del partido
     } else {
         tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
         kcalorias = (tmb / 24) * 5.5; //calorias consumidas en 1 hora
         kcalorias = (kcalorias / 60) * tiempo;
     }

     kcalorias = Math.round(kcalorias);
     tmb = Math.round(tmb);

     $("#total_pasos").html(suma_pasos + ' m');
     $("#tmb").html(tmb + ' kcal'); //tasa metabolismo 24 horas 1 día
     $("#kcalorias").html(kcalorias + ' kcal'); //kcal quemadas durante el partido

     //ejecuto graficas 3
     grafica_3();

 }


 /****************************************/

document.addEventListener("DOMContentLoaded", function() {
	document.addEventListener('deviceready', function(){
		db = sqlitePlugin.openDatabase({
			name: 'memory.db',
			iosDatabaseLocation: 'Documents'
		});
		
     perfil();
     showRecords();

     //aparece pantalla modal
     $('#borrar').on("click", function () {
         $('#mensaje_1').modal({
             backdrop: 'static'
         });
     });

     //elimino registros
     $('#eliminar_modal').on("click", function () {
         eliminar_partido();
     });
	}, false);
});
