/*

* Dragon DEFEATS Shield & Trap
* Nymph DEFEATS Dragon & Sword
* Shield DEFEATS Nymph & Sword
* Sword DEFEATS Dragon & Trap
* Trap DEFEATS Nymph & Shield

*/


$("#name1").html(localStorage.getItem('player1Name')+" : ");
$("#name2").html(localStorage.getItem('player2Name')+" : ");

let go=true;
$("#b1").prop("disabled",true);
$("#b2").prop("disabled",true);
$("#pac1").prop("disabled",true);
$("#pac2").prop("disabled",true);
$("#phc1").prop("disabled",true);
$("#phc2").prop("disabled",true);

let p=["dragon","nymph","shield","slash","trap"];
let p1=[];
let p2=[];

let itemNo=[1,2,3,4,5,6,7,8,9,10];
let creditEarnedP1=0;
let creditEarnedP2=0;

let player1Health=10;
let player2Health=10;
let attack=0;
let heal=0;

$("#toss").on("click",()=>{
    let t=(Math.floor(Math.random()*2)==0)? "Head":"Tail";
    //alert("Toss result: "+t);
    go=(t=="Head")? true:false;
    if(go==true){
        $("#Head").addClass("blurred-image");
        $("#b1").prop("disabled",false);
        $("#pac1").prop("disabled",false);
        $("#phc1").prop("disabled",false);
        $("#pac2").addClass("blurred-image");
        $("#phc2").addClass("blurred-image");
    }
    else{
        $("#Tail").addClass("blurred-image"); 
        $("#b2").prop("disabled",false);
        $("#pac2").prop("disabled",false);
        $("#phc2").prop("disabled",false);
        $("#pac1").addClass("blurred-image");
        $("#phc1").addClass("blurred-image");
    }
    $("#toss").prop("disabled",true);
});


$("#b1").on("click",()=>{
    //alert("B1 is pressed ");
    $("#b1").prop("disabled",true);
    $("#Tail").addClass("blurred-image");
    $("#Head").removeClass("blurred-image");
    $("#b2").prop("disabled",false);
    $("#pac2").prop("disabled",false);
    $("#phc2").prop("disabled",false);
    $("#pac2").removeClass("blurred-image");
    $("#phc2").removeClass("blurred-image");
    $("#pac1").addClass("blurred-image");
    $("#phc1").addClass("blurred-image");
    $("#pac1").prop("disabled",true);
    $("#phc1").prop("disabled",true);
    
    for(var i=6;i<=10;i++){       
        let index=Math.floor(Math.random()*5);
        p1[i-6]=p[index];
        $("#"+i.toString()).attr("src","../icon-images/"+p[index]+".png");
    }
    console.log(p1);
    if(go==false){
        creditEarnedP1=(p1.length!=0 && p2.length!=0)? credits1():0;
        creditEarnedP2=(p1.length!=0 && p2.length!=0)? credits2():0;
        document.querySelector("#c1").innerHTML="<i><b><u>Credits</i></u>: "+"<b>"+creditEarnedP1+"</b>";
        document.querySelector("#c2").innerHTML="<i><b><u>Credits</i></u>: "+"<b>"+creditEarnedP2+"</b>";
    }
    console.log("Player 1: "+creditEarnedP1);
    console.log("Player 2: "+creditEarnedP2);
});
$("#b2").on("click",()=>{
    //alert("B2 is pressed");
    $("#b1").prop("disabled",false);
    $("#Head").addClass("blurred-image");
    $("#Tail").removeClass("blurred-image");
    $("#b2").prop("disabled",true);
    $("#pac1").prop("disabled",false);
    $("#phc1").prop("disabled",false);
    $("#pac1").removeClass("blurred-image");
    $("#phc1").removeClass("blurred-image");
    $("#pac2").addClass("blurred-image");
    $("#phc2").addClass("blurred-image");
    $("#pac2").prop("disabled",true);
    $("#phc2").prop("disabled",true);

    for(var i=1;i<=5;i++){       
        let index=Math.floor(Math.random()*5);
        p2[i-1]=p[index];
        $("#"+i.toString()).attr("src","../icon-images/"+p[index]+".png");
    }
    console.log(p2);
    if(go==true){
        creditEarnedP1=(p1.length!=0 && p2.length!=0)? credits1():0;
        creditEarnedP2=(p1.length!=0 && p2.length!=0)? credits2():0;
        document.querySelector("#c1").innerHTML="<i><b><u>Credits</i></u>: "+"<b>"+creditEarnedP1+"</b>";
        document.querySelector("#c2").innerHTML="<i><b><u>Credits</i></u>: "+"<b>"+creditEarnedP2+"</b>";
    }
    console.log("Player 1: "+creditEarnedP1);
    console.log("Player 2: "+creditEarnedP2);
});


