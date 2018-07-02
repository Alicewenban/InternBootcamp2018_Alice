var reloadInterval = setInterval(function(){
    reloadPage();
}, 30000);

function requestData() {
    clearInterval(reloadInterval);

    reloadInterval = setInterval(function(){
        reloadPage();
    }, 30000);

    submit();
}

function reloadPage() {
    let postcode = document.getElementById("postcode");
    let text = postcode.value;

    if(text.trim() !== "") {
        submit();
    }
}