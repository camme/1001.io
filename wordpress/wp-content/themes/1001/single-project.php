<?php

    $data = new stdclass();
    $data->template = 'post';
    $data->type = 'project';
    $data->post = new stdclass();

    if (have_posts()) {

        while (have_posts()) {
            the_post();
            $data->post->post_title = $post->post_title;
            $data->post->excerpt = get_field('excerpt');
            $data->post->permalink = get_permalink($post->ID);
            $data->post->content = get_field('content');
            $data->post->images = get_field('images');
            $data->post->tags = wp_get_post_tags($post->ID);
            $data->post_title = $post->post_title;
            break;
        }
        
    }

    $data->menu = get_menu_json('main');

    send_json($data);
    
