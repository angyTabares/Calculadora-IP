//constante que guarda todos los campos de texto
const direccionConMascara= document.getElementsByClassName("campoTexto");
//constante que guarda la direccion IP
var direccionIP;
//constante que guarda la mascara de la direccion
var mascara;

//Funcion que llena los elementos html con los resultados de las funciones del punto1
function llamarFunciones(e) {
    e.preventDefault();
    dividirIPyMascara(1);

    if(mascara>=8 && mascara<=32)
    {
        //muestra la mascara en formato decimal
        mascaraDeci=obtenerMascaraEnDecimal();
        const mascara= document.getElementById('mascara');
        mascara.innerHTML = mascaraDeci;
    
        //muestra la direccion de broadcast
        direccionBroadcast=obtenerBroadcastRed(direccionIP);
        const broadcast= document.getElementById('broadcast');
        broadcast.innerHTML = direccionBroadcast;
    
        //muestra los numeros de bits para identificar la red
        numBitsRed=numBitsParaIdentificarRed();
        const bitsRed= document.getElementById('bitsRed');
        bitsRed.innerHTML = numBitsRed;
    
        //muestra los numeros de bits para identificar los hosts
        numHosts= numBitsParaIdentificarHosts();
        const bitsHosts= document.getElementById('bitsHosts');
        bitsHosts.innerHTML = numHosts;
    
        //muestra el numero de direcciones que se pueden asignar a los hosts
        cantiHostsRed=cantidadHostsEnRed();
        const cantHostsRed= document.getElementById('cantHostsRed');
        cantHostsRed.innerHTML = cantiHostsRed;
    
        //muestra el rango de direcciones
        rangoDirecciones= calcularRangoDirecciones(direccionIP);
        const rangoDire= document.getElementById('rangoDirecciones');
        rangoDire.innerHTML ="";
        rangoDirecciones.forEach(direccion => {
            rangoDire.innerHTML += direccion+"-";
        });
       
        //muestra la lista de direcciones que se pueden asignar a los hosts
        listaDirecciones=obtenerListadoHosts(direccionIP);
        const direccionesHosts= document.getElementById('lista');
        direccionesHosts.innerHTML ="";
        listaDirecciones.forEach(direccionH => {
            direccionesHosts.innerHTML += direccionH+"-";
        });
    }
    else
    {
       alert("la mascara debe estar dentro del rango");
       direccionConMascara[0].value="";
    }
   
}

//funcion que separa la ip y la mascara simplificada y la guarda en las constantes
function dividirIPyMascara(numeroEjercicio) {
    
    var arrayipYmascara= direccionConMascara[numeroEjercicio-1].value.split("/");
    direccionIP= arrayipYmascara[0];
    mascara= parseInt(arrayipYmascara[1]);
    
}

//funcion que tranforma la mascara simplificada a mascara decimal 
function obtenerMascaraEnDecimal() {
    
    var mascaraBinario= convertirMascaraABinario();
    var mascaraDecimal= binarioAIpDecimal(mascaraBinario);

    return mascaraDecimal;
}

//funcion que convierte la mascara simplificada a binario
function convertirMascaraABinario() {

    var mascaraBinario= ""
    var bitsRestantes= mascara;

    for (var i = 0; i < 32; i++) {
       if(bitsRestantes>0)
       {
         bitsRestantes= bitsRestantes-1;
         mascaraBinario +="1";
       } 
       else{
         mascaraBinario +="0";
       }
    }
    
   return mascaraBinario;
}

//funcion que transforma una direccion binaria o mascara a decimal
function binarioAIpDecimal(valorBinario) {
    var valorDecimal="";

    for (var i = 0; i < 4; i++) {
        var bin = valorBinario.substring((i * 8) + 0, (i * 8) + 8)
        valorDecimal += parseInt(bin, 2);
        if(i<3){
            valorDecimal += '.';
        }
    }

    return valorDecimal;
}

//funcion que calcula la direccion de broadcast convirtiendo la direccion a binario
function obtenerBroadcastRed(ip) {
    
    var broadcastBinario = ""
    var ipEnBinario = pasarIpABinario(ip);

    for (let i = 0; i < ipEnBinario.length; i++) {
       if(i<mascara)
       {
           broadcastBinario += ipEnBinario[i];
       }
       else
       {
        broadcastBinario += "1";
       }
        
    }

    direccionBroadcast= binarioAIpDecimal(broadcastBinario);
    return direccionBroadcast;
}

//funcion que convierte una direccion ip a formato binario
function pasarIpABinario(dirIP) {
    
    var ipBinario= "";
    var octetos = dirIP.split(".");
    
    for (const octeto in octetos) {
        if (Object.hasOwnProperty.call(octetos,octeto)) {
            var octetoBin = parseInt(octetos[octeto]).toString(2);
            
            while (octetoBin.length<8) {
                octetoBin = 0+octetoBin;
            }
        }
        ipBinario += octetoBin
    }
    return ipBinario;
}

//funcion que calcula el numero de bits utilizados para identificar la red
function numBitsParaIdentificarRed() {

    numBits=mascara;
    return numBits;
} 

//funcion que calcula el numero de bits utilizados para identificar los hosts
function numBitsParaIdentificarHosts() {
    
    numHosts= 32-mascara;
    return numHosts;
}

//funcion que calcula la cantidad de hosts que están en una red
function cantidadHostsEnRed(){

     bitsHosts= numBitsParaIdentificarHosts();

     if (bitsHosts > 1) {
        cantH = Math.pow(2, bitsHosts);
    }
    else{
        
            return 0;
        
    }
    return cantH - 2
}

