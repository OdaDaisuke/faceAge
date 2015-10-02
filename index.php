<?php
require_once 'app/bootstrap.php';
Render::applyHeader();
?>
<div class="main-content dt">
	<div class="dtc center">
		<h1 class="title"><i class="fa fa-smile-o"></i>顔面戦闘力スカウター</h1>
		<button id="lets_shot" class="btn btn--default"><i class="fa fa-camera fa-fw"></i> 顔写真を撮る</button>
		<p>
			<ul class="row container">
				<li class="col s12 m6 l4 center pr-1 pl-1">
					<p>
						<i class="fa fa-users white-text"></i>
						<span class="caption-col white-text">顔年齢チェック</span>
					</p>
					<p class="white-text">
						人工知能APIを利用し、あなたの顔年齢をチェックします。プログラムで顔年齢を算出するので年齢のずれはご了承ください。
					</p>
				</li>
				<li class="col s12 m6 l4 pr-1 pl-1">
					<P>
						<i class="fa fa-users white-text"></i>
						<span class="caption-col white-text">戦闘力算出</span>
					</p>
					<p class="white-text">
						撮影した顔写真を基に、あなたの顔面戦闘力を算出します。カメラの画質や、表情によって変化するので色々とお試しください。
					</p>
				</li>
				<li class="col s12 m6 l4 pr-1 pl-1">
					<p>
						<i class="fa fa-users white-text"></i>
						<span class="caption-col white-text">プライバシーは守ります。</span>
					</p>
					<p class="white-text">
						当サービスにおいて、撮影された顔写真はすべて撮影後削除されます。ご安心ください。
					</p>
				</li>
			</ul>
		</p>
		<p><small class="block"><a href="policy.php">プライバシー・ポリシー</a></small></p>
	</div>
</div>
<section class="camera-form" id="cameraForm">
	<div class="inner">
		<div class="center">
			<h2 class="lookat">カメラを見てください！</h2>
			<video id="previewVideo" autoplay class="preview-video dnone" src="" width="500" height="300"></video>
			<canvas id="previewCanvas" class="preview-canvas dnone" width="500" height="300"></canvas>
			<img src="http://www.hdrank.com/images/upload/keyword/284/5010/3389.jpg" alt="あなたが今撮影した写真" class="previewPhoto dnone preview-photo dnone">
		</div>
		<div class="center">
			<p>
				<button id="shot" class="btn btn--default btn--circle dnone margin-center"><i class="fa fa-camera fa-2x"></i></button>
				<div id="confirm_use_image" class="dnone margin-center">
					<p>この写真を使いますか？</p>
					<button class="photo_use_this btn btn--default btn--circle">はい</button>
					<button class="photo_try_again btn btn--default btn--circle">もう一回試す</button>
				</div>
			</p>
			<button id="shot_cancel" class="shot_cancel btn btn--close btn--circle"><i class="fa fa-close fa-fw"></i>キャンセル</button>
		</div>
	</div>
</section>
<section id="analyzingOverlay" class="overlay dnone">
	<div class="loading loader-inner ball-grid-pulse dtc">
		<h2 class="white-text">ちょっとまってね...</h2>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</section>
<section id="analyze_result" class="dnone fixed-card center">
	<h2 class="caption-result">あなたの顔面戦闘力<i class="fa fa-thumbs-up"></i></h2>
	<div id="face_analyze_rs" class="result-canvas">
		<p>
			<img src="http://www.hdrank.com/images/upload/keyword/284/5010/3389.jpg" alt="あなたが今撮影した写真" class="previewPhoto dnone preview-photo dnone">
		</p>
		<p>
			<div class="text-card">推定<span id="analyze_age" class="text-card-approach"></span></div>
			<div class="text-card">推定性別:<span id="analyze_gender" class="text-card-approach"></span></div>
		</p>
		<p>
			<p class="analyze-row">推定身長 : <span id="analyze_height"></span></p>
		</p>
		<p>
			<p class="analyze-row">攻撃力(上限100万) : <span id="analyze_attack"></span></p>
		</p>
	</div>
	<p id="" class="">結果説明文</p>
	<p>
		<button class="shot_cancel btn btn--complete btn--circle"><i class="fa fa-check"></i>完了</button>
		<button class="photo_try_again btn btn--default btn--circle">もう一回試す</button>
	</p>
</section>
<?php Render::applyFooter(); ?>