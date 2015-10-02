<?php
// クラスを使用する前に Alchemy::init(); を実行してください。

class Alchemy {
	private static $api_key = '937ccfec370af7d6642363e8fac1178deb474f13';
	private static $analyze_url = 'http://access.alchemyapi.com/calls/url/URLGetRankedImageFaceTags';

	public static function init() {
		self::$analyze_url .= '?outputMode=json&knowledgeGraph=1&apikey=' . self::$api_key . '&url=';
	}

	public static function analyze($target_url) {
		$o = array('Content-Type: application/x-www-form-urlencoded');
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
	public function uploadImage() {
		return true;
	}
}