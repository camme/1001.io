<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'ozzo_io');

/** MySQL database username */
define('DB_USER', 'ozzo_io_user');

/** MySQL database password */
define('DB_PASSWORD', 'fdslkfudlkuoi3#1!');

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '&/K<z$qYT`I@226uo-9@J3Z)<@Ub&W1dfYbIgOaT<%.y&ID><,5Q%7vcO9CB!C{s');
define('SECURE_AUTH_KEY',  'b+<+;|ao}eO_]m+N8~Q4H@ZF$Do]N2rCy;<-U55Kz4u@gIJ-Dn;445DespW>A_;t');
define('LOGGED_IN_KEY',    'aKD`S}Zd?j,zLjzlm+pj88 u[L.Sve0m-,g. qCEtjGo+,|.4J-JB<vvuJ_,K,ry');
define('NONCE_KEY',        'lK}kRtrqh*QwF-2sF7Znam/Sq@c;-~1-yTgizNR]GLDX5RY`s0q!KL~63zQMkB4e');
define('AUTH_SALT',        ':wLu:2da *VIGBYi4hH27*Cwub+E_t??UI|4!HsY^f9adPz3{^ka+a>wDbm+1MyU');
define('SECURE_AUTH_SALT', 'h_jg-4KD_&7PQ-RpfPM|- >CnWWze/Zu@BDL:{?hoWI&:93urB{O!^7TuAypLs~=');
define('LOGGED_IN_SALT',   '2TrvQ:!t(z2byip5%;BObz7)/_c| :l{rOW/H&+h-e%53SU#||jYtt-UJCn+>FCn');
define('NONCE_SALT',       'sFO:!#yY?K&t7]^6^P=nb|$5-h;9Vk-esjYJ!dl2jrYB`7pzx+|7Je.(R!W{R|a^');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_1001_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

function WP_LOCATION () 
{
    $script_path = realpath(dirname($_SERVER['SCRIPT_FILENAME']));
    $wp_base_path = realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..');
    $web_subfolder = substr( $script_path, strlen($wp_base_path)); 
    $wp_path = $web_subfolder ? substr( dirname($_SERVER['SCRIPT_NAME']), 0, -strlen($web_subfolder) ) : dirname($_SERVER['SCRIPT_NAME']) ;
    $https = isset($_SERVER['HTTPS']) ? $_SERVER['HTTPS'] : false;
    $retval = 'http' . ($https ? 's' : null) . '://' . $_SERVER['HTTP_HOST'] . $wp_path ;
    return $retval;
}

define('OVERRIDE_URLS', true);

if (OVERRIDE_URLS) 
{
    $wpLocation = WP_LOCATION();
    define('WP_HOME',$wpLocation);
    define('WP_SITEURL',$wpLocation);
    define('WP_CONTENT_URL',$wpLocation."/wp-content");
}




/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
