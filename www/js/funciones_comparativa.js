   //RECOJO ID's DEL PARTIDO
   var enlace = location.search;
   var cadVariables = location.search.substring(1, location.search.length);
   var arrVariables = cadVariables.split("&");


   var arr_a = arrVariables[0].split("=");
   var arr_b = arrVariables[1].split("=");


   /****************************************/

   var id_a = arr_a[1];
   var id_b = arr_b[1];

   if (id_a == 'derrotas') {
       id_a = arr_b[1];
       id_b = arr_a[1];
   }

   if (id_b == 'victorias') {
       id_a = arr_b[1];
       id_b = arr_a[1];
   }


   /****************************************/

   var db = openDatabase("Memory", "1.0", "Pala Memory", 10 * 1024 * 1024); // Open SQLite Database 10MB
   var seleccionar_perfil = "SELECT * FROM MisDatos WHERE id=1";
   var seleccionar_partido = "SELECT * FROM Partidos WHERE id=?";
   var seleccionar_todo = "SELECT * FROM Partidos";

   /****************************************/


   function calcular_victoria_derrota(set1, set2, set3) {

       var arr_set1 = set1.split("/");
       s1 = arr_set1[0];
       s1r = arr_set1[1];

       var arr_set2 = set2.split("/");
       s2 = arr_set2[0];
       s2r = arr_set2[1];

       if (set3 == '' || set3 == '-/-' || set3 == null || set3 == 0) {
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

   //---- A ----

   var a_fecha = 0;
   var a_hora = 0;
   var a_club = 0;
   var a_tipo_pista = 0;
   var a_r_reves = 0;
   var a_r_derecha = 0;
   var a_posicion = 0;
   var a_compi = 0;

   var a_set1 = 0;
   var a_set2 = 0;
   var a_set3 = 0;

   var a_resultado = 0;

   var a_tiempo = 0;

   var a_max_derecha = 0;
   var a_max_reves = 0;
   var a_max_remate = 0;

   var a_arr_g_dere = [];
   var a_arr_g_reve = [];
   var a_arr_g_glod = [];
   var a_arr_g_glor = [];
   var a_arr_g_rema = [];

   var a_arr_v_dere = [];
   var a_arr_v_reve = [];
   var a_arr_v_glod = [];
   var a_arr_v_glor = [];
   var a_arr_v_rema = [];

   var a_arr_pasos = [];

   var a_total_golpes = 0;

   var a_total_g_dere = 0;
   var a_total_g_reve = 0;
   var a_total_g_glod = 0;
   var a_total_g_glor = 0;
   var a_total_g_rema = 0;

   var a_total_v_dere = 0;
   var a_total_v_reve = 0;
   var a_total_v_glod = 0;
   var a_total_v_glor = 0;
   var a_total_v_rema = 0;

   var a_total_pasos = 0;

   var a_kcalorias = 0;


   //---- B ----

   var b_fecha = 0;
   var b_hora = 0;
   var b_club = 0;
   var b_tipo_pista = 0;
   var b_r_reves = 0;
   var b_r_derecha = 0;
   var b_posicion = 0;
   var b_compi = 0;

   var b_set1 = 0;
   var b_set2 = 0;
   var b_set3 = 0;

   var b_resultado = 0;

   var b_tiempo = 0;

   var b_max_derecha = 0;
   var b_max_reves = 0;
   var b_max_remate = 0;

   var b_arr_g_dere = [];
   var b_arr_g_reve = [];
   var b_arr_g_glod = [];
   var b_arr_g_glor = [];
   var b_arr_g_rema = [];

   var b_arr_v_dere = [];
   var b_arr_v_reve = [];
   var b_arr_v_glod = [];
   var b_arr_v_glor = [];
   var b_arr_v_rema = [];

   var b_arr_pasos = [];

   var b_total_golpes = 0;

   var b_total_g_dere = 0;
   var b_total_g_reve = 0;
   var b_total_g_glod = 0;
   var b_total_g_glor = 0;
   var b_total_g_rema = 0;

   var b_total_v_dere = 0;
   var b_total_v_reve = 0;
   var b_total_v_glod = 0;
   var b_total_v_glor = 0;
   var b_total_v_rema = 0;

   var b_total_pasos = 0;

   var b_kcalorias = 0;

   /****************************** VICTORIAS *****************************************/

   function showRecords_victorias_a() {

       var victoria1 = [];
       var victoria2 = [];
       var victoria3 = [];
       var victoria4 = [];
       var victoria5 = [];
       var victoria6 = [];
       var victoria7 = [];
       var victoria8 = [];
       var victoria9 = [];
       var victoria10 = [];
       var victoria11 = [];
       var victoria12 = [];
       var victoria13 = [];
       var victoria15 = [];
       var victoria14 = [];

       var v = 0;

       var dataset;

       db.transaction(function (tx) {

           tx.executeSql(seleccionar_todo, [], function (tx, result) {

               dataset = result.rows;
               var item = null;

               for (var i = 0; i < dataset.length; i++) {
                   item = dataset.item(i);

                   a_set1 = item['set1'];
                   a_set2 = item['set2'];
                   a_set3 = item['set3'];

                   if (a_set1 == null || a_set2 == null) {

                   } else {

                       a_resultado = calcular_victoria_derrota(a_set1, a_set2, a_set3);

                       if (a_resultado == true) {

                           victoria1[v] = Number(item['tiempo']);

                           victoria2[v] = Number(item['max_derecha']);
                           victoria3[v] = Number(item['max_reves']);
                           victoria4[v] = Number(item['max_remate']);

                           victoria5[v] = item['g_derechas'];
                           victoria6[v] = item['g_reveses'];
                           victoria7[v] = item['g_globo_der'];
                           victoria8[v] = item['g_globo_rev'];
                           victoria9[v] = item['g_remates'];

                           victoria10[v] = item['v_derechas'];
                           victoria11[v] = item['v_reveses'];
                           victoria12[v] = item['v_globo_der'];
                           victoria13[v] = item['v_globo_rev'];
                           victoria14[v] = item['v_remates'];

                           victoria15[v] = item['pasos'];

                           v++;
                       }
                   }
               }

               //si no hay registros no hay suficientes datos para realizar comparativa
               if (v > 0) {

                   //inicializar variables

                   var divisor1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                   for (i = 0; i < 12; i++) {
                       a_arr_g_dere[i] = 0;
                       a_arr_g_reve[i] = 0;
                       a_arr_g_glod[i] = 0;
                       a_arr_g_glor[i] = 0;
                       a_arr_g_rema[i] = 0;
                       a_arr_v_dere[i] = 0;
                       a_arr_v_reve[i] = 0;
                       a_arr_v_glod[i] = 0;
                       a_arr_v_glor[i] = 0;
                       a_arr_v_rema[i] = 0;
                       a_arr_pasos[i] = 0;
                   }



                   //GOLPES

                   for (i = 0; i < victoria5.length; i++) {

                       var eventual5 = victoria5[i].split(",");
                       var eventual6 = victoria6[i].split(",");
                       var eventual7 = victoria7[i].split(",");
                       var eventual8 = victoria8[i].split(",");
                       var eventual9 = victoria9[i].split(",");

                       for (ii = 0; ii < 12; ii++) {

                           eventual5[ii] = Number(eventual5[ii]);
                           eventual6[ii] = Number(eventual6[ii]);
                           eventual7[ii] = Number(eventual7[ii]);
                           eventual8[ii] = Number(eventual8[ii]);
                           eventual9[ii] = Number(eventual9[ii]);

                           a_arr_g_dere[ii] += eventual5[ii];
                           a_arr_g_reve[ii] += eventual6[ii];
                           a_arr_g_glod[ii] += eventual7[ii];
                           a_arr_g_glor[ii] += eventual8[ii];
                           a_arr_g_rema[ii] += eventual9[ii];


                           if (eventual5[ii] != 0) {
                               divisor1[ii]++;
                           }
                           if (eventual6[ii] != 0) {
                               divisor2[ii]++;
                           }
                           if (eventual7[ii] != 0) {
                               divisor3[ii]++;
                           }
                           if (eventual8[ii] != 0) {
                               divisor4[ii]++;
                           }
                           if (eventual9[ii] != 0) {
                               divisor5[ii]++;
                           }
                       }
                   }

                   for (i = 0; i < 12; i++) {
                       if (divisor1[i] != 0) {
                           a_arr_g_dere[i] = a_arr_g_dere[i] / divisor1[i];
                       }
                       if (divisor2[i] != 0) {
                           a_arr_g_reve[i] = a_arr_g_reve[i] / divisor2[i];
                       }
                       if (divisor3[i] != 0) {
                           a_arr_g_glod[i] = a_arr_g_glod[i] / divisor3[i];
                       }
                       if (divisor4[i] != 0) {
                           a_arr_g_glor[i] = a_arr_g_glor[i] / divisor4[i];
                       }
                       if (divisor5[i] != 0) {
                           a_arr_g_rema[i] = a_arr_g_rema[i] / divisor5[i];
                       }
                   }

                   //VELOCIDADES

                   var divisor1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


                   for (i = 0; i < victoria10.length; i++) {

                       var eventual10 = victoria10[i].split(",");
                       var eventual11 = victoria11[i].split(",");
                       var eventual12 = victoria12[i].split(",");
                       var eventual13 = victoria13[i].split(",");
                       var eventual14 = victoria14[i].split(",");

                       for (ii = 0; ii < 12; ii++) {

                           eventual10[ii] = Number(eventual10[ii]);
                           eventual11[ii] = Number(eventual11[ii]);
                           eventual12[ii] = Number(eventual12[ii]);
                           eventual13[ii] = Number(eventual13[ii]);
                           eventual14[ii] = Number(eventual14[ii]);

                           a_arr_v_dere[ii] += eventual10[ii];
                           a_arr_v_reve[ii] += eventual11[ii];
                           a_arr_v_glod[ii] += eventual12[ii];
                           a_arr_v_glor[ii] += eventual13[ii];
                           a_arr_v_rema[ii] += eventual14[ii];

                           if (eventual10[ii] != 0) {
                               divisor1[ii]++;
                           }
                           if (eventual11[ii] != 0) {
                               divisor2[ii]++;
                           }
                           if (eventual12[ii] != 0) {
                               divisor3[ii]++;
                           }
                           if (eventual13[ii] != 0) {
                               divisor4[ii]++;
                           }
                           if (eventual14[ii] != 0) {
                               divisor5[ii]++;
                           }
                       }
                   }


                   for (i = 0; i < 12; i++) {
                       if (divisor1[i] != 0) {
                           a_arr_v_dere[i] = a_arr_v_dere[i] / divisor1[i];
                       }
                       if (divisor2[i] != 0) {
                           a_arr_v_reve[i] = a_arr_v_reve[i] / divisor2[i];
                       }
                       if (divisor3[i] != 0) {
                           a_arr_v_glod[i] = a_arr_v_glod[i] / divisor3[i];
                       }
                       if (divisor4[i] != 0) {
                           a_arr_v_glor[i] = a_arr_v_glor[i] / divisor4[i];
                       }
                       if (divisor5[i] != 0) {
                           a_arr_v_rema[i] = a_arr_v_rema[i] / divisor5[i];
                       }
                   }

                   //PASOS

                   var divisor1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                   for (i = 0; i < victoria15.length; i++) {

                       var eventual15 = victoria15[i].split(",");

                       for (ii = 0; ii < 12; ii++) {

                           eventual15[ii] = Number(eventual15[ii]);
                           a_arr_pasos[ii] += eventual15[ii];

                           if (eventual15[ii] != 0) {
                               divisor1[ii]++;
                           }
                       }
                   }

                   for (i = 0; i < 12; i++) {
                       if (divisor1[i] != 0) {
                           a_arr_pasos[i] = a_arr_pasos[i] / divisor1[i];
                       }
                   }

                   //TIEMPO Y MAXIMAS

                   for (i = 0; i < victoria1.length; i++) {

                       victoria1[i] = Number(victoria1[i]);
                       victoria2[i] = Number(victoria2[i]);
                       victoria3[i] = Number(victoria3[i]);
                       victoria4[i] = Number(victoria4[i]);

                       a_tiempo += victoria1[i];
                       a_max_derecha += victoria2[i];
                       a_max_reves += victoria3[i];
                       a_max_remate += victoria4[i];
                   }

                   a_tiempo = a_tiempo / victoria1.length;
                   a_max_derecha = a_max_derecha / victoria1.length;
                   a_max_reves = a_max_reves / victoria1.length;
                   a_max_remate = a_max_remate / victoria1.length;


                   //PASAR DE GRADOS/S A M/S
                   //radianes * radio * 10 = m/s - 10 es una correccion de arduino

                   var grad_rad_dr = (0.0174533 * radio_dr) * 10;

                   var grad_rad_m = (0.0174533 * radio_mate) * 10;


                   //CALCULAR MÁXIMAS

                   a_max_derecha = Math.round(a_max_derecha * grad_rad_dr);
                   a_max_reves = Math.round(a_max_reves * grad_rad_dr);
                   a_max_remate = Math.round(a_max_remate * grad_rad_m);


                   //CALCULAR MEDIAS

                   var t_v_dere = 0;
                   var t_v_reve = 0;
                   var t_v_glod = 0;
                   var t_v_glor = 0;
                   var t_v_rema = 0;


                   for (i = 0; i < a_arr_v_dere.length; i++) {

                       a_arr_v_dere[i] = Number(a_arr_v_dere[i]);
                       a_arr_v_reve[i] = Number(a_arr_v_reve[i]);
                       a_arr_v_glod[i] = Number(a_arr_v_glod[i]);
                       a_arr_v_glor[i] = Number(a_arr_v_glor[i]);
                       a_arr_v_rema[i] = Number(a_arr_v_rema[i]);

                       a_arr_v_dere[i] = Math.round(a_arr_v_dere[i] * grad_rad_dr);
                       a_arr_v_reve[i] = Math.round(a_arr_v_reve[i] * grad_rad_dr);
                       a_arr_v_glod[i] = Math.round(a_arr_v_glod[i] * grad_rad_dr);
                       a_arr_v_glor[i] = Math.round(a_arr_v_glor[i] * grad_rad_dr);
                       a_arr_v_rema[i] = Math.round(a_arr_v_rema[i] * grad_rad_m);

                       if (a_arr_v_dere[i] != 0) {
                           a_total_v_dere += a_arr_v_dere[i];
                           t_v_dere++;
                       }

                       if (a_total_v_dere != 0) {
                           a_total_v_reve += a_arr_v_reve[i];
                           t_v_reve++;
                       }

                       if (a_total_v_dere != 0) {
                           a_total_v_glod += a_arr_v_glod[i];
                           t_v_glod++;
                       }

                       if (a_total_v_dere != 0) {
                           a_total_v_glor += a_arr_v_glor[i];
                           t_v_glor++;
                       }

                       if (a_total_v_dere != 0) {
                           a_total_v_rema += a_arr_v_rema[i];
                           t_v_rema++;
                       }
                       //CALCULAR NUMERO DE GOLPES
                       a_arr_g_dere[i] = Number(a_arr_g_dere[i]);
                       a_arr_g_reve[i] = Number(a_arr_g_reve[i]);
                       a_arr_g_glod[i] = Number(a_arr_g_glod[i]);
                       a_arr_g_glor[i] = Number(a_arr_g_glor[i]);
                       a_arr_g_rema[i] = Number(a_arr_g_rema[i]);

                       a_total_g_dere += a_arr_g_dere[i];
                       a_total_g_reve += a_arr_g_reve[i];
                       a_total_g_glod += a_arr_g_glod[i];
                       a_total_g_glor += a_arr_g_glor[i];
                       a_total_g_rema += a_arr_g_rema[i];
                   }


                   //CALCULAR VELOCIDAD MEDIA
                   if (a_total_v_dere != 0) {
                       a_total_v_dere = Math.round(a_total_v_dere / t_v_dere);
                   }

                   if (a_total_v_dere != 0) {
                       a_total_v_reve = Math.round(a_total_v_reve / t_v_reve);
                   }

                   if (a_total_v_dere != 0) {
                       a_total_v_glod = Math.round(a_total_v_glod / t_v_glod);
                   }

                   if (a_total_v_dere != 0) {
                       a_total_v_glor = Math.round(a_total_v_glor / t_v_glor);
                   }

                   if (a_total_v_dere != 0) {
                       a_total_v_rema = Math.round(a_total_v_rema / t_v_rema);
                   }


                   //CALCULAR TOTAL GOLPES
                   a_total_golpes = a_total_g_dere + a_total_g_reve + a_total_g_glod + a_total_g_glor + a_total_g_rema;

                   //CALCULAR TOTAL PASOS

                   for (i = 0; i < a_arr_pasos.length; i++) {
                       a_arr_pasos[i] = Number(a_arr_pasos[i]);
                       a_total_pasos += a_arr_pasos[i];
                   }

                   a_total_pasos = Math.round(a_total_pasos * zancada);

                   //TIEMPO
                   a_tiempo = Math.round(a_tiempo);

                   //CALCULAR CALORIAS
                   a_kcalorias = calcular_calorias(a_tiempo);

                   //CALCULAR VICTORIA O DERROTA
                   if (a_resultado == true) {
                       a_resultado = "Victoria";
                   } else {
                       a_resultado = "Derrota";
                   }

                   gestion_consultas();

               } else {

                   //no hay suficientes datos para comparativa
                   console.log('no hay suficientes datos para comparativa');
               }

           });
       });
   }

   /****************************** DERROTAS *****************************************/

   function showRecords_derrotas_b() {

       var derrota1 = [];
       var derrota2 = [];
       var derrota3 = [];
       var derrota4 = [];
       var derrota5 = [];
       var derrota6 = [];
       var derrota7 = [];
       var derrota8 = [];
       var derrota9 = [];
       var derrota10 = [];
       var derrota11 = [];
       var derrota12 = [];
       var derrota13 = [];
       var derrota15 = [];
       var derrota14 = [];

       var v = 0;

       var dataset;

       db.transaction(function (tx) {

           tx.executeSql(seleccionar_todo, [], function (tx, result) {

               dataset = result.rows;
               var item = null;

               for (var i = 0; i < dataset.length; i++) {
                   item = dataset.item(i);

                   b_set1 = item['set1'];
                   b_set2 = item['set2'];
                   b_set3 = item['set3'];

                   if (b_set1 == null || b_set2 == null) {

                   } else {

                       b_resultado = calcular_victoria_derrota(b_set1, b_set2, b_set3);

                       if (b_resultado == false) {

                           derrota1[v] = Number(item['tiempo']);

                           derrota2[v] = Number(item['max_derecha']);
                           derrota3[v] = Number(item['max_reves']);
                           derrota4[v] = Number(item['max_remate']);

                           derrota5[v] = item['g_derechas'];
                           derrota6[v] = item['g_reveses'];
                           derrota7[v] = item['g_globo_der'];
                           derrota8[v] = item['g_globo_rev'];
                           derrota9[v] = item['g_remates'];

                           derrota10[v] = item['v_derechas'];
                           derrota11[v] = item['v_reveses'];
                           derrota12[v] = item['v_globo_der'];
                           derrota13[v] = item['v_globo_rev'];
                           derrota14[v] = item['v_remates'];

                           derrota15[v] = item['pasos'];

                           v++;
                       }
                   }

               }

               //si no hay registros no hay suficientes datos para realizar comparativa
               if (v > 0) {

                   //inicializar variables

                   var divisor1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                   for (i = 0; i < 12; i++) {
                       b_arr_g_dere[i] = 0;
                       b_arr_g_reve[i] = 0;
                       b_arr_g_glod[i] = 0;
                       b_arr_g_glor[i] = 0;
                       b_arr_g_rema[i] = 0;
                       b_arr_v_dere[i] = 0;
                       b_arr_v_reve[i] = 0;
                       b_arr_v_glod[i] = 0;
                       b_arr_v_glor[i] = 0;
                       b_arr_v_rema[i] = 0;
                       b_arr_pasos[i] = 0;
                   }



                   //GOLPES

                   for (i = 0; i < derrota5.length; i++) {

                       var eventual5 = derrota5[i].split(",");
                       var eventual6 = derrota6[i].split(",");
                       var eventual7 = derrota7[i].split(",");
                       var eventual8 = derrota8[i].split(",");
                       var eventual9 = derrota9[i].split(",");

                       for (ii = 0; ii < 12; ii++) {

                           eventual5[ii] = Number(eventual5[ii]);
                           eventual6[ii] = Number(eventual6[ii]);
                           eventual7[ii] = Number(eventual7[ii]);
                           eventual8[ii] = Number(eventual8[ii]);
                           eventual9[ii] = Number(eventual9[ii]);

                           b_arr_g_dere[ii] += eventual5[ii];
                           b_arr_g_reve[ii] += eventual6[ii];
                           b_arr_g_glod[ii] += eventual7[ii];
                           b_arr_g_glor[ii] += eventual8[ii];
                           b_arr_g_rema[ii] += eventual9[ii];


                           if (eventual5[ii] != 0) {
                               divisor1[ii]++;
                           }
                           if (eventual6[ii] != 0) {
                               divisor2[ii]++;
                           }
                           if (eventual7[ii] != 0) {
                               divisor3[ii]++;
                           }
                           if (eventual8[ii] != 0) {
                               divisor4[ii]++;
                           }
                           if (eventual9[ii] != 0) {
                               divisor5[ii]++;
                           }
                       }
                   }

                   for (i = 0; i < 12; i++) {
                       if (divisor1[i] != 0) {
                           b_arr_g_dere[i] = b_arr_g_dere[i] / divisor1[i];
                       }
                       if (divisor2[i] != 0) {
                           b_arr_g_reve[i] = b_arr_g_reve[i] / divisor2[i];
                       }
                       if (divisor3[i] != 0) {
                           b_arr_g_glod[i] = b_arr_g_glod[i] / divisor3[i];
                       }
                       if (divisor4[i] != 0) {
                           b_arr_g_glor[i] = b_arr_g_glor[i] / divisor4[i];
                       }
                       if (divisor5[i] != 0) {
                           b_arr_g_rema[i] = b_arr_g_rema[i] / divisor5[i];
                       }
                   }


                   //VELOCIDADES

                   var divisor1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                   var divisor5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


                   for (i = 0; i < derrota10.length; i++) {

                       var eventual10 = derrota10[i].split(",");
                       var eventual11 = derrota11[i].split(",");
                       var eventual12 = derrota12[i].split(",");
                       var eventual13 = derrota13[i].split(",");
                       var eventual14 = derrota14[i].split(",");

                       for (ii = 0; ii < 12; ii++) {

                           eventual10[ii] = Number(eventual10[ii]);
                           eventual11[ii] = Number(eventual11[ii]);
                           eventual12[ii] = Number(eventual12[ii]);
                           eventual13[ii] = Number(eventual13[ii]);
                           eventual14[ii] = Number(eventual14[ii]);

                           b_arr_v_dere[ii] += eventual10[ii];
                           b_arr_v_reve[ii] += eventual11[ii];
                           b_arr_v_glod[ii] += eventual12[ii];
                           b_arr_v_glor[ii] += eventual13[ii];
                           b_arr_v_rema[ii] += eventual14[ii];

                           if (eventual10[ii] != 0) {
                               divisor1[ii]++;
                           }
                           if (eventual11[ii] != 0) {
                               divisor2[ii]++;
                           }
                           if (eventual12[ii] != 0) {
                               divisor3[ii]++;
                           }
                           if (eventual13[ii] != 0) {
                               divisor4[ii]++;
                           }
                           if (eventual14[ii] != 0) {
                               divisor5[ii]++;
                           }
                       }
                   }


                   for (i = 0; i < 12; i++) {
                       if (divisor1[i] != 0) {
                           b_arr_v_dere[i] = b_arr_v_dere[i] / divisor1[i];
                       }
                       if (divisor2[i] != 0) {
                           b_arr_v_reve[i] = b_arr_v_reve[i] / divisor2[i];
                       }
                       if (divisor3[i] != 0) {
                           b_arr_v_glod[i] = b_arr_v_glod[i] / divisor3[i];
                       }
                       if (divisor4[i] != 0) {
                           b_arr_v_glor[i] = b_arr_v_glor[i] / divisor4[i];
                       }
                       if (divisor5[i] != 0) {
                           b_arr_v_rema[i] = b_arr_v_rema[i] / divisor5[i];
                       }
                   }

                   //PASOS

                   var divisor1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                   for (i = 0; i < derrota15.length; i++) {

                       var eventual15 = derrota15[i].split(",");

                       for (ii = 0; ii < 12; ii++) {

                           eventual15[ii] = Number(eventual15[ii]);
                           b_arr_pasos[ii] += eventual15[ii];

                           if (eventual15[ii] != 0) {
                               divisor1[ii]++;
                           }
                       }
                   }

                   for (i = 0; i < 12; i++) {
                       if (divisor1[i] != 0) {
                           b_arr_pasos[i] = b_arr_pasos[i] / divisor1[i];
                       }
                   }

                   //TIEMPO Y MAXIMAS

                   for (i = 0; i < derrota1.length; i++) {

                       derrota1[i] = Number(derrota1[i]);
                       derrota2[i] = Number(derrota2[i]);
                       derrota3[i] = Number(derrota3[i]);
                       derrota4[i] = Number(derrota4[i]);

                       b_tiempo += derrota1[i];
                       b_max_derecha += derrota2[i];
                       b_max_reves += derrota3[i];
                       b_max_remate += derrota4[i];
                   }

                   b_tiempo = b_tiempo / derrota1.length;
                   b_max_derecha = b_max_derecha / derrota1.length;
                   b_max_reves = b_max_reves / derrota1.length;
                   b_max_remate = b_max_remate / derrota1.length;



                   //PASAR DE GRADOS/S A M/S
                   //radianes * radio * 10 = m/s - 10 es una correccion de arduino

                   var grad_rad_dr = (0.0174533 * radio_dr) * 10;

                   var grad_rad_m = (0.0174533 * radio_mate) * 10;


                   //CALCULAR MÁXIMAS

                   b_max_derecha = Math.round(b_max_derecha * grad_rad_dr);
                   b_max_reves = Math.round(b_max_reves * grad_rad_dr);
                   b_max_remate = Math.round(b_max_remate * grad_rad_m);


                   //CALCULAR MEDIAS

                   var t_v_dere = 0;
                   var t_v_reve = 0;
                   var t_v_glod = 0;
                   var t_v_glor = 0;
                   var t_v_rema = 0;


                   for (i = 0; i < b_arr_v_dere.length; i++) {

                       b_arr_v_dere[i] = Number(b_arr_v_dere[i]);
                       b_arr_v_reve[i] = Number(b_arr_v_reve[i]);
                       b_arr_v_glod[i] = Number(b_arr_v_glod[i]);
                       b_arr_v_glor[i] = Number(b_arr_v_glor[i]);
                       b_arr_v_rema[i] = Number(b_arr_v_rema[i]);

                       b_arr_v_dere[i] = Math.round(b_arr_v_dere[i] * grad_rad_dr);
                       b_arr_v_reve[i] = Math.round(b_arr_v_reve[i] * grad_rad_dr);
                       b_arr_v_glod[i] = Math.round(b_arr_v_glod[i] * grad_rad_dr);
                       b_arr_v_glor[i] = Math.round(b_arr_v_glor[i] * grad_rad_dr);
                       b_arr_v_rema[i] = Math.round(b_arr_v_rema[i] * grad_rad_m);

                       if (b_arr_v_dere[i] != 0) {
                           b_total_v_dere += b_arr_v_dere[i];
                           t_v_dere++;
                       }

                       if (b_total_v_dere != 0) {
                           b_total_v_reve += b_arr_v_reve[i];
                           t_v_reve++;
                       }

                       if (b_total_v_dere != 0) {
                           b_total_v_glod += b_arr_v_glod[i];
                           t_v_glod++;
                       }

                       if (b_total_v_dere != 0) {
                           b_total_v_glor += b_arr_v_glor[i];
                           t_v_glor++;
                       }

                       if (b_total_v_dere != 0) {
                           b_total_v_rema += b_arr_v_rema[i];
                           t_v_rema++;
                       }
                       //CALCULAR NUMERO DE GOLPES
                       b_arr_g_dere[i] = Number(b_arr_g_dere[i]);
                       b_arr_g_reve[i] = Number(b_arr_g_reve[i]);
                       b_arr_g_glod[i] = Number(b_arr_g_glod[i]);
                       b_arr_g_glor[i] = Number(b_arr_g_glor[i]);
                       b_arr_g_rema[i] = Number(b_arr_g_rema[i]);

                       b_total_g_dere += b_arr_g_dere[i];
                       b_total_g_reve += b_arr_g_reve[i];
                       b_total_g_glod += b_arr_g_glod[i];
                       b_total_g_glor += b_arr_g_glor[i];
                       b_total_g_rema += b_arr_g_rema[i];
                   }


                   console.log(b_arr_g_dere);
                   console.log(b_arr_g_reve);
                   console.log(b_arr_g_glod);
                   console.log(b_arr_g_glor);
                   console.log(b_arr_g_rema);

                   console.log(b_arr_v_dere);
                   console.log(b_arr_v_reve);
                   console.log(b_arr_v_glod);
                   console.log(b_arr_v_glor);
                   console.log(b_arr_v_rema);



                   //CALCULAR VELOCIDAD MEDIA
                   if (b_total_v_dere != 0) {
                       b_total_v_dere = Math.round(b_total_v_dere / t_v_dere);
                   }

                   if (b_total_v_dere != 0) {
                       b_total_v_reve = Math.round(b_total_v_reve / t_v_reve);
                   }

                   if (b_total_v_dere != 0) {
                       b_total_v_glod = Math.round(b_total_v_glod / t_v_glod);
                   }

                   if (b_total_v_dere != 0) {
                       b_total_v_glor = Math.round(b_total_v_glor / t_v_glor);
                   }

                   if (b_total_v_dere != 0) {
                       b_total_v_rema = Math.round(b_total_v_rema / t_v_rema);
                   }


                   //CALCULAR TOTAL GOLPES
                   b_total_golpes = b_total_g_dere + b_total_g_reve + b_total_g_glod + b_total_g_glor + b_total_g_rema;

                   console.log('total golpes' + b_total_golpes);

                   //CALCULAR TOTAL PASOS

                   for (i = 0; i < b_arr_pasos.length; i++) {
                       b_arr_pasos[i] = Number(b_arr_pasos[i]);
                       b_total_pasos += b_arr_pasos[i];
                   }

                   b_total_pasos = Math.round(b_total_pasos * zancada);

                   console.log('total pasos' + b_total_pasos);

                   //TIEMPO
                   b_tiempo = Math.round(b_tiempo);

                   //CALCULAR CALORIAS
                   b_kcalorias = calcular_calorias(b_tiempo);

                   //CALCULAR derrota O DERROTA
                   if (b_resultado == true) {
                       b_resultado = "Victoria";
                   } else {
                       b_resultado = "Derrota";
                   }

                   gestion_consultas();

               } else {

                   //no hay suficientes datos para comparativa
                   console.log('no hay suficientes datos para comparativa');
               }


           });
       });
   }

   /****************************** PARTIDO A *****************************************/


   function showRecords_a() {

       var dataset;

       db.transaction(function (tx) {

           tx.executeSql(seleccionar_partido, [Number(id_a)], function (tx, result) {

               dataset = result.rows;
               var item = null;

               for (var i = 0; i < dataset.length; i++) {
                   item = dataset.item(i);


                   a_fecha = item['fecha'];
                   a_hora = item['hora'];
                   a_club = item['club'];
                   a_tipo_pista = item['tipo_pista'];
                   a_r_reves = item['r_reves'];
                   a_r_derecha = item['r_derecha'];
                   a_posicion = item['posicion'];
                   a_compi = item['compi'];

                   a_set1 = item['set1'];
                   a_set2 = item['set2'];
                   a_set3 = item['set3'];

                   a_tiempo = Number(item['tiempo']);

                   a_max_derecha = Number(item['max_derecha']);
                   a_max_reves = Number(item['max_reves']);
                   a_max_remate = Number(item['max_remate']);

                   var dato1 = item['g_derechas'];
                   var dato2 = item['g_reveses'];
                   var dato3 = item['g_globo_der'];
                   var dato4 = item['g_globo_rev'];
                   var dato5 = item['g_remates'];

                   var dato6 = item['v_derechas'];
                   var dato7 = item['v_reveses'];
                   var dato8 = item['v_globo_der'];
                   var dato9 = item['v_globo_rev'];
                   var dato10 = item['v_remates'];

                   var dato11 = item['pasos'];

               }


               //SPLIT
               a_arr_g_dere = dato1.split(",");
               a_arr_g_reve = dato2.split(",");
               a_arr_g_glod = dato3.split(",");
               a_arr_g_glor = dato4.split(",");
               a_arr_g_rema = dato5.split(",");

               a_arr_v_dere = dato6.split(",");
               a_arr_v_reve = dato7.split(",");
               a_arr_v_glod = dato8.split(",");
               a_arr_v_glor = dato9.split(",");
               a_arr_v_rema = dato10.split(",");

               a_arr_pasos = dato11.split(",");



               //PASAR DE GRADOS/S A M/S
               //radianes * radio * 10 = m/s - 10 es una correccion de arduino

               var grad_rad_dr = (0.0174533 * radio_dr) * 10;

               var grad_rad_m = (0.0174533 * radio_mate) * 10;


               //CALCULAR MÁXIMAS

               a_max_derecha = Math.round(a_max_derecha * grad_rad_dr);
               a_max_reves = Math.round(a_max_reves * grad_rad_dr);
               a_max_remate = Math.round(a_max_remate * grad_rad_m);


               //CALCULAR MEDIAS

               var t_v_dere = 0;
               var t_v_reve = 0;
               var t_v_glod = 0;
               var t_v_glor = 0;
               var t_v_rema = 0;


               for (i = 0; i < a_arr_v_dere.length; i++) {

                   a_arr_v_dere[i] = Number(a_arr_v_dere[i]);
                   a_arr_v_reve[i] = Number(a_arr_v_reve[i]);
                   a_arr_v_glod[i] = Number(a_arr_v_glod[i]);
                   a_arr_v_glor[i] = Number(a_arr_v_glor[i]);
                   a_arr_v_rema[i] = Number(a_arr_v_rema[i]);

                   a_arr_v_dere[i] = Math.round(a_arr_v_dere[i] * grad_rad_dr);
                   a_arr_v_reve[i] = Math.round(a_arr_v_reve[i] * grad_rad_dr);
                   a_arr_v_glod[i] = Math.round(a_arr_v_glod[i] * grad_rad_dr);
                   a_arr_v_glor[i] = Math.round(a_arr_v_glor[i] * grad_rad_dr);
                   a_arr_v_rema[i] = Math.round(a_arr_v_rema[i] * grad_rad_m);

                   if (a_arr_v_dere[i] != 0) {
                       a_total_v_dere += a_arr_v_dere[i];
                       t_v_dere++;
                   }

                   if (a_total_v_dere != 0) {
                       a_total_v_reve += a_arr_v_reve[i];
                       t_v_reve++;
                   }

                   if (a_total_v_dere != 0) {
                       a_total_v_glod += a_arr_v_glod[i];
                       t_v_glod++;
                   }

                   if (a_total_v_dere != 0) {
                       a_total_v_glor += a_arr_v_glor[i];
                       t_v_glor++;
                   }

                   if (a_total_v_dere != 0) {
                       a_total_v_rema += a_arr_v_rema[i];
                       t_v_rema++;
                   }
                   //CALCULAR NUMERO DE GOLPES
                   a_arr_g_dere[i] = Number(a_arr_g_dere[i]);
                   a_arr_g_reve[i] = Number(a_arr_g_reve[i]);
                   a_arr_g_glod[i] = Number(a_arr_g_glod[i]);
                   a_arr_g_glor[i] = Number(a_arr_g_glor[i]);
                   a_arr_g_rema[i] = Number(a_arr_g_rema[i]);

                   a_total_g_dere += a_arr_g_dere[i];
                   a_total_g_reve += a_arr_g_reve[i];
                   a_total_g_glod += a_arr_g_glod[i];
                   a_total_g_glor += a_arr_g_glor[i];
                   a_total_g_rema += a_arr_g_rema[i];
               }


               //CALCULAR VELOCIDAD MEDIA
               if (a_total_v_dere != 0) {
                   a_total_v_dere = Math.round(a_total_v_dere / t_v_dere);
               }

               if (a_total_v_dere != 0) {
                   a_total_v_reve = Math.round(a_total_v_reve / t_v_reve);
               }

               if (a_total_v_dere != 0) {
                   a_total_v_glod = Math.round(a_total_v_glod / t_v_glod);
               }

               if (a_total_v_dere != 0) {
                   a_total_v_glor = Math.round(a_total_v_glor / t_v_glor);
               }

               if (a_total_v_dere != 0) {
                   a_total_v_rema = Math.round(a_total_v_rema / t_v_rema);
               }


               //CALCULAR TOTAL GOLPES
               a_total_golpes = a_total_g_dere + a_total_g_reve + a_total_g_glod + a_total_g_glor + a_total_g_rema;

               //CALCULAR TOTAL PASOS

               for (i = 0; i < a_arr_pasos.length; i++) {
                   a_arr_pasos[i] = Number(a_arr_pasos[i]);
                   a_total_pasos += a_arr_pasos[i];
               }

               a_total_pasos = Math.round(a_total_pasos * zancada);

               //TIEMPO
               a_tiempo = Math.round(a_tiempo);

               //CALCULAR CALORIAS
               a_kcalorias = calcular_calorias(a_tiempo);

               //CALCULAR VICTORIA O DERROTA
               if (a_set3 == '' || a_set3 == null) {
                   a_set3 == '-/-';
               }
               a_resultado = calcular_victoria_derrota(a_set1, a_set2, a_set3);

               if (a_resultado == true) {
                   a_resultado = "Victoria";
               } else {
                   a_resultado = "Derrota";
               }

               gestion_consultas();


           });
       });
   }


   /****************************** PARTIDO B *****************************************/

   function showRecords_b() {

       var dataset;

       db.transaction(function (tx) {

           tx.executeSql(seleccionar_partido, [Number(id_b)], function (tx, result) {

               dataset = result.rows;
               var item = null;

               for (var i = 0; i < dataset.length; i++) {
                   item = dataset.item(i);


                   b_fecha = item['fecha'];
                   b_hora = item['hora'];
                   b_club = item['club'];
                   b_tipo_pista = item['tipo_pista'];
                   b_r_reves = item['r_reves'];
                   b_r_derecha = item['r_derecha'];
                   b_posicion = item['posicion'];
                   b_compi = item['compi'];

                   b_set1 = item['set1'];
                   b_set2 = item['set2'];
                   b_set3 = item['set3'];

                   b_tiempo = Number(item['tiempo']);

                   b_max_derecha = Number(item['max_derecha']);
                   b_max_reves = Number(item['max_reves']);
                   b_max_remate = Number(item['max_remate']);

                   var dato1 = item['g_derechas'];
                   var dato2 = item['g_reveses'];
                   var dato3 = item['g_globo_der'];
                   var dato4 = item['g_globo_rev'];
                   var dato5 = item['g_remates'];

                   var dato6 = item['v_derechas'];
                   var dato7 = item['v_reveses'];
                   var dato8 = item['v_globo_der'];
                   var dato9 = item['v_globo_rev'];
                   var dato10 = item['v_remates'];

                   var dato11 = item['pasos'];

               }


               //SPLIT
               b_arr_g_dere = dato1.split(",");
               b_arr_g_reve = dato2.split(",");
               b_arr_g_glod = dato3.split(",");
               b_arr_g_glor = dato4.split(",");
               b_arr_g_rema = dato5.split(",");

               b_arr_v_dere = dato6.split(",");
               b_arr_v_reve = dato7.split(",");
               b_arr_v_glod = dato8.split(",");
               b_arr_v_glor = dato9.split(",");
               b_arr_v_rema = dato10.split(",");

               b_arr_pasos = dato11.split(",");



               //PASAR DE GRADOS/S A M/S
               //radianes * radio * 10 = m/s - 10 es una correccion de arduino

               var grad_rad_dr = (0.0174533 * radio_dr) * 10;

               var grad_rad_m = (0.0174533 * radio_mate) * 10;


               //CALCULAR MÁXIMAS

               b_max_derecha = Math.round(b_max_derecha * grad_rad_dr);
               b_max_reves = Math.round(b_max_reves * grad_rad_dr);
               b_max_remate = Math.round(b_max_remate * grad_rad_m);


               //CALCULAR MEDIAS

               var t_v_dere = 0;
               var t_v_reve = 0;
               var t_v_glod = 0;
               var t_v_glor = 0;
               var t_v_rema = 0;


               for (i = 0; i < b_arr_v_dere.length; i++) {

                   b_arr_v_dere[i] = Number(b_arr_v_dere[i]);
                   b_arr_v_reve[i] = Number(b_arr_v_reve[i]);
                   b_arr_v_glod[i] = Number(b_arr_v_glod[i]);
                   b_arr_v_glor[i] = Number(b_arr_v_glor[i]);
                   b_arr_v_rema[i] = Number(b_arr_v_rema[i]);

                   b_arr_v_dere[i] = Math.round(b_arr_v_dere[i] * grad_rad_dr);
                   b_arr_v_reve[i] = Math.round(b_arr_v_reve[i] * grad_rad_dr);
                   b_arr_v_glod[i] = Math.round(b_arr_v_glod[i] * grad_rad_dr);
                   b_arr_v_glor[i] = Math.round(b_arr_v_glor[i] * grad_rad_dr);
                   b_arr_v_rema[i] = Math.round(b_arr_v_rema[i] * grad_rad_m);

                   if (b_arr_v_dere[i] != 0) {
                       b_total_v_dere += b_arr_v_dere[i];
                       t_v_dere++;
                   }

                   if (b_total_v_dere != 0) {
                       b_total_v_reve += b_arr_v_reve[i];
                       t_v_reve++;
                   }

                   if (b_total_v_dere != 0) {
                       b_total_v_glod += b_arr_v_glod[i];
                       t_v_glod++;
                   }

                   if (b_total_v_dere != 0) {
                       b_total_v_glor += b_arr_v_glor[i];
                       t_v_glor++;
                   }

                   if (b_total_v_dere != 0) {
                       b_total_v_rema += b_arr_v_rema[i];
                       t_v_rema++;
                   }
                   //CALCULAR NUMERO DE GOLPES
                   b_arr_g_dere[i] = Number(b_arr_g_dere[i]);
                   b_arr_g_reve[i] = Number(b_arr_g_reve[i]);
                   b_arr_g_glod[i] = Number(b_arr_g_glod[i]);
                   b_arr_g_glor[i] = Number(b_arr_g_glor[i]);
                   b_arr_g_rema[i] = Number(b_arr_g_rema[i]);

                   b_total_g_dere += b_arr_g_dere[i];
                   b_total_g_reve += b_arr_g_reve[i];
                   b_total_g_glod += b_arr_g_glod[i];
                   b_total_g_glor += b_arr_g_glor[i];
                   b_total_g_rema += b_arr_g_rema[i];
               }


               //CALCULAR VELOCIDAD MEDIA
               if (b_total_v_dere != 0) {
                   b_total_v_dere = Math.round(b_total_v_dere / t_v_dere);
               }

               if (b_total_v_dere != 0) {
                   b_total_v_reve = Math.round(b_total_v_reve / t_v_reve);
               }

               if (b_total_v_dere != 0) {
                   b_total_v_glod = Math.round(b_total_v_glod / t_v_glod);
               }

               if (b_total_v_dere != 0) {
                   b_total_v_glor = Math.round(b_total_v_glor / t_v_glor);
               }

               if (b_total_v_dere != 0) {
                   b_total_v_rema = Math.round(b_total_v_rema / t_v_rema);
               }


               //CALCULAR TOTAL GOLPES
               b_total_golpes = b_total_g_dere + b_total_g_reve + b_total_g_glod + b_total_g_glor + b_total_g_rema;

               //CALCULAR TOTAL PASOS
               var tt = 0;
               for (i = 0; i < b_arr_pasos.length; i++) {
                   b_arr_pasos[i] = Number(b_arr_pasos[i]);
                   b_total_pasos += b_arr_pasos[i];
                   tt++;
               }


               b_total_pasos = Math.round(b_total_pasos * zancada);

               //TIEMPO
               b_tiempo = Math.round(b_tiempo);

               //CALCULAR CALORIAS
               b_kcalorias = calcular_calorias(b_tiempo);

               //CALCULAR VICTORIA O DERROTA
               if (b_set3 == '' || b_set3 == null) {
                   b_set3 == '-/-';
               }
               b_resultado = calcular_victoria_derrota(b_set1, b_set2, b_set3);

               if (b_resultado == true) {
                   b_resultado = "Victoria";
               } else {
                   b_resultado = "Derrota";
               }

               gestion_consultas();


           });
       });
   }

   /****************************************/

   function calcular_calorias(tiempo_g) {

       //PASOS CALCULO DE RECORRIDO Y CALORIAS
       var kcalorias = 0;
       var tmb = 0;

       if (sexo == 'masculino') {
           tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
           kcalorias = (tmb / 24) * 6; //calorias consumidas en 1 hora
           kcalorias = (kcalorias / 60) * tiempo_g; //calorias entre minutos por la duracion del partido
       } else {
           tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
           kcalorias = (tmb / 24) * 5.5; //calorias consumidas en 1 hora
           kcalorias = (kcalorias / 60) * tiempo_g;
       }

       return kcalorias = Math.round(kcalorias);
   }

   /****************************************/

   //azul #0088cc - azulclaro #34bcd5 - verde #119904  - verdeclaro #18d105

   /****************************** MOSTRAR DATOS *****************************************/

   function mostrar_datos() {

       if (id_a == "victorias") {

           $("#contenedor_a").html("<div class='col-4' style='text-align: right'>" +
               "<img src='img/ico_copa.png' style='margin-top: 25px;'>" +
               "</div>" +
               "<div class='col-8'>" +
               "<p style='font-size: 15px; text-align: left; margin-top: 50px'>" +
               "<b>MEDIA GLOBAL VICTORIAS</b>" +
               "</p>" +
               "</div>");


       } else if (id_a == "derrotas") {

           $("#contenedor_a").html("<div class='col-4' style='text-align: right'>" +
               "<img src='img/ico_pulgar.png' style='margin-top: 25px;'>" +
               "</div>" +
               "<div class='col-8'>" +
               "<p style='font-size: 15px; text-align: left; margin-top: 30px'>" +
               "<b>MEDIA GLOBAL DERROTAS</b>" +
               "</p>" +
               "</div>");


       } else {

           $("#partido_a").html("<p style='font-size: 15px; line-height: 20px;text-align: left; margin-top: 15px;color:#0088cc'>" +
               "<b>" + a_fecha + " - " + a_hora + "</b><br>" +
               "<b>" + a_club + " - " + a_tipo_pista + "</b><br>" +
               "<b>" + a_r_reves + " - " + a_r_derecha + "</b><br>" +
               "<b>" + a_compi + "</b><br>" +
               "<b>" + a_posicion + "</b><br>" +
               "<b>" + a_resultado + " - " + a_set1 + "  " + a_set2 + "  " + a_set3 + "</b><br>" +
               "</p>");

       }

       if (id_b == "victorias") {

           $("#contenedor_b").html("<div class='col-4' style='text-align: right'>" +
               "<img src='img/ico_copa.png' style='margin-top: 25px;'>" +
               "</div>" +
               "<div class='col-8'>" +
               "<p style='font-size: 15px; text-align: left; margin-top: 50px'>" +
               "<b>MEDIA GLOBAL VICTORIAS</b>" +
               "</p>" +
               "</div>");

       } else if (id_b == "derrotas") {

           $("#contenedor_b").html("<div class='col-4' style='text-align: right'>" +
               "<img src='img/ico_pulgar.png' style='margin-top: 25px;'>" +
               "</div>" +
               "<div class='col-8'>" +
               "<p style='font-size: 15px; text-align: left; margin-top: 30px'>" +
               "<b>MEDIA GLOBAL DERROTAS</b>" +
               "</p>" +
               "</div>");

       } else {

           $("#partido_b").html("<p style='font-size: 15px; line-height: 20px;text-align: left; margin-top: 15px;color:#119904'>" +
               "<b>" + b_fecha + " - " + b_hora + "</b><br>" +
               "<b>" + b_club + " - " + b_tipo_pista + "</b><br>" +
               "<b>" + b_r_reves + " - " + b_r_derecha + "</b><br>" +
               "<b>" + b_compi + "</b><br>" +
               "<b>" + b_posicion + "</b><br>" +
               "<b>" + b_resultado + " - " + b_set1 + "  " + b_set2 + "  " + b_set3 + "</b><br>" +
               "</p>");
       }

       $("#tiempo").html("<span style='color:#0088cc'><b>" + Math.round(a_tiempo) + " </b></span> vs <span style='color:#119904'><b>" + Math.round(b_tiempo) + "</b></span>");
       $("#metros").html("<span style='color:#0088cc'><b>" + Math.round(a_total_pasos) + " m</b></span> vs <span style='color:#119904'><b>" + Math.round(b_total_pasos) + " m</b></span>");
       $("#calorias").html("<span style='color:#0088cc'><b>" + Math.round(a_kcalorias) + " Kcal</b></span> vs <span style='color:#119904'><b>" + Math.round(b_kcalorias) + " Kcal</b></span>");
       $("#golpes").html("<span style='color:#0088cc'><b>" + Math.round(a_total_golpes) + "</b></span> vs <span style='color:#119904'><b>" + Math.round(b_total_golpes) + "</b></span>");
       $("#derechas").html("<span style='color:#0088cc'><b>" + Math.round(a_total_g_dere) + "</b></span> vs <span style='color:#119904'><b>" + Math.round(b_total_g_dere) + "</b></span>");
       $("#reveses").html("<span style='color:#0088cc'><b>" + Math.round(a_total_g_reve) + "</b></span> vs <span style='color:#119904'><b>" + Math.round(b_total_g_reve) + "</b></span>");
       $("#globo_d").html("<span style='color:#0088cc'><b>" + Math.round(a_total_g_glod) + "</b></span> vs <span style='color:#119904'><b>" + Math.round(b_total_g_glod) + "</b></span>");
       $("#globo_r").html("<span style='color:#0088cc'><b>" + Math.round(a_total_g_glor) + "</b></span> vs <span style='color:#119904'><b>" + Math.round(b_total_g_glor) + "</b></span>");
       $("#remate").html("<span style='color:#0088cc'><b>" + Math.round(a_total_g_rema) + "</b></span> vs <span style='color:#119904'><b>" + Math.round(b_total_g_rema) + "</b></span>");


       $("#velocidad_m").html("<p class='tj_dato_medias'>" +
           "<span class='tam_txt'>" + eti_c_d + "</span><span style='color:#0088cc'><b> " + Math.round(a_max_derecha) + " m/s</b> </span> vs <span style='color:#119904'><b>" + Math.round(b_max_derecha) + " m/s </b></span><br>" +
           "<span class='tam_txt'>" + eti_c_r + "</span><span style='color:#0088cc'><b> " + Math.round(a_max_reves) + " m/s</b> </span> vs <span style='color:#119904'><b>" + Math.round(b_max_reves) + " m/s </b></span> <br>" +
           "<span class='tam_txt'>Remate:</span><span style='color:#0088cc'><b> " + Math.round(a_max_remate) + " m/s</b> </span> vs <span style='color:#119904'><b>" + Math.round(b_max_remate) + " m/s </b></span> <br>" +
           "</p>");

       $("#medias").html("<p class='tj_dato_medias'>" +
           "<span class='tam_txt'>" + eti_c_der + "</span><span style='color:#0088cc'> " + Math.round(a_total_v_dere) + " m/s </span> vs <span style='color:#119904'>" + Math.round(b_total_v_dere) + " m/s </span><br>" +
           "<span class='tam_txt'>" + eti_c_rev + "</span><span style='color:#0088cc'> " + Math.round(a_total_v_reve) + " m/s </span> vs <span style='color:#119904'>" + Math.round(b_total_v_reve) + " m/s </span> <br>" +
           "<span class='tam_txt'>" + eti_c_glo_der + "</span><span style='color:#0088cc'> " + Math.round(a_total_v_glod) + " m/s </span> vs <span style='color:#119904'>" + Math.round(b_total_v_glod) + " m/s </span> <br>" +
           "<span class='tam_txt'>" + eti_c_glo_rev + "</span><span style='color:#0088cc'> " + Math.round(a_total_v_glor) + " m/s </span> vs <span style='color:#119904'>" + Math.round(b_total_v_glor) + " m/s </span> <br>" +
           "<span class='tam_txt'>Remates:</span><span style='color:#0088cc'> " + Math.round(a_total_v_rema) + " m/s </span> vs <span style='color:#119904'>" + Math.round(b_total_v_rema) + " m/s </span> <br>" +
           "</p>");


       //EJECUTO GRAFICAS

       grafica_1();
       grafica_2();
       grafica_3();
       grafica_4();
       grafica_5();
       grafica_6();
       //grafica_7(); grafica esfuerzo analizar
       grafica_8();
       grafica_9();
       grafica_10();
       grafica_11();
   }



   /****************************************/



   var altura = 0;
   var peso = 0;
   var edad = 0;
   var sexo = '';
   var mano = '';
   var radio_mate = 0;
   var radio_dr = 0; //radio derecha reves
   var zancada = 0;

   var eti_der = 'Derechas';
   var eti_rev = 'Revéses';
   var eti_glo_der = 'Globo D.';
   var eti_glo_rev = 'Globo R.';
   var eti_vm_glo_der = 'V.M. Glo. Der.';
   var eti_vm_glo_rev = 'V.M. Glo. Rev.';

   var eti_c_d = 'Derecha:';
   var eti_c_r = 'Revés:';
   var eti_c_der = 'Derechas:';
   var eti_c_rev = 'Revéses:';
   var eti_c_glo_der = 'Globos derechas';
   var eti_c_glo_rev = 'Globo revéses';


   function perfil() {
       var dataset;

       db.transaction(function (tx) {
           tx.executeSql(seleccionar_perfil, [], function (tx, result) {

               dataset = result.rows;
               var item = null;


               for (var i = 0, item = null; i < dataset.length; i++) {
                   item = dataset.item(i);

                   altura = Number(item['altura']);
                   peso = Number(item['peso']);
                   edad = Number(item['edad']);
                   sexo = item['sexo'];
                   mano = item['mano'];
               }
               if (altura > 200) {
                   radio_mate = 1.2; //valor en metros
                   radio_dr = 1;
                   zancada = 0.9;
               } //medidas en cm
               if (altura >= 180 && altura <= 189) {
                   radio_mate = 1.1;
                   radio_dr = 0.9;
                   zancada = 0.7;
               }
               if (altura >= 160 && altura <= 179) {
                   radio_mate = 1;
                   radio_dr = 0.8;
                   zancada = 0.6;
               }
               if (altura >= 140 && altura <= 159) {
                   radio_mate = 0.8;
                   radio_dr = 0.7;
                   zancada = 0.5;
               }
               if (altura >= 120 && altura <= 139) {
                   radio_mate = 0.6;
                   radio_dr = 0.5;
                   zancada = 0.4;
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

                   $('.t_g_derecha_reves').html(' Globos revés/derecha ');

                   $('.t_vmderechas').html(' V.M. Revéses ');
                   $('.t_vmreveses').html(' V.M. Derechas ');

                   $('.t_g_vmderechas').html(' V.M. Globos de revés ');
                   $('.t_g_vmreveses').html(' V.M. Globos de derecha ');

                   eti_der = 'Revéses';
                   eti_rev = 'Derechas';
                   eti_glo_der = 'Globo R.';
                   eti_glo_rev = 'Globo D.';
                   eti_vm_glo_der = 'V.M. Glo. Rev.';
                   eti_vm_glo_rev = 'V.M. Glo. Der.';

                   eti_c_d = 'Revés:';
                   eti_c_r = 'Derecha:';
                   eti_c_der = 'Revéses:';
                   eti_c_rev = 'Derechas:';
                   eti_c_glo_der = 'Globos revéses';
                   eti_c_glo_rev = 'Globo derechas';

                   $('.t_cc_d').html('Golpes Revéses');
                   $('.t_cc_r').html('Golpes Derechas');
                   $('.t_cc_v_d').html('Velocidad Revéses');
                   $('.t_cc_v_r').html('Velocidad Derechas');
               }

           });
       });
   }

   var pass = 0;

   function gestion_consultas() {


       if (pass == 0) {

           if (id_a == "victorias") {

               showRecords_victorias_a();

           } else {

               showRecords_a();
           }
       }

       if (pass == 1) {

           if (id_b == "derrotas") {

               showRecords_derrotas_b();

           } else {

               showRecords_b();
           }
       }


       if (pass == 2) {

           mostrar_datos();
       }

       pass++;
   }



   /****************************************/

   $(document).ready(function () {


       perfil();

       gestion_consultas();

   });
