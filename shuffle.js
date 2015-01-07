/*shuffle.js*/

$(document).ready(function() {
    var name = localStorage.getItem("name");
    if (name == undefined) {
        $("#info").hide();
    }
    else {
        $("#generate").attr("disabled", true);
        $("#generate").hide();
        $("#name").val(name)
        $.getJSON("data.json", function(data){
            $.each(data.characters, function(i, field) {
                if (field.name == name) {
                    $("#text1").val(field.text1);
                }
            });
        });
    }
    
    $("#generate").click(function() {
        $("#generate").attr("disabled", true);
        $("#generate").fadeOut("slow");
        
        name = "Barbar Conan";
        $("#name").val(name);
        localStorage.setItem("name", name);
        $("#text1").val("Lorem");
        
        $("#info").fadeIn("slow");
    });
});
