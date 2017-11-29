
    //funcion para editar los estudiantes
    function editarNota(codigoEst){
      var Nota;
      for (var i=0; i<localStorage.length;i++){
        var clave = localStorage.key(i);
        if(clave == codigoEst){
          nota1 = $.parseJSON(localStorage.getItem(clave));

          $("#codigo").val(nota1.codigoEst);
          $("#nombre").val(nota1.nombreEst);
          $("#nota").val(nota1.notaEst);
        }
      }
    }
//Fin funcion para editar

//Inicio funcion para editar Alumnos
function eliminarNota(codigoEst){
  localStorage.removeItem(codigoEst);
reg();
}

//Fin funcion para editar Alumnos

      var estudiantes = [];

      function reg(){
        var tabla ="";
        var parrafo1 = $("#p0");

        tabla += '<table class="striped" border="1">';
        tabla += '<tr>';
        tabla += '<th>CODIGO</th>'
        tabla += '<th>NOMBRE</th>';
        tabla += '<th>NOTA</th>';
        tabla += '</tr>';

        for (var i = 0; i < localStorage.length; i++){
          var clave = localStorage.key(i);
          var nota1 = $.parseJSON(localStorage.getItem(clave));

        tabla += '<tr>';
        tabla += '<td>'+ nota1.codigoEst +'</td>';
        tabla += '<td>'+ nota1.nombreEst +'</td>';
        tabla += '<td>'+ nota1.notaEst +'</td>';
        tabla += '<td><a class="btn btn-floating btn-large cyan pulse" onclick="editarNota(\''+nota1.codigoEst+'\');"><i class="material-icons left">edit</i></a></td>';
        tabla += '<td><a class="btn btn-floating btn-large cyan pulse" onclick="eliminarNota(\''+nota1.codigoEst+'\');"><i class="material-icons left">delete</i></a></td>';
        tabla += '</tr>';

      }
      tabla += '</table>';
      $(parrafo1).html(tabla);
    }




//Inicio de funcion en el  boton para registrar los alumnos
      $("#Registro").click(function(){
        var codigoEst = $("#codigo").val();
        var nombreEst = $("#nombre").val();
        var notaEst = parseFloat(document.getElementById('nota').value);



    var nota1 ={
      codigoEst:codigoEst,
      nombreEst:nombreEst,
      notaEst:notaEst
      };
        localStorage.setItem(codigoEst,JSON.stringify(nota1));
        reg();



        $("#codigo").val("");
        $("#nombre").val("");
        $("#nota").val("");

        reg(codigoEst, nombreEst, notaEst);

        estudiantes.push(
            {
              'codigo':codigoEst,
              'nombre':nombreEst,
              'nota':notaEst
            }
          );



          console.log(estudiantes);
          var suma = 0;
          var numero = 0;
          for (var i in estudiantes) {
            if (!isNaN(estudiantes[i].nota)) {
              numero++;
              suma += estudiantes[i].nota;
            }
          }
          if (numero > 0) {
            alert("Nota promedio: " + (suma / numero));
          }


      });
//Fin de la funcion Registro
//----------------------------------//-----------


//Inicio funcion que recorre el JSON

  function Leerjson(json){
    var out = "Listado de estudiantes<br>";
    for(var i = 0; i< json.length; i++){
      out += "Codigo:" + " "+ json[i].codigo + "</br>"+ "Nombre:"+ " "+ json[i].nombre + "</br> " + "Nota:" + " " +  json[i].nota + "</br>" + "<br>";
    }
    $("#p1").html(out);
  }
//Fin de funcion JSON

//Inicio funcion promedio
function promedio(json){

  var suma = 0;
  var numero = 0;
for (var i in estudiantes){
  if (!isNaN(estudiantes[i].nota)){
    numero++;
    suma += estudiantes[i].nota
  }
}
if(numero > 0 ){
  var out = "La nota promedio de todos los estudiantes es:" + "<br> "+(suma/numero);
  $("#p2").html(out);
}


}
//Fin funcion de promedio

//---------------------------------****--------------------//

//Inicio funcion Nota Mayor
function NotaMy(json) {
  for (var i = 0; i < json.length; i++) {
      var notaMayor = json[i].nota;
      var nombre;
  if (i !== 0) {
  if (json[i].nota > notaMayor) {
  notaMayor = json[i].nota;
  nombre = "";
      }
    }
  }
var out = "El alumno:" + " " + nombre + " " + "Contiene la nota mas alta que es:" + " <strong>" + notaMayor;
$("#p3").html(out);
}
//Fin funcion Nota Mayor

//Inicio funcion nota Menor

function NotaMn(json){

  var i;

    for(i=0; i< json.length; i++){
      if(json[i].nota < 3.6){
        var out = "El alumno:"+ " " + json[i].nombre+ "<br> " + "Contiene la nota mas baja que es:" + " <strong>"+json[i].nota;
        $("#p4").html(out);
      }

    }
  }

$("#json").click(function(){
      Leerjson(estudiantes)
  });

$("#Promedio").click(function(){
        promedio(estudiantes)
  });

$("#NotaMy").click(function(){
   NotaMy(estudiantes);
});
$("#NotaMn").click(function(){
   NotaMn(estudiantes);
});


$(document).ready(function(){
$('.modal').modal();
});

// Fin funcion nota menor
