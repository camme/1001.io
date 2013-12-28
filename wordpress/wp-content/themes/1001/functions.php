<?php

################################################################################
#logging
################################################################################

function dump($data){
    echo "<pre>" . print_r($data, true) . "</pre>";
}

function e($data) {
    error_log(print_r($data, true));
}


################################################################################
# json getters
################################################################################


# menu

function get_menu_id($menu_name){
    $menu_list = get_nav_menu_locations();

    if (isset($menu_list[$menu_name])){
        return $menu_list[$menu_name];
    }

    return false;
}

function get_menu_children_from_array(&$menu_list, $parent_menu = 0){

    $children = array();

    $menu_count = count($menu_list);

    // loop all the existing menu items and splice off children to the current parent
    // also check if the menu item exists (this is relevant in the case where no menu items have children)
    for($i = 0; $i < $menu_count && isset($menu_list[$i]); $i++){

        if( $menu_list[$i]->menu_item_parent == $parent_menu ){
            $child = array_splice($menu_list, $i , 1);
            $menu_item = new stdclass();
            $menu_item->title = $child[0]->title;
            $menu_item->url = $child[0]->url;
            $menu_item->ID = $child[0]->ID;
            array_push($children, $menu_item);

            // dont increment if a child is spliced off (index is decreased by 1 from splicing)
            $i--;
        }
    }

    // if there are any children recurse into their tree and search for grandchildren
    $childrencount = count($children);
    if($childrencount > 0){

        for($i = 0; $i < $childrencount; $i++){

            $child_hirarchy = get_menu_children_from_array($menu_list, $children[$i]->ID);

            if($child_hirarchy != array()) {
                $children[$i]->children = $child_hirarchy;
            }
        }
    }

    return $children;
}

function get_menu_json($menu_name){
    $menu = wp_get_nav_menu_items( get_menu_id($menu_name) );
    return get_menu_children_from_array($menu);
}

# helpers

function send_json($data){
    header("content-type: application/json");
    echo json_encode($data);
}



################################################################################
# init
################################################################################


function init() {

    register_nav_menus(
        array(
          'main' => 'Main menu',
        )
    );

    //include 'post_types/article.php';
    include 'post_types/project.php';
    
}
add_action('init', 'init');


################################################################################
# init
################################################################################

function custom_upload_mimes ( $existing_mimes=array() ) {
    $existing_mimes['svg'] = 'image/svg+xml';
    return $existing_mimes;
}

add_filter('upload_mimes', 'custom_upload_mimes');
