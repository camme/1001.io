<?php

    /*
    Template Name: Projects
    */

    $data = new stdclass();
    $data->template = 'blog';
    $data->post_title = "Projects";
    $data->posts = array();
    $data->type = "projects";

    $projects_query = new WP_Query($args = array( 'post_type'=> 'project','order' => 'DESC'));

    if($projects_query->have_posts() ) {
        while ( $projects_query->have_posts() ) {
            $projects_query->the_post();

            $project = new stdclass();
            $project->post_title = $post->post_title;
            $project->excerpt = get_field('excerpt');
            $project->permalink = get_permalink($post->ID);
            $project->date = $post->post_date;
            //$project->content = get_field('content');
            $project->images = get_field('images');
            array_push($data->posts, $project);
 
        }

    }


    $data->menu = get_menu_json('main');

    send_json($data);
    
