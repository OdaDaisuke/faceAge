<?php
require_once dirname(__FILE__) . '/config.php';
require_once dirname(__FILE__) . '/Render.php';
require_once dirname(__FILE__) . '/Lib/Alchemy.php';

trait FileLoader {
	public static function loadFile($filename) {
		require_once dirname(__FilE__) . '/' . $filename;
	}
}

class Bootstrap {
	use FileLoader;
}