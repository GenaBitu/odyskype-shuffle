/*shuffle.js*/

$(document).ready(function() {
    $.ajaxSetup({ async: false });
    var name = localStorage.getItem("name");
    if(name == undefined) {
        $("#info").hide();
    }
    else {
        $("#generate").attr("disabled", true);
        $("#generate").hide();
        $("#name").val(name);
        $.getJSON("data.json", function(data){
            $.each(data.characters, function(i, field) {
                if(field.name == name) {
                    $("#text1").val(field.text1);
                    $("#text2").val(field.text2);
                }
            });
        });
    }
    
    $("#generate").click(function() {
        $("#generate").attr("disabled", true);
        $("#generate").fadeOut("slow");
        
        var availableNames = [];
        $.getJSON("data.json", function(data){
            $.each(data.characters, function(i, field) {
                if(field.available == true) {
                    availableNames.push(field.name);
                }
            });
        });
        if(availableNames.length == 0) {
            alert("Došly postavy! Máš právo si osobně stěžovat (Jemnýmu).");
            return;
        }
        var random = Math.floor(Math.random() * (availableNames.length));
        $.getJSON("data.json", function(data){
            $.each(data.characters, function(i, field) {
                if (field.name === availableNames[random]) {
                    var ajax = {
                        "action": "disable",
                        "name": availableNames[random]
                    };
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "handler.php",
                        data: ajax
                    });
                    $("#text1").val(field.text1);
                    $("#text2").val(field.text2);
                }
            });
        });
        $("#name").val(availableNames[random]);
        //localStorage.setItem("name", availableNames[random]);
        
        $("#info").fadeIn("slow");
    });
});
