document.getElementById("icon-menu").addEventListener("click", mostrar_menu);
function mostrar_menu(){
    document.getElementById("headerLeft").classList.toggle('nav-btn');
}


document.getElementById("close-menu").addEventListener("click",ocultar_menu);
function ocultar_menu(){
    document.getElementById("headerLeft").classList.toggle('nav-btn');
}