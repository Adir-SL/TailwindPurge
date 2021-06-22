function tailwind(){
    window.tailwindClasses = "";
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