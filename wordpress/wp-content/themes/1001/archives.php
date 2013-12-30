<?php

    /*
    Template Name: Archives
    */

    $data = new stdclass();
    $data->template = 'blog';
    $data->posts = array();
    $data->post_title = "Blog";

    $blog_query = new WP_Query($args = array( 'post_type'=> 'post','order'    => 'DESC'));

    if($blog_query->have_posts() ) {
        while ( $blog_query->have_posts() ) {
            $blog_query->the_post();
            $post_item = new stdclass();
            $post_item->post_title = $post->post_title;
            $post_item->excerpt = get_field('excerpt');
            $post_item->permalink = get_permalink($post->ID);
            $post_item->date = $post->post_date;
            $post_item->images = get_field('images');
            $post_item->tags = wp_get_post_tags($post->ID);
            array_push($data->posts, $post_item);
        }

        $data->next_url = get_next_posts_link();
        $data->prev_url = get_previous_posts_link();

    }

    $data->menu = get_menu_json('main');

    send_json($data);
    