$("#pac1").on("click",()=>{

    //alert("Attack by P1");
    if(creditEarnedP1>=5){
        player2Health-=2;
        creditEarnedP1-=5;
    }
    //console.log(player1Health+" "+creditEarnedP1);
    document.querySelector("#c1").innerHTML="<i><b><u>Credits</i></u>: "+"<b>"+creditEarnedP1+"</b>";
    player2Health=(player2Health<=0)? 0:player2Health;
    document.querySelector("#p2Life").innerHTML="💙".repeat(player2Health);
    if(player2Health==0 && creditEarnedP2<5){
        $("#p2Life").html("!!☠️DEAD☠️!!");
        setTimeout(() => {
            alert(localStorage.getItem('player1Name')+" WINS!! ");
            location.reload();
        }, 1000);
    }
    else if(player2Health==0 && creditEarnedP2>=5)
        $("#p2Life").html("💔 <em><small>REQUIRES</small></em> ❤️‍🩹");
});
$("#pac2").on("click",()=>{

    //alert("Attack by P1");
    if(creditEarnedP2>=5){
        player1Health-=2;
        creditEarnedP2-=5;
    }
    //console.log(player1Health+" "+creditEarnedP1);
    document.querySelector("#c2").innerHTML="<i><b><u>Credits</i></u>: "+"<b>"+creditEarnedP2+"</b>";
    player1Health=(player1Health<=0)? 0:player1Health;
    document.querySelector("#p1Life").innerHTML="❤️".repeat(player1Health);
    if(player1Health==0 && creditEarnedP1<5){
        $("#p1Life").html("!!☠️DEAD☠️!!");
        setTimeout(() => {
            alert(localStorage.getItem('player1Name')+" WINS!! ");
            location.reload();
        }, 1000);
    }
    else if(player1Health==0 && creditEarnedP1>=5)
        $("#p1Life").html("💔 <em><small>REQUIRES</small></em> ❤️‍🩹");
});

$("#phc1").on("click",()=>{

    //alert("P1 is healing");
    if(creditEarnedP1>=3 && player1Health!=10){
        player1Health++;
        creditEarnedP1-=3;
    }
    $("#c1").html("<i><b><u>Credits</i></u>: "+"<b>"+creditEarnedP1+"</b>");
    $("#p1Life").html("❤️".repeat(player1Health));
});

$("#phc2").on("click",()=>{
    
    //alert("P2 is healing");
    if(creditEarnedP2>=3 && player2Health!=10){
        player2Health++;
        creditEarnedP2-=3;
    }
    $("#c2").html("<i><b><u>Credits</i></u>: "+"<b>"+creditEarnedP2+"</b>");
    $("#p2Life").html("💙".repeat(player2Health));
});

/*

* Dragon DEFEATS Shield & Trap
* Nymph DEFEATS Dragon & Sword
* Shield DEFEATS Nymph & Sword
* Sword DEFEATS Dragon & Trap
* Trap DEFEATS Nymph & Shield

*/


function credits1(){
    for(var i=0;i<=5;i++){
        if(p1[i]=="dragon" && (p2[i]=="shield" || p2[i]=="trap"))
            creditEarnedP1++;
        else if(p1[i]=="nymph" && (p2[i]=="dragon" || p2[i]=="sword"))
            creditEarnedP1++;
        else if(p1[i]=="shield" && (p2[i]=="nymph" || p2[i]=="sword"))
            creditEarnedP1++;
        else if(p1[i]=="sword" && (p2[i]=="dragon" || p2[i]=="trap"))
            creditEarnedP1++;
        else if(p1[i]=="trap" && (p2[i]=="nymph" || p2[i]=="shield"))
            creditEarnedP1++;
    }
    return creditEarnedP1;
}

function credits2(){
    for(var i=0;i<=5;i++){
        if(p2[i]=="dragon" && (p1[i]=="shield" || p1[i]=="trap"))
            creditEarnedP2++;
        else if(p2[i]=="nymph" && (p1[i]=="dragon" || p1[i]=="sword"))
            creditEarnedP2++;
        else if(p2[i]=="shield" && (p1[i]=="nymph" || p1[i]=="sword"))
            creditEarnedP2++;
        else if(p2[i]=="sword" && (p1[i]=="dragon" || p1[i]=="trap"))
            creditEarnedP2++;
        else if(p2[i]=="trap" && (p1[i]=="nymph" || p1[i]=="shield"))
            creditEarnedP2++;
    }
    return creditEarnedP2;
}


