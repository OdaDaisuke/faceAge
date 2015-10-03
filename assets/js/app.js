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
		$previewCanvas = $('#previewCanvas'),

		$confirm_use_image = $('#confirm_use_image'),
		$btn_use_this = $('.photo_use_this'),
		$btn_try_again = $('.photo_try_again'),
		$overlay = $('#analyzingOverlay'),

		// 解析結果表示エリア
		$rs_parse_area = $('#analyze_result'),
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
				$.ajax({
					type : 'POST',
					url : './ajax/faceAnalyze.php',
					dataType : 'json',
					data : {
						image_url : image_url
					},
					success : function(analyze_json) {
						loader.loading('end');
						parser.show();
						parser.rendering(JSON.parse(analyze_json));
					},
					error : function(analyze_json) {
						loader.loading('end');
						alert('解析中にエラーが発生しました。');
						location.reload();
					}
				});
			};
			var upload = function () {
				//ajaxで画像アップロード。
				$.ajax({
					type : 'POST',
					url : './ajax/faceUpload.php',
					dataType : 'json',
					data : {
						image_data : image_data.replace(/^.*,/, ''),
						key : 'ojsafdiwea645wear64wea'
					},
					success : function(url) {
						image_url = url.image_url;
						analyze();
					},
					error : function(url) {
						alert('アップロード中にエラーが発生しました。');
						location.reload();
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
				$previewPhoto.attr('src', image_data);
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
				$detail = $('#analyze_detail'),
				parseResult = function() {
					json.imageFaces = json.imageFaces[0];
					if(json.status == 'OK') {
						var combat_power = {
							ageRange : molder.moldAgeRange(json.imageFaces.age.ageRange),
							gender : molder.moldGender(json.imageFaces.gender.gender),
							height : molder.moldHeight(json.imageFaces.height),
							attack : combat_extractor.generateAttach(json.imageFaces.age.score),
							defense : combat_extractor.generateDefense(json.imageFaces.gender.score),
							detail : null
						};

						combat_power.detail = molder.getDetail(combat_power);
		
						$age.text(combat_power.ageRange);
						$gender.text(combat_power.gender);
						$height.text(combat_power.height);
						$attack.text(combat_power.attack.toLocaleString());
						$detail.text(combat_power.detail);
					}
				};

			$(".previewPhoto").faceu({
				apikey: '5ce21ec6e0c64a1548a85f85bb2189c5',      // APIキー(必須)
				mode: 2,                   // 描画モード
				color: '#0080ff',          // 線の色
				fill: '#0080ff',           // 塗りつぶしの色
				circle: 5,                 // 円の大きさ
				opacity: 0.6,              // 透明度（0～1）
				input_type: 'url',        // 送信方法 (url or file)
				img_url: image_url      // 画像のURL ※送信方法がfileの時は不要
			});

			if(json['status'] !== undefined && json['status'] == 'OK' && json.imageFaces.length > 0) {
				parseResult();
			} else {
				$age.text('年齢:?');
				$gender.text('?');
				$height.text('?');
				$attack.text('?');
				$detail.text('顔を認識できませんでした。');
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
		// 身長と攻撃力を基に詳細文章を返す
		this.getDetail = function(combat) {
			var rs = '';
			var gender = {'male' : 'ボーイ', 'female': 'ガール'};

			// 攻撃力ベース
			if(combat.attack < 1000) {
				rs += '軟弱な';
			} else if(combat.attack < 10000) {
				rs += '面白い';
			} else if(combat.attack < 150000) {
				rs += 'ミーハーな';
			} else if(combat.attack < 400000) {
				rs += '鍛錬中の';
			} else if(combat.attack < 1000000) {
				rs += '強めの';
			} else if(combat.attack < 2500000) {
				rs += '陽気な';
			} else if(combat.attack < 5000000) {
				rs += '戦場の'
			} else if(combat.attack < 7800000) {
				rs += '軍曹級の'
			} else {
				rs += '世界最強の';
			}

			//身長ベース
			if(combat.height < 50) {
				rs += '小人';
			} else if(combat.height < 75) {
				rs += '天使';
			} else if(combat.height < 135) {
				rs += '子供';
			} else if(combat.height < 190) {
				rs += 'イケイケ' + gender[combat.gender];
			} else {
				rs += '神様';
			}

			return rs;
		}
	};
	
	/* 戦闘力を計算して返す
	scoreをもとに攻撃力と防御力を計算
	*/
	var CombatPowerExtracter = function() {
		// 攻撃力
		this.generateAttach = function(score) {
			return Math.floor(score * (Math.random() * 10000000) + Math.random() * 2);
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