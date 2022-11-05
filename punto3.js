//Funcion que genera los resultados de los 4 primeros  puntos 
function llamarFuncionesPunto3(e) {
  
    e.preventDefault();
    dividirIPyMascara(3);
   
    const numBits = document.getElementsByClassName("campoTexto")[3].value;

    //Muestra la red principal
    var direccionPrincipal= calcularRedPrincipal();
    const direccion= document.getElementById('direccionPrincipal');
    direccion.innerHTML = direccionPrincipal;

    //Muestra el broadcast de la red principal
    broadcast=obtenerBroadcastRed(direccionIP);
    const broadcastRed= document.getElementById('direccionBroadcast');
    broadcastRed.innerHTML = broadcast;

    //Muestra la cantidad de subredes que se pueden asignar
    var numeroSubredes = calcularSubredes(numBits);
    const numSubredes= document.getElementById('numSubredes');
    numSubredes.innerHTML = numeroSubredes;

    //Muestra la cantidad de host que se pueden identificar en cada subred
    var mascaraBinaria=convertirMascaraABinario();
    var red= identificarRed(mascaraBinaria);
    var cantBits = 32- red - numBits;
    var host = calcularHostDeSubred(cantBits);
    const numHost= document.getElementById('numHost');
    numHost.innerHTML = host;

    //Muestra dirrecion ip, rango de direcciones y direccion de broadcast de las subredes que se pueden usar 
    var direccionBinaria =pasarIpABinario(direccionIP);
    var listado= calcularIpSubredes(direccionBinaria, numBits,numeroSubredes);
    const listadoDirecciones= document.getElementById('listDirecciones');
    listadoDirecciones.innerHTML = listado;
 
}

//Funcion que resuelve los puntos 5,6,7 y 8 
function llamarFuncionSubred(e){

    e.preventDefault();
    dividirIPyMascara(3);

    const numBits =parseInt( document.getElementsByClassName("campoTexto")[3].value);
    var direccionBinaria =pasarIpABinario(direccionIP);
    const subred = parseInt(document.getElementsByClassName("campoTexto")[4].value);

    /*Muestra listado generado por una subred dada  de dirrecion ip,
     rango de direcciones y direccion de broadcast de las subred */
   
     var lista= calcularSubred(direccionBinaria, numBits, subred);
     const infoSubred= document.getElementById('informacionSubred');
     infoSubred.innerHTML = lista;

 
    //Muestra direccion de una subred especifica 
    var arregloDireccion = generarDireccionArreglo();
    var direcSub = calcularIpSubred(arregloDireccion, numBits, subred);
    var direcCompleta = completarDireccion(direcSub , 0);
    var direc =  binarioAIpDecimal(direcCompleta);
    const direcSubred= document.getElementById('infoSubred');
    direcSubred.innerHTML = direc;

    //Muestra direccion broadcast de una subred especifica
    var arregloDireccion = generarDireccionArreglo();
    var direcBroad = calcularIpSubred(arregloDireccion, numBits, subred);
    var direcCompleta = completarDireccion(direcBroad  , 1);
    var direc =  binarioAIpDecimal(direcCompleta);
    const direcBroadcast= document.getElementById('infoBroadcast');
    direcBroadcast.innerHTML = direc;
  
    // Muestra rango de direcciones que se pueden asignar a un host
    var rango=calcularRango(direccionBinaria, numBits, subred);
    const direcRango= document.getElementById('rangoDireccion');
    direcRango.innerHTML = rango;
}

//Funcion que resuelve el punto 9
function llamarFuncionHost(e){

    e.preventDefault();
    dividirIPyMascara(3);

    const numBits =parseInt( document.getElementsByClassName("campoTexto")[3].value);
    const subred = parseInt(document.getElementsByClassName("campoTexto")[4].value);
    const host = parseInt(document.getElementsByClassName("campoTexto")[5].value);
    var arregloDireccion = generarDireccionArreglo();

    //Muestra la direccion de un host especifico en una subred especifica 
    var direcHost=calcularDireccionHostEspecifico(arregloDireccion, numBits, subred,host)
    const direccHost= document.getElementById('infoHost');
    direccHost.innerHTML = direcHost;

}

//Funcion que resuelve  el punto 10 
function llamarFuncionIpEspecifica(e){

    e.preventDefault();
  
    dividirIPyMascara(7);

    const numBits =parseInt( document.getElementsByClassName("campoTexto")[7].value);
   
    //Muestra la subred a la que pertenece la ip ingresada
    var res= determinarSubred(numBits);
    const subredEsp= document.getElementById('subredNueva');
    subredEsp.innerHTML = res;

}

