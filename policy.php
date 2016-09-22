<?php
require_once 'app/bootstrap.php';
Render::applyHeader();
?>
<div class="main-content dt">
	<div class="inner">
		<a href="<?= SITE_URL ?>"><h1 class="title"><i class="fa fa-smile-o"></i>FaceCombat</h1></a>
		<h2 class="hd-2">プライバシー・ポリシー</h2>
		<div class="sentence-wrap">
			<p>1.本サービスにおいて撮影された顔写真はいかなる場合においても第３者に開示されることはありません。</p>
			<p>2.撮影された顔写真以外の、本サービスで使用されている画像・アイコンはすべて著作権フリーです。</p>
		</div>
	</div>
</div>
<?php Render::applyFooter(); ?>