  //RECOJO ID DE LA URL

  var id;
  //recoger variable id de la url
  enlace = location.search;
  //elimino ?
  cadVariables = location.search.substring(1, location.search.length);
  //separo cadena a variables con dato
  arrVariables = cadVariables.split("&");
  //separo tipo de variable y variables del valor y recompongo

  for (i = 0; i < arrVariables.length; i++) {
      arrVariableActual = arrVariables[i].split("=");

      /*if (isNaN(parseFloat(arrVariableActual[1]))){
				document.write(arrVariableActual[0]+"='"+arrVariableActual[1]+"';");
			}else{
				document.write(arrVariableActual[0]+"="+arrVariableActual[1]+";");
			}*/
  }

  var id = arrVariableActual[1];

  //compruebo
  //alert (id);

  //preparo enlace a datos partido
  function ir_a_mi_partido() {
      location.href = "mi_partido.html?id=" + id;
  }


  //  Declare SQL Query for SQLite

  var seleccionar_todo = "SELECT * FROM Partidos";

  var seleccionar_partido = "SELECT * FROM Partidos WHERE id=?";

  var actualizar = "UPDATE Partidos SET club = ?, tipo_pista = ?, r_reves = ?, r_derecha = ?, compi = ?, posicion = ?, set1 = ?, set2 = ?, set3 = ? WHERE id=?";

  var db = openDatabase("Memory", "1.0", "Pala Memory", 10 * 1024 * 1024); // Open SQLite Database 10MB


  var dataset;
  var DataType;


  var club;
  var tipo_pista;
  var r_reves;
  var r_derecha;
  var compi;
  var posicion;
  var set1;
  var set2;
  var set3;


  //datos eventuales
  var duracion_partido = 50;



  //autocomplete
  var amigos = [];
  var clubs = [];

  function lista_autocompletar() {

      db.transaction(function (tx) {

              tx.executeSql(seleccionar_todo, [], function (tx, result) {

                      dataset = result.rows;
                      var item = null;

                      for (var i = 0; i < dataset.length; i++) {

                          item = dataset.item(i);

                          if (item['r_reves'] == '' || item['r_reves'] == null) {} else {

                              //amigos
                              if ($.inArray(item['r_reves'], amigos) == -1) {
                                  amigos.push(item['r_reves']);
                              }
                              if ($.inArray(item['r_derecha'], amigos) == -1) {
                                  amigos.push(item['r_derecha']);
                              }
                              if ($.inArray(item['compi'], amigos) == -1) {
                                  amigos.push(item['compi']);
                              }
                          }

                          if (item['club'] == '' || item['club'] == null) {} else {

                              //clubs
                              if ($.inArray(item['club'], clubs) == -1) {
                                  clubs.push(item['club']);
                              }

                          }
                      }

                          amigos = amigos.sort();
                          clubs = clubs.sort();
                          //console.log(amigos);
                          //console.log(clubs);

                      });
              });
      }



      function onError(tx, error) { // Function for Hendeling Error...
          alert(error.message);
      }



      function updateRecord() {

          club = $('#club').val();
          tipo_pista = $('#tipo_pista').val();
          r_reves = $('#r_reves').val();
          r_derecha = $('#r_derecha').val();
          compi = $('#compi').val();
          posicion = $('input:radio[name=posicion]:checked').val();
          tipo_pista = $('input:radio[name=tipo_pista]:checked').val();

          //compongo los resultados

          s1 = $('select[id=set1]').val();
          s2 = $('select[id=set2]').val();
          s3 = $('select[id=set3]').val();
          s1r = $('select[id=set1r]').val();
          s2r = $('select[id=set2r]').val();
          s3r = $('select[id=set3r]').val();

          set1 = s1 + "/" + s1r;
          set2 = s2 + "/" + s2r;
          set3 = s3 + "/" + s3r;



          db.transaction(function (tx) {
              tx.executeSql(actualizar, [club, tipo_pista, r_reves, r_derecha, compi, posicion, set1, set2, set3, Number(id)], loadAndReset, onError);
          });
      }



      function showRecords() { // Function For Retrive data from Database Display records as list

          db.transaction(function (tx) {

              tx.executeSql(seleccionar_partido, [Number(id)], function (tx, result) {

                  dataset = result.rows;

                  //comprueba si hay un registro o la tabla está vacía
                  var item = null;

                  item = dataset.item(0);


                  if (item['club'] == null || item['club'] == "") {

                  } else {
                      $('#club').val(item['club']);
                  }

                  if (item['tipo_pista'] == null || item['tipo_pista'] == "") {} else {
                      if (item['tipo_pista'] == 'indoor') {
                          $("#indoor").attr('checked', true);
                      } else {
                          $("#outdoor").attr('checked', true);
                      }
                  }

                  if (item['r_reves'] == null || item['r_reves'] == "") {} else {
                      $('#r_reves').val(item['r_reves']);
                  }

                  if (item['r_derecha'] == null || item['r_derecha'] == "") {} else {
                      $('#r_derecha').val(item['r_derecha']);
                  }

                  if (item['compi'] == null || item['compi'] == "") {} else {
                      $('#compi').val(item['compi']);
                  }

                  if (item['posicion'] == null || item['posicion'] == "") {} else {
                      if (item['posicion'] == 'derecha') {
                          $("#derecha").attr('checked', true);
                      } else {
                          $("#reves").attr('checked', true);
                      }
                  }

                  console.log("set1= " + item['set1'])


                  if (item['set1'] == '' || item['set1'] == null) {} else { //si lee por primera vez y no hay datos evita un error

                      arr_set1 = item['set1'].split("/");

                      if (arr_set1[0] != '-') {
                          $("#set1 option[value=" + arr_set1[0] + "]").attr("selected", true);
                      }
                      if (arr_set1[1] != '-') {
                          $("#set1r option[value=" + arr_set1[1] + "]").attr("selected", true);
                      }
                  }

                  if (item['set2'] == '' || item['set2'] == null) {} else {

                      arr_set2 = item['set2'].split("/");

                      if (arr_set2[0] != '-') {
                          $("#segundo_set").css("display", "block");
                          $("#set2 option[value=" + arr_set2[0] + "]").attr("selected", true);
                      }

                      if (arr_set2[1] != '-') {
                          $("#segundo_set").css("display", "block");
                          $("#set2r option[value=" + arr_set2[1] + "]").attr("selected", true);
                      }
                  }

                  if (item['set3'] == '' || item['set3'] == null || item['set3'] == "-/-") {

              

                  } else {

                      arr_set3 = item['set3'].split("/");

                      $("#tercer_set").css("display", "block");
                      $("#tercer_set").css("display", "block");

                      $("#set3 option[value=" + arr_set3[0] + "]").attr("selected", true);
                      $("#set3r option[value=" + arr_set3[1] + "]").attr("selected", true);
                  }

              });
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



      //***************************************************************
      //***************************************************************

      $(document).ready(function () { // Call function when page is ready for load..

          showRecords();

          //INSERTO EL FORMULARIO EN BBDD
          $("#enviar").on('click', function () {
              updateRecord();
          });

          /**********************AUTOCOMPLETAR**************************************/

          lista_autocompletar();


          $(".amigos").autocomplete({
              source: amigos
          });

          $(".clubs").autocomplete({
              source: clubs
          });

          /****************************************************************************/
      });
