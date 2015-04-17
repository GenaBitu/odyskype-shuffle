/*add.js*/

$(document).ready(function() {
    $.ajaxSetup({ async: false });
    $("#add").click(function() {
        $("#add").attr("disabled", true);
        
        if($("#name").val() === "" || $("#text1").val() === "" || $("#text2").val() === ""){
            alert("Pole nesmí zůstat prázdná!");
        }
        else {
            var ajax = {
                "action": "add",
               "name": $("#name").val(),
                "text1": $("#text1").val(),
               "text2": $("#text2").val()
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "handler.php",
                data: ajax
            });
            $("#name").val("");
            $("#text1").val("");
            $("#text2").val("");
        }
        $("#add").attr("disabled", false);
    });
    $("#allow_all").click(function() {
        if(confirm("Opravdu povolit všechny postavy?")) {
            var ajax = {
                "action": "allow_all"
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "handler.php",
                data: ajax
            });
        }
    });
});
