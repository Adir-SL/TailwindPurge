function twpurge(){
    window.tailwindClasses = "";
    window.saveRules = "";
    document.body.innerHTML += '<link href="tailwind.css" rel="stylesheet">';
    var x = document.body.querySelectorAll("*");
    var i;
    for (i = 0; i < x.length; i++) {
        window.tailwindClasses += x[i].classList;
        window.tailwindClasses += " ";
    }
    // console.log(window.tailwindClasses);
    window.tailwindArray = window.tailwindClasses.split(" ");
    window.tailwindFilter = filterArray(window.tailwindArray);
    console.log(window.tailwindFilter);
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
        if("."+t == x[i].selectorText){
            window.saveRules += x[i].cssText+"\n";
        }
    }
    console.log(window.saveRules);
}

function findTailwind(){
    var x = window.tailwindFilter;
    var i;
    for (i = 0; i < x.length; i++) {
        matchTailwind(x[i]);
    }
}