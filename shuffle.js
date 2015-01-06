/*shuffle.js*/

$(document).ready(function() {
    $("#generate").click(function() {
        $("#generate").attr("disabled", true);
        $("#generate").fadeOut("slow");
        var pname = "Barbar Conan";
        $('#name').val(pname);
        localStorage.setItem('pname', pname);
        $("#name").fadeIn();
        $('#text1').val('Lorem ipsum dolor sit amet consectetur adipiscing elit.');
        $("#text1").fadeIn();
    });
});