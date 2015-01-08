<?php
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && isset($_POST["action"]) && !empty($_POST["action"]);
}
if(is_ajax()) {
    $action = $_POST["action"];
    switch($action) {
        case "disable":
            $name = $_POST["name"];
            $oldJSON = file_get_contents("data.json");
            $data = json_decode($oldJSON, true);
            foreach ($data["characters"] as $key => $entry) {
                if ($entry["name"] == $name) {
                    //$data["characters"][$key]["available"] = false;             // odkomentovat před ostrým nasazením !
                }
            }
            $newJSON = json_encode($data);
            file_put_contents("data.json", $newJSON);
            break;
        case "add":
            $name = $_POST["name"];
            $text1 = $_POST["text1"];
            $text2 = $_POST["text2"];
            $oldJSON = file_get_contents("data.json");
            $data = json_decode($oldJSON, true);
            
            $data["characters"][] = array(
                "name" => $name,
                "available" => true,
                "text1" => $text1,
                "text2" => $text2
            );
            
            $newJSON = json_encode($data);
            file_put_contents("data.json", $newJSON);
            break;
        case "allow_all":
            $oldJSON = file_get_contents("data.json");
            $data = json_decode($oldJSON, true);
            foreach ($data["characters"] as $key => $entry) {
                $data["characters"][$key]["available"] = true;
            }
            $newJSON = json_encode($data);
            file_put_contents("data.json", $newJSON);
            break;
    }
}
else {
    echo("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>OdySkype LARP</title></head><body>Not that easy!</body></html>");
}
?>
