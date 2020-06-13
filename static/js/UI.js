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
            if(theme=="dark"){
                elemClass.classList.remove("light")
            }else{
                elemClass.classList.remove("dark")
            }
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
    localStorage.setItem("theme",swithced_theme)
    theme=swithced_theme
    loadTheme()
}