main = {
    arr: []
}

selectedRss = "https://www.jpost.com/Rss/RssFeedsHeadlines.aspx"

var fn = function () {
    var parDiv = $("#articles");
    parDiv.empty()
    var arrObj = JSON.parse(main.arr)
    for (var key in arrObj) {
        if (arrObj.hasOwnProperty(key)) {
            var newLink = $("<a>").attr("href",arrObj[key]).text(key)
            var newDiv = $("<li>")
            newDiv.append(newLink)
            parDiv.append(newDiv);
        }
    }
}

function runAj(){
    urlToSend = "http://localhost:7000/getNews?feed="+selectedRss
    $.ajax({
        type: "GET",
        url: urlToSend,
        dataType: "json",
        success: function (responsemsg) {
            main.arr = (JSON.stringify(responsemsg));
            fn();
        },
        error: function (msg) {
            console.log("error");
        },
    })
}

$(document).ready(function () {
    runAj()
})

function bringNews(event){
    selectedRss = $('#newsSelectId').find(":selected").val();
    runAj()
}