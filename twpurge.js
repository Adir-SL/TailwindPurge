function twpurge(){
    window.tailwindClasses = "";
    window.saveRules = "";
    document.body.innerHTML += '<link href="tailwind.css" rel="stylesheet">';
    var x = document.querySelectorAll("*");
    var i;
    for (i = 0; i < x.length; i++) {
        window.tailwindClasses += x[i].classList + " " + x[i].tagName + " ";
    }
    window.tailwindArray = window.tailwindClasses.split(" ");
    window.tailwindFilter = filterArray(window.tailwindArray);
    setTimeout(function(){ findTailwind(); }, 100);
}

function filterArray(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
function matchTailwind(t){
    twrules = document.styleSheets[document.styleSheets.length-1].cssRules;
    var x = twrules;
    var i;
    for (i = 0; i < x.length; i++) {
        if(t.toLowerCase() == x[i].selectorText || "."+t == x[i].selectorText){
            window.saveRules += x[i].cssText+"\n";
        }
    }
}

function findTailwind(){
    var x = window.tailwindFilter;
    var i;
    for (i = 0; i < x.length; i++) {
        if(x[i].indexOf(":") > -1){
            window.tempState = x[i].slice(0,x[i].indexOf(":"));
            x[i] = x[i].slice(x[i].indexOf(":")+1);
            x[i] = "."+window.tempState+"\:"+x[i]+":"+window.tempState;
            console.log(x[i])
        }
        matchTailwind(x[i]);
    }
    console.log(window.saveRules);
    // saveStyles();
}

function saveStyles(){
    blob = new Blob([window.saveRules], { type: 'text/plain' }),
    anchor = document.createElement('a');
    anchor.download = "tailwind_purged.css";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
}

function addButtons(){
    document.body.innerHTML += "<div onclick='twpurge();' style='position:absolute;top:0;left:0;background-color:lightgray;padding:8px 32px;margin:12px;cursor:pointer;border-radius:4px;z-index:999999999999;'>Save CSS file</div>";
}

window.addEventListener('DOMContentLoaded', (event) => {
    addButtons();
});