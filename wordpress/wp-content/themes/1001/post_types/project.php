<?php

    $labels = array(
        'name'                => _x( 'Projects', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Project', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Project', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent project:', 'text_domain' ),
        'all_items'           => __( 'All Projects', 'text_domain' ),
        'view_item'           => __( 'View project', 'text_domain' ),
        'add_new_item'        => __( 'Add New project', 'text_domain' ),
        'add_new'             => __( 'New project', 'text_domain' ),
        'edit_item'           => __( 'Edit project', 'text_domain' ),
        'update_item'         => __( 'Update project', 'text_domain' ),
        'search_items'        => __( 'Search projects', 'text_domain' ),
        'not_found'           => __( 'No projects found', 'text_domain' ),
        'not_found_in_trash'  => __( 'No projects found in Trash', 'text_domain' ),
    );

    $args = array(
        'label'               => __( 'project', 'text_domain' ),
        'description'         => __( 'project information pages', 'text_domain' ),
        'labels'              => $labels,
        'supports'            => array( ),
        'taxonomies'          => array('post_tag'),
        'hierarchical'        => false,
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
        'rewrite' => array('slug' => 'project'),
    );

    register_post_type( 'project', $args );

