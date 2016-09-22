<?php

class Alchemy {
	private static $api_key_alchemy = '';
	private static $api_key_pux = '';
	private static $analyze_url = 'http://access.alchemyapi.com/calls/url/URLGetRankedImageFaceTags';

	public static function init() {
		self::$analyze_url .= '?outputMode=json&knowledgeGraph=1&apikey=' . self::$api_key_alchemy . '&url=';
	}

	public static function analyze($target_url) {
		$target_url = self::$analyze_url . urlencode($target_url);

		return file_get_contents($target_url);

		return [
			'states' => 'OK',
			'imageFaces' => [
				'age' => array(
					'ageRange' => '15-25',
					'score' => '0.864089'
				),
				'gender' => array(
					'gender' => 'MALE',
					'score' => '0.545558'
				)
			]
		];
	}
	
	// 画像をアップロード
	public static function uploadImage($image_binary) {
		$file_name = self::generateFileName();
		$binary = $image_binary;
		
		// 引数がURLだったらfile_get_contents()
		if(self::matchURL($image_binary)) {
			return $image_binary;
		} else {
			$ext = self::getImageExt($image_binary);
		}

		$file_name .= $ext;
		$dir = dirname(__FILE__) . '/../../storage/';
		$file_dir = $dir . $file_name;

		if(is_dir($dir)) {
			touch($file_dir);
			chmod($file_dir, 0666 );
			$fp = fopen($file_dir, "w");
			fwrite($fp, $binary);
			fclose($fp);
			// 保存したURLを返す
			return SITE_URL . 'storage/' . $file_name;
		} else {
			return false;
		}
	}
	private static function matchURL($str) {
		return preg_match('/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/', $str);
	}
	// 画像ファイル名を生成
	private static function generateFileName() {
		$str = 'abcdefghijklmnopqrstuvwxyz123456789_-[]()';
		$rs = '';
		for($i = 0;$i < strlen($str);++$i)
			$rs .= $str[rand(0,strlen($str)-1)];
		return $rs;
	}
	private static function getImageExt($image_binary) {
		preg_match_all('/(jpeg|jpg|png|gif)/', $image_binary, $rs);
		return '.png';
	}
}