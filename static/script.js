main = {
    arr: []
}

var fn = function () {
    var parDiv = $("#articles");
    var arrObj = JSON.parse(main.arr)
    for (var key in arrObj) {
        if (arrObj.hasOwnProperty(key)) {
            console.log(key + " -> " + arrObj[key]);
            var newLink = $("<a>").attr("href",arrObj[key]).text(key)
            var newDiv = $("<li>")
            newDiv.append(newLink)
            parDiv.append(newDiv);
        }
}
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:7000/getNews",
        dataType: "json",
        success: function (responsemsg) {
            main.arr = (JSON.stringify(responsemsg));
            console.log(main.arr)
            fn();
        },
        error: function (msg) {
            console.log("error");
        },
    })
})