//Funcion que resuelve el punto 11
function llamarFuncionIpConexion(e){

    e.preventDefault();
  
    //datos de la primera direccion ip 
    dividirIPyMascara(9);
    var direccion1 = direccionIP
    var mascara1= mascara

    //datos de la segunda direccion ip 
    dividirIPyMascara(10);
    var direccion2 = direccionIP
    var mascara2= mascara

    //Muestra si dos direcciones pertenecen a la misma red
    var res= determinarConexion(direccion1,mascara1,direccion2,mascara2);
    var respuesta="las direcciones ingresadas no pertenecen a la misma red"
   
    if (res) {
        respuesta="las direcciones ingresadas pertenecen a la misma red"
    }

    const conexionIp= document.getElementById('conexion');
    conexionIp.innerHTML = respuesta;

}

//Funcion que resuelve el puunto 12
function llamarFuncionNSubredes(e){

    e.preventDefault();
  
    dividirIPyMascara(11);

    const numBits =parseInt( document.getElementsByClassName("campoTexto")[11].value);
    const numSubred =parseInt( document.getElementsByClassName("campoTexto")[12].value);
    const numDirecciones =parseInt( document.getElementsByClassName("campoTexto")[13].value);
   
    //Muestra n cantidad de direcciones ip
    var listaDirec= listarNDirecciones(numBits,numSubred,numDirecciones);

    const nDirec= document.getElementById('nDirecciones');
    nDirec.innerHTML = listaDirec;

}

    //Funcion que calcula la direccion de un host especifico 
    function calcularDireccionHostEspecifico(arregloDireccion, bitSubredes, numeroS,numHost){

        var cadena = calcularIpSubred(arregloDireccion, bitSubredes, numeroS);
        var cantBits = (32 - mascara) - bitSubredes 
        var hostBinario = transformarDecimalBinario(numHost, cantBits).join('');
        var res = binarioAIpDecimal(cadena + hostBinario);
        
        return  res;
    }

    // Funcion que calcula la red principal de una direccion ip 
    function calcularRedPrincipal(){

        var direccionBinario =pasarIpABinario(direccionIP);
        var direccionRecortada= direccionBinario.substring(0,mascara);
        var principalBin= completarDireccion(direccionRecortada,0)
        
        return  binarioAIpDecimal (principalBin)
    }

    //Funcion que calcula que el numero de subredees que se pueden asignar 
    function calcularSubredes (numeroBits){
    
        var cont=0;
        cont= Math.pow(2,numeroBits)-2;
        return cont;

    }

    //Funcion que calcula la cantidad de host que se pueden identificar en cada subred
    function  calcularHostDeSubred(numeroBits){
         
        var cont=0;
        cont= Math.pow(2,numeroBits)-2;
        return cont;
    }

    // Funcion que identifica la red de la direccion ip 
    function identificarRed(mascaraBinaria) {
        var cont = 0;
        let otro = mascaraBinaria.split("");
        for (var i = 0; i < otro.length; i++) {
            if (otro[i] == "1") {
                cont++;
            }
        }
        return cont;
    }

    //Funcion que convierte la direccion ip en binario y a guarda en un arreglo 
    function generarDireccionArreglo(){

        var direccionBinaria =pasarIpABinario(direccionIP);    
        var direccionAux = direccionBinaria.replaceAll('.', '');
        let arregloDireccion = direccionAux.split("");
        return arregloDireccion;
    }

    //Funcion que lista la dirrecion ip, rango de direcciones y direccion de broadcast de las subredes que se pueden usar 
    function calcularIpSubredes(direccionIpBinaria, bitSubredes, numSubredes) {
 
        var direccionAux = direccionIpBinaria.replaceAll('.', '');
        let arregloDireccion = direccionAux.split("");
        var cadena= "";
     
        for (var i = 1; i <= numSubredes; i++) {
            
          cadena += generarInfoSubred(i,arregloDireccion,bitSubredes,numSubredes);
     
        }
     
        return cadena;
    }
    
  //Funcion que dada la subred lista la dirrecion ip, rango de direcciones y direccion de broadcast de las subredes que se pueden usar 
  function calcularSubred(direccionIpBinaria, bitSubredes, subred) {
   
    let arregloDireccion = direccionIpBinaria.split("");
    var cadena= "";
 
    cadena += generarInfoSubred(subred,arregloDireccion,bitSubredes);
 
    return cadena;
}

    // Funcion que brinda la informacion de la subred
    function generarInfoSubred(valor,arregloDireccion,bitSubredes){
    
        var cadena = "";
        cadena +=  "SUBRED  " + valor + ":<br>" + "    ";
         
        var numSubred2 = calcularIpSubred(arregloDireccion, bitSubredes, valor);           
        var direccion = completarDireccion(numSubred2 , 0);
        direccion = direccion.substring(0, direccion.length - 1 ) + 1;
        
        var dirBroadcast = completarDireccion(numSubred2, 1);

        var direccionFinal =  dirBroadcast.substring(0,  dirBroadcast.length - 1 ) + 0;


        cadena += binarioAIpDecimal( completarDireccion(numSubred2 , 0)) + "<br>" + "   ";
        cadena += binarioAIpDecimal(direccion) + "<br>" + "   ";
        cadena += binarioAIpDecimal(direccionFinal) + "<br>" + "   ";
        cadena += binarioAIpDecimal( dirBroadcast) + "<br>" + "<br>";
        
        return cadena;
    }

    //Funcion que calcula la direccion ip de una subred especifica
    function calcularIpSubred(arregloDireccion, bitSubredes, numeroS) {
 
        var contador = 0;
        var tope = mascara + bitSubredes;
       
        let arreglo = arregloDireccion;
        let arregloAuxiliar = transformarDecimalBinario(numeroS, bitSubredes);
      
        for (var i = mascara; i < tope; i++) {
            arreglo[i] = arregloAuxiliar[contador];
            contador++;
        }
      
        return arreglo.join('').substring(0,tope);
    }
    
    //Funcion que completa con 1 o 0 la direccion ip en binario 
    function completarDireccion(direccion,numero){

        while(direccion.length < 32){
            direccion += numero;
        }

        return direccion;
    }

    //Funcion que convierte de decimal a binario ocupando los bits ingresados 
    function transformarDecimalBinario(numero, cantBits) {
      
        var auxiliar = transformarDecimalBinario2(numero);
        let arreglo = auxiliar.split("");
        var numeroNuevo = cantBits - arreglo.length;
        var nuevoArreglo = [];
     
        for (var i = 0; i < cantBits; i++) {
           
            if (i < numeroNuevo) {
                nuevoArreglo[i] = "0";
            } else {
     
                nuevoArreglo[i] = arreglo[i - numeroNuevo];
            }
        }
     
        return nuevoArreglo;
    }

    //Funcion que convierte de decimal a binario 
    function transformarDecimalBinario2(numero) {
        
        var auxiliar = numero.toString(2);
        let arreglo = auxiliar.split("");

        var nuevoArreglo = new Array();
        var numNuevo = 8 - arreglo.length;
          
        for (var i = 0; i < 8; i++) {
            
            if (i < numNuevo) {
                nuevoArreglo[i] = "0";
            } else {
     
                nuevoArreglo[i] = arreglo[i - numNuevo];
            }
        }
     
        return nuevoArreglo.join('');
    }
    
    //Funcion que calcula el rango de direcciones Ip de una subred 
    function calcularRango(direccionIpBinaria, bitSubredes, subred) {
    
        let arregloDireccion = direccionIpBinaria.split("");
        var cadena= "";
    
        cadena += generarRangoSubred(subred,arregloDireccion,bitSubredes);
    
        return cadena;
    }

    //Funcion que genera una cadena con la informacion del rango de una subred 
    function generarRangoSubred(valor,arregloDireccion,bitSubredes){
    
        var cadena = "";
        cadena +=  "SUBRED  " + valor + ":<br>" + "    ";
         
        var numSubred2 = calcularIpSubred(arregloDireccion, bitSubredes, valor);           
        
        var direccion = completarDireccion(numSubred2 , 0);
        direccion = direccion.substring(0, direccion.length - 1 ) + 1;
        
        var dirBroadcast = completarDireccion(numSubred2, 1);
        var direccionFinal =  dirBroadcast.substring(0,  dirBroadcast.length - 1 ) + 0;

        cadena += binarioAIpDecimal(direccion) + "<br>" + "   ";
        cadena += binarioAIpDecimal(direccionFinal) + "<br>" + "   ";
      
        
        return cadena;
    }

    //Funcion que determita la subred de una direccion ip 
    function determinarSubred(bitSubredes){

        var direccionBinario =pasarIpABinario(direccionIP);
        var direccionRecortada= direccionBinario.substring(0,mascara + bitSubredes);
        var direccion= completarDireccion(direccionRecortada,0)
        
        return  binarioAIpDecimal (direccion)
    }
    
    //Funcion que determina si dos direccion ip se encuentran en la misma red 
   function determinarConexion(direccion1,mascara1,direccion2,mascara2) {

    var direccionBinario =pasarIpABinario(direccion1);
    var masc1= direccionBinario.substring(0,mascara1);

    var direccionBinario =pasarIpABinario(direccion2);
    var masc2= direccionBinario.substring(0,mascara2);

    masc1 = completarDireccion(masc1,0);
    masc2 = completarDireccion(masc2,0);

        if(masc1 == masc2){
            return true
        }

    return false;

    }

    //Funcion que genera el listado de n cantidad de direcciones 
    function listarNDirecciones(numBits,numSubred,cantDirecciones){

        var arregloDireccion=generarDireccionArreglo(direccionIP);
        var cadena= ""

         for (let i = 1; i <= cantDirecciones; i++) {
        
            cadena+= calcularDireccionHostEspecifico(arregloDireccion, numBits, numSubred,i) + "<br>"
        
         }        

         return cadena;
    }

    //Genera un ejercicio al azar con dfireccion ip y bits
    function generarEjercicioIPBits(e, numeroEjercicio,num) {
        e.preventDefault();
        var ip= generarIPAleatoria();
        var bit =generarBist(ip);
        direccionConMascara[numeroEjercicio-1].value=ip;
        direccionConMascara[num-1].value=bit;
     }

     //Funcion que genera cantidad de bits aleatoriamente 
     function generarBist(direccion ){
  
        var arreglo = direccion.split("/");
        var valor= Math.floor((32 - arreglo[1])/2) + 1;
        var bit= Math.floor(Math.random() * valor) + 1;

        return bit;
     }

     //Funcion que genera ejercicio de dos direcciones ip aleatoriamente 
     function generarMasIp(e,num,num2){

        e.preventDefault();
        var ip= generarIPAleatoria();
        var ip2= generarIPAleatoria();
        direccionConMascara[num-1].value=ip;
        direccionConMascara[num2-1].value=ip2;
     }
    
      //Funcion que genera un ejercicio al azar del punto 5 al 8 
      function generaEjercicio5(e,num1,num2,num3){

        e.preventDefault();
        var ip= generarIPAleatoria();
        var bit =generarBist(ip);
        var valor= calcularSubredes (bit);
        var subred= Math.floor(Math.random() * (valor - 1)) + 1
        direccionConMascara[num1-1].value=ip;
        direccionConMascara[num2-1].value=bit;
        direccionConMascara[num3-1].value=subred;
 
     }

     //Genera un ejercicio al azar del punto 9
     function generaEjercicio4(e,num1,num2,num3,num4){

        e.preventDefault();
        var ip= generarIPAleatoria();
        var bit =generarBist(ip);
        var host= generarHost(ip,bit);
        var valor= calcularSubredes (bit);
        var subred= Math.floor(Math.random() * (valor - 1)) + 1;
        direccionConMascara[num1-1].value=ip;
        direccionConMascara[num2-1].value=bit;
        direccionConMascara[num3-1].value=subred;
        direccionConMascara[num4-1].value=host;
     }

       //Funcion que genera cantidad de host aleatoriamente 
       function generarHost(direccion,bits){
  
        var arreglo = direccion.split("/");
        var valor= 32 - arreglo[1] - bits;
    
        return valor;
     }

//Genera un ejercicio al azar del punto 12
function generaEjercicio12(e,num1,num2,num3,num4){

    e.preventDefault();
    var ip= generarIPAleatoria();
    var bit =generarBist(ip);
    var valor= calcularSubredes (bit);
    var subred= Math.floor(Math.random() * (valor - 1)) + 1
    var nDirecciones = generarDireccionesAleatorias(ip,bit)

    direccionConMascara[num1-1].value=ip;
    direccionConMascara[num2-1].value=bit;
    direccionConMascara[num3-1].value=subred;
    direccionConMascara[num4-1].value=nDirecciones;
 }

 //Funcion que genera cantidad de direcciones que se van a imprimir
 function generarDireccionesAleatorias(direccion,bits){
  
    var arreglo = direccion.split("/");
    var valor= 32 - arreglo[1] - bits;
    valor =  Math.pow(2,valor);
    var res= Math.floor(Math.random() * (valor - 1)) + 1
    return res;
 }