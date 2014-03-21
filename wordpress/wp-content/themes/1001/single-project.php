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
            $data->post->links = array();

            if( get_field('links') ) {
                while( has_sub_field('links') ) { 
                    $variable = 
                    array_push($data->post->links, array(
                        'link' => get_sub_field('link'),
                        'type' => get_sub_field('link_type'),
                        'text' => get_sub_field('link_text')
                    ));
                }
            }
            break;
        }
        
    }

    $data->menu = get_menu_json('main');

    send_json($data);
    