//funcion que calcula el rango de direcciones que se puede asignar a los hosts con boradcast y red
function calcularRangoDirecciones(ip)
{
    cantidadHosts= cantidadHostsEnRed();
    var direccionRed = obtenerDireccionRed();
    var direccionBroadcast = obtenerBroadcastRed(ip);

    if(cantidadHosts>0)
    {

        var hostMinimoBinario= pasarIpABinario(direccionRed);
        hostMinimoBinario = hostMinimoBinario.substring(0, hostMinimoBinario.length - 1) + '1';
        hostMinimo = binarioAIpDecimal(hostMinimoBinario);

        
        var hostMaximoBinario = pasarIpABinario(direccionBroadcast);
        hostMaximoBinario = hostMaximoBinario.substring(0, hostMaximoBinario.length - 1) + '0';
        hostMaximo = binarioAIpDecimal(hostMaximoBinario);
    }
    else{
        return Array.of(direccionRed,direccionBroadcast);
    }
    return Array.of(direccionRed,hostMinimo,hostMaximo,direccionBroadcast);
}

//funcion que calcula la direccion de la red
function obtenerDireccionRed() {
    
    var direccionRedBin="";
    var direccionIpBin=pasarIpABinario(direccionIP);

    for (let i = 0; i < direccionIpBin.length; i++) {
        if(i<mascara)
        {
            direccionRedBin += direccionIpBin[i];
        }
        else
        {
            direccionRedBin += "0";
        }
         
     }
 
     return binarioAIpDecimal(direccionRedBin);

}

//funcion que obtiene el listado de las direcciones que se pueden asignar a los hosts
function obtenerListadoHosts(ip) {
    var cantidadHosts= cantidadHostsEnRed();


    if(cantidadHosts>0)
    {
        var direccionesHosts = [];

       var bitsRed= pasarIpABinario(ip).substring(0,mascara);
        var bitsHosts= numBitsParaIdentificarHosts();
        
        for (let i = 1; i <=cantidadHosts; i++){
            var binario = i.toString(2);
            while (binario.length<bitsHosts) {
                binario = 0+binario;
                
            } 

            direccionHost = binarioAIpDecimal(bitsRed + binario);
            direccionesHosts.push(direccionHost);

        }
       
    }
    return direccionesHosts;
}

//funcion que genera una direccion ip aleatoria con su repectiva mascara simplificada
function generarIPAleatoria(){

    var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)); 
    mascaraSimplificada = sacarMascaraAdecuada(ip);
    ip += mascaraSimplificada;
    return ip;
}

//funcion que calcula una mascara adecuada a la direccion ip generada aleatoriamente
function sacarMascaraAdecuada(ip ) {
    
    mascaraSimplificada = "";
    ipArray= ip.split(".");
     
    if(ipArray[0]<100)
    {
        mascaraSimplificada +="/"+(Math.floor(Math.random() * (32 - 20) + 20));
    }
    else{
        if(ipArray[0]<10)
        {
            mascaraSimplificada +="/"+(Math.floor(Math.random() * (29-8) + 8));
        }
        else{
            if(ipArray[0]>100)
            {
                mascaraSimplificada +="/"+(Math.floor(Math.random() * (32 - 20) + 20));
            }
            else{
                mascaraSimplificada +="/"+(Math.floor(Math.random() * (32-8) + 8));
            }
        }
    }

    return mascaraSimplificada;
}

//funcion que genera un ejercicio aleatorio 
function generarEjercicio(e, numeroEjercicio) {
   e.preventDefault();
   var ip= generarIPAleatoria();
   direccionConMascara[numeroEjercicio-1].value=ip;
}

//Funcion que llena los elementos html con los resultados de las funciones del punto2 
function llamarFuncionesPunto2(e) {
    e.preventDefault();
    dividirIPyMascara(2);

    if(mascara>=8 && mascara<=32)
    {
        //muestra la direccion de la red del host
        var direccionRedHost = obtenerDireccionRed();
        const direccionRedH= document.getElementById('direccionRed');
        direccionRedH.innerHTML = direccionRedHost;
    
        //muestra la direccion de broadcast de la red
        direccionBroadcastRed=obtenerBroadcastRed(direccionRedHost);
        const broadcastRed= document.getElementById('broadcastRed');
        broadcastRed.innerHTML = direccionBroadcastRed;
    
        //muestra la cantidad de hosts en la red
        cantidadHostsRed=cantidadHostsEnRed();
        const cantidadHostsR= document.getElementById('cantidadHosts');
        cantidadHostsR.innerHTML = cantidadHostsRed;
    
        //muestra el rango de direcciones
        rangoDireccionesHosts= calcularRangoDirecciones(direccionRedHost);
        const rangoDireHosts= document.getElementById('rangoDireccionesHosts');
        rangoDireHosts.innerHTML ="";
        rangoDireccionesHosts.forEach(direccion => {
           rangoDireHosts.innerHTML += direccion+"-";
        });
    
        //muestra la lista de direcciones que se pueden asignar a los hosts
        listaDireccionesHosts=obtenerListadoHosts(direccionRedHost);
        const direccionesHostsR= document.getElementById('listaHostsRed');
        direccionesHostsR.innerHTML ="";
        listaDireccionesHosts.forEach(direccionH => {
            direccionesHostsR.innerHTML += direccionH+"-";
          });
    }
    else
    {
       alert("la mascara debe estar dentro del rango");
       direccionConMascara[1].value="";
    }
}