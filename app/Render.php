<?php

class Render {
	private static $applyPath = 'Layout/';

	public static function applyHeader() {
		self::applyPart('Header');
	}
	public static function applyFooter() {
		self::applyPart('Footer');
	}

	public static function applyPart($part_name) {
		require_once dirname(__FILE__) . '/' . self::$applyPath . $part_name . '.php';
	}
}