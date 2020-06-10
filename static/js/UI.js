var theme=""

window.onload=()=>{
    theme=localStorage.getItem("theme")
    if(theme==null || theme==undefined){
        localStorage.setItem("theme","light")
        theme="light"
    }
    console.log(theme)
    loadTheme();
}

function loadTheme(){
    var elements=['.topnav','.landing','.player_form','.input','body','input']
    elements.forEach(elem=>{
        var e=document.querySelectorAll(elem)
        e.forEach(elemClass=>{
            elemClass.classList.add(theme)
        });
    });
}   

function switchTheme(){
    var swithced_theme="";
    if(theme=="light"){
        swithced_theme="dark"
    }else if(theme=="dark"){
        swithced_theme="light"
    }else{
        swithced_theme="dark"
    }
    var elements=document.querySelectorAll("."+theme)
    elements.forEach(elem=>{
        elem.classList.remove(theme)
        elem.classList.add(swithced_theme)
    });
    localStorage.setItem("theme",swithced_theme)
}