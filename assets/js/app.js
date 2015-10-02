$(document).ready(function() {
	function hasGetUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	var $start_shot_target = $('#lets_shot'),
		$cameraForm = $('#cameraForm'),
		$shot_cancel = $('.shot_cancel'),
		$shot = $('#shot'),
		$previewVideo = $('#previewVideo'),
		previewVideo = document.querySelector('#previewVideo'),
		$previewPhoto = $('.previewPhoto'),
		previewPhoto = document.querySelector('#previewPhoto'),
		$previewCanvas = $('#previewCanvas'),

		$confirm_use_image = $('#confirm_use_image'),
		$btn_use_this = $('.photo_use_this'),
		$btn_try_again = $('.photo_try_again'),
		$overlay = $('#analyzingOverlay'),

		// 解析結果表示エリア
		$rs_parse_area = $('#analyze_result'),
		// canvas_face_rs = document.querySelector('#face_analyze_rs'),
		// face_rs_ctx = canvas_face_rs.getContext('2d'),
		$face_analyze_rs = ('#face_analyze_rs'),

		localMediaStream = null,

		canvas = document.querySelector('#previewCanvas'),
		ctx = canvas.getContext('2d'),
		image_url = null,
		image_data = null,
		analyze_json = null,
		camera_called = false;

	function accessToCamera() {
		// If able to access to camera.
		if(hasGetUserMedia()) {
			var onFailSoHard = function(e) {
				console.log('Rejected!', e);
			};

			navigator.webkitGetUserMedia({video:true}, function(stream) {
				var video = document.querySelector('#previewVideo');
				video.src = window.URL.createObjectURL(stream);
				localMediaStream = stream;

			}, onFailSoHard);

		} else {
			alert('すいません。\r\nすいません。\r\nすいません。\r\nカメラへアクセスできませんでした。。。');
		}
	}

	// 顔年齢解析クラス
	var FaceAnalyzer = function() {
		this.analyze = function () {
			var analyze = function() {
				//API叩いて解析
				$.post('./ajax/faceAnalyze.php', {
					image_url : image_url
				}, function(analyze_json) {
					loader.loading('end');
					parser.show();
					parser.rendering(analyze_json);
				});
			};
			var upload = function () {
				//ajaxで画像アップロード。
				$.ajax({
					type : 'POST',
					url : './ajax/faceUpload.php',
					dataType : 'json',
					data : {
						image_data : image_data
					},
					success : function(json) {
						image_url = json;
						image_url = 'http://www.hdrank.com/images/upload/keyword/284/5010/3389.jpg';
						analyze();
					},
					error : function(msg) {
						console.log(msg);
					}
				});
			};
			
			upload();
		};
	};

	// カメラ操作クラス
	var CameraWindow = function() {
		/*
		 * 写真撮影フォームの表示・非表示切替
		 */
		this.show = function() {
			$cameraForm.addClass('visible');
		};
		this.hide = function() {
			$cameraForm.removeClass('visible');
		};

		/*
		 * 写真を撮って表示
		 */
		this.shot = function() {
			// 撮影
			if(localMediaStream) {
				ctx.drawImage(previewVideo, 0, 0, 500, 300);
				image_data = canvas.toDataURL('image/png');
				previewPhoto.src = image_data;
			}
		};

		this.showConfirmUseShot = function() {
			$confirm_use_image.addClass('visible');
		};
		this.hideConfirmUseShot = function() {
			$confirm_use_image.removeClass('visible');
		};

		/*
		 * カメラ操作ボタン、プレビュー画面一式を表示
		 */
		this.openCameraPreview = function() {
			$previewVideo.toggleClass('visible');
			$shot.addClass('visible');

			if(!camera_called) {
				// If able to access to camera.
				if(hasGetUserMedia()) {
					var onFailSoHard = function(e) {
						alert('お使いのコンピュータにはカメラがないか、壊れています。');
					};
					
					var streamLogic = function(stream) {
						var video = document.querySelector('#previewVideo');
						video.src = window.URL.createObjectURL(stream);
						localMediaStream = stream;
					};

					if(!!(navigator.webkitGetUserMedia)) {
						navigator.webkitGetUserMedia({video:true}, function(stream) {
							streamLogic(stream);
						}, onFailSoHard);
					} else if(!!(navigator.mozGetUserMedia)) {
						navigator.mozGetUserMedia({video:true}, function(stream) {
							streamLogic(stream);
						}, onFailSoHard);
					}

				} else {
					alert('すいません。\r\nすいません。\r\nすいません。\r\nカメラへアクセスできませんでした。。。');
				}
				camera_called = true;
			}
		};
		this.hideCameraPreview = function() {
			$previewVideo.removeClass('visible');
			$shot.removeClass('visible');
		};

		this.showPhotoPreview = function() {
			$previewPhoto.addClass('visible');
		};
		this.hidePhotoPreview = function() {
			$previewPhoto.removeClass('visible');
		};
	};

	// loading操作クラス
	var Loader = function() {
		this.loading = function(state) {
			// loadingを表示してスタート
			if(state == 'start') {
				$overlay.addClass('visible');

			// loadingを終わる
			} else if(state == 'end') {
				$overlay.removeClass('visible');
			} else {
				console.error('Loading argument is failed. value : ' + state);
			}
		};
	};

	// 解析結果操作クラス
	var FaceAnalyzeResultParser = function() {
		// jsonを受け取ってHTML成型表示
		this.rendering = function(json) {
			var $age = $('#analyze_age'),
				$gender = $('#analyze_gender'),
				$height = $('#analyze_height'),
				$attack = $('#analyze_attack'),
				parseResult = function() {
					json.imageFaces = json.imageFaces[0];
		
					if(json.status == 'OK') {
						var combat_power = {
							ageRange : molder.moldAgeRange(json.imageFaces.age.ageRange),
							gender : molder.moldGender(json.imageFaces.gender.gender),
							height : molder.moldHeight(json.imageFaces.height),
							attack : combat_extractor.generateAttach(json.imageFaces.age.score),
							defense : combat_extractor.generateDefense(json.imageFaces.gender.score)
						};
		
						$age.text(combat_power.ageRange);
						$gender.text(combat_power.gender);
						$height.text(combat_power.height);
						$attack.text(combat_power.attack);
					}
				};

			if(json.imageFaces.length == 0) {
				$age.text('年齢:?');
				$gender.text('?');
				$height.text('?');
				$attack.text('?');
				alert('顔を認識できませんでした。');
			} else {
				parseResult();
			}

		};
		this.show = function() {
			$rs_parse_area.addClass('visible');
		};
		this.hide = function() {
			$rs_parse_area.removeClass('visible');
		};
	};
	
	// molding = 成型
	// 解析結果を正規表現で成型する
	var AnalyzeRsMolder = function() {
		// 年齢のレンジを成型
		this.moldAgeRange = function(str) {
			// データ形式→「不等号数字」 例) >20
			var p_age = /[0-9]{0,3}$/;
			var p_sign_up = />/;
			var p_age_range = /-/;
			var age = p_age.exec(str);
			var sign = p_sign_up.exec(str);
			var range = p_age_range.exec(str);
			var rs;

			if(range !== null && range == '-') {
				rs = str.replace(/-/, '～') + '歳';
			} else if(sign === '>') {
				rs = age + '歳以上';
			} else {
				rs = age + '歳以下';
			}

			return rs;
		};
		
		//年齢を成型
		this.moldAge = function(str) {
		};
		
		// 性別
		this.moldGender = function(str) {
			if(str == 'MALE') return '男性';
			else return '女性';
		};
		
		// 身長
		this.moldHeight = function(str) {
			var p_age = /[0-9]{0,3}$/;
			var age = p_age.exec(str);

			return age + 'cm';
		};
	};
	
	/* 戦闘力を計算して返す
	scoreをもとに攻撃力と防御力を計算
	*/
	var CombatPowerExtracter = function() {
		// 攻撃力
		this.generateAttach = function(score) {
			return Math.floor(score * (Math.random() * 1000000) + Math.random() * 2);
		};
		
		// 防御力
		this.generateDefense = function(score) {
			return score * 1050;
		};
	};

	var loader = new Loader();
	var camera = new CameraWindow();
	var faceAnalyzer = new FaceAnalyzer();
	var parser = new FaceAnalyzeResultParser();
	var molder = new AnalyzeRsMolder();
	var combat_extractor = new CombatPowerExtracter();

	// Toggle form visibility.
	$shot_cancel.click(camera.hide);
	$start_shot_target.click(camera.show);

	// Hide a camera preview video.
	$shot_cancel.click(function() {
		parser.hide();
		camera.hideCameraPreview();
		camera.hidePhotoPreview();
		camera.hideConfirmUseShot();
	});

	// Open a camera preview video.
	$start_shot_target.click(camera.openCameraPreview);

	// Shot a picture
	$shot.click(function() {
		camera.shot();
		camera.hideCameraPreview();
		camera.showPhotoPreview();
		camera.showConfirmUseShot();
	});

	// If use the photo which taken now.
	$btn_use_this.click(function() {
		loader.loading('start');
		faceAnalyzer.analyze();
	});
	$btn_try_again.click(function() {
		parser.hide();
		camera.hidePhotoPreview();
		camera.openCameraPreview();
		camera.hideConfirmUseShot();
	});
});