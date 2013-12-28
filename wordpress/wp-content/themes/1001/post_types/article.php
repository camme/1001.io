<?php

    $labels = array(
        'name'                => _x( 'Articles', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Article', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Article', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent article:', 'text_domain' ),
        'all_items'           => __( 'All Articles', 'text_domain' ),
        'view_item'           => __( 'View article', 'text_domain' ),
        'add_new_item'        => __( 'Add New article', 'text_domain' ),
        'add_new'             => __( 'New article', 'text_domain' ),
        'edit_item'           => __( 'Edit article', 'text_domain' ),
        'update_item'         => __( 'Update article', 'text_domain' ),
        'search_items'        => __( 'Search articles', 'text_domain' ),
        'not_found'           => __( 'No articles found', 'text_domain' ),
        'not_found_in_trash'  => __( 'No articles found in Trash', 'text_domain' ),
    );

    $args = array(
        'label'               => __( 'article', 'text_domain' ),
        'description'         => __( 'article information pages', 'text_domain' ),
        'labels'              => $labels,
        'supports'            => array( ),
        'taxonomies'          => array( ),
        'hierarchical'        => true,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'page',
    );

    register_post_type( 'article', $args );

