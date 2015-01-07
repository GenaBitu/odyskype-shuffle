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
                    //$data["characters"][$key]["available"] = false;
                }
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
