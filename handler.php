<?php
function is_ajax() {
  return filter_has_var(INPUT_SERVER, "HTTP_X_REQUESTED_WITH") && strtolower(filter_input(INPUT_SERVER, "HTTP_X_REQUESTED_WITH")) == 'xmlhttprequest' && filter_has_var(INPUT_POST, "action") && !empty(filter_input(INPUT_POST, "action", FILTER_SANITIZE_STRING));
}
if(is_ajax()) {
    $action = filter_input(INPUT_POST, "action", FILTER_SANITIZE_STRING);
    switch($action) {
        case "disable":
            $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING);
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
            $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING);
            $text1 = filter_input(INPUT_POST, "text1", FILTER_SANITIZE_STRING);
            $text2 = filter_input(INPUT_POST, "text2", FILTER_SANITIZE_STRING);
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
