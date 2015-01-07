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
        $("#name").val(name)
        $.getJSON("data.json", function(data){
            $.each(data.characters, function(i, field) {
                if(field.name == name) {
                    $("#text1").val(field.text1);
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
                if(field.available === true) {
                    availableNames.push(field.name);
                }
            });
        });
        var random = Math.floor(Math.random() * (availableNames.length));
        var text1 = "";
        var text2 = "";
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
                    text1 = field.text1;
                    text2 = field.text2;
                }
            });
        });
        $("#name").val(availableNames[random]);
        localStorage.setItem("name", availableNames[random]);
        $("#text1").val(text1);
        $("#text2").val(text2);
        
        $("#info").fadeIn("slow");
    });
});
