<?php

    $data = new stdclass();
    $data->template = 'index';
    $data->posts = array();

    if (have_posts()) {

        while (have_posts()) {
            the_post();
            $post_item = new stdclass();
            $post_item->post_title = $post->post_title;
            $post_item->excerpt = get_field('excerpt');
            $post_item->permalink = get_permalink($post->ID);
            $post_item->date = $post->post_date;
            $post_item->images = get_field('images');
            $post_item->tags = wp_get_post_tags();
            array_push($data->posts, $post_item);
        }

        $data->next_url = get_next_posts_link();
        $data->prev_url = get_previous_posts_link();

    }

    $data->projects = array();

    $projects_query = new WP_Query($args = array( 'post_type'=> 'project','order'    => 'ASC'));

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
            array_push($data->projects, $project);
 
        }

    }

    $data->menu = get_menu_json('main');

    send_json($data);
    
