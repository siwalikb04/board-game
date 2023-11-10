function assignNames() {
    localStorage.setItem('player1Name', $("#p1Name").val());
    localStorage.setItem('player2Name', $("#p2Name").val());
}


$(".default>ion-checkbox").on("ionChange",()=>{
    if ($(".default>ion-checkbox").prop("checked")){
        $("#p1Name").val("Player 1");
        $("#p2Name").val("Player 2");
    }
    else{
        $("#p1Name").val("");
        $("#p2Name").val("");
    }
});

$("#p1>ion-icon").on("click",()=>{
    if ($("#p1Name").val()=="Player 1")
        $("#p1Name").val("");
    else
        $("#p1Name").val("Player 1");
});

$("#p2>ion-icon").on("click",()=>{
    if ($("#p2Name").val()=="Player 2")
        $("#p2Name").val("");
    else
        $("#p2Name").val("Player 2");
});

$("html").ready(()=>{
    $("section").css("background-image","url(../background/cool"+Math.ceil(Math.random()*12)+".png)");
    localStorage.setItem('player1Name', "");
    localStorage.setItem('player2Name', "");
});






