/*
 * pux_faceu_position.js 0.3.0 - FaceU WebAPI
 *
 * FaceUを利用して、顔の任意のパーツの座標を取得する
 *
 * Copyright (c) 2013 PUX Corporation.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Since:     2013-2-14
 * Modified:  2013-2-15
 *
 * jQuery 1.8.2
 */

/*
 * [使用方法] XHTMLのhead要素内で次のように読み込みます。

<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="js/pux_faceu_position.js"></script>
<script type="text/javascript" src="js/pux_parse.js"></script>

 */

function getFaceUPos(apikey, mode, use, img_url){

    // 初期化
    var service_url = 'http://eval.api.pux.co.jp:8080/webapi/face.do';
    re_val = '';
    arrs = '';
    return_val = ''

    // 変数の初期化
    var img_url       = img_url+"?" + new Date().getTime();
    var limit         = 4096;  // 画像の最大幅


    // API Key が設定されていなければメッセージを表示
    if(apikey == 'none'){
        alert('API key is nothing.')
        return;
    }

    // 送信方法により処理を分岐
    switch(use) {

        // URL指定
        case "url":

            // リクエストを送信するフォーム(非表示)を作成
            $("<form id='dataForm' method='post' style='display:none; width: 1px; height: 1px;' enctype='multipart/form-data'><input type='text' id='apiKey' name='apiKey' value='"+apikey+"' /><input type='text' name='imageURL' id='imageURL' value='"+img_url+"' /></form>").insertAfter("body");

            // フォームを送信
            var myForm = document.getElementById("dataForm");
            var fd = new FormData(myForm);
            var xhr = new XMLHttpRequest();

            // XMLHttpRequest Level2が利用できるか確認
            if(typeof xhr.withCredentials === "undefined"){
                alert("XMLHttpRequest Leve12を利用できません");
                return;
            }

            xhr.open("POST", service_url, false);
            xhr.send(fd);

            // 読み込み完了・ステータス正常なら処理を続ける
            if (xhr.readyState == 4 && xhr.status == 200) {

                xml_data = xhr.responseXML;                     // XMLオブジェクトの取得
                var errorInfo = faceu_parse( xml_data, "errorInfo" );　// エラーコードの取得

                // エラーチェック・出力
                if( errorInfo > 0 ){
                    alert("error: "+errorInfo);
                }else{

                }

            }

            // エラーがなければ描画処理を行う
            $(xml_data).find("detectionFaceInfo").each( function(){

                // 指定されたモードを実行してパースした座標の組み合わせを取得する
                return_val = draw_do( mode, $(this) );

            });

          break;

          // ファイルアップロード指定
          case "file":
          break;

          default:
          break;
      }

      return return_val;

}

function draw_do( mode, xml ){

    switch(mode) {
        // 左右の目の中心点
        case 1:
            var eyes = faceu_parse_name( xml, "eyes" );
            return eyes;
        break;
        // 矩形
        case 2:
            var square = faceu_parse_name( xml, "square" );
            return square;
        break;
        // 左眉選択
        case 3:
            var eyebrow_left = faceu_parse_name( xml, "eyebrow_left" );
            return eyebrow_left;
        break;
        // 右眉選択
        case 4:
            var eyebrow_right = faceu_parse_name( xml, "eyebrow_right" );
            return eyebrow_right;
        break;
        // 唇
        case 5:
            var mouth = faceu_parse_name( xml, "mouth" );
            return mouth;
        break;
        // 左目
        case 6:
            var eye_left  = faceu_parse_name( xml, "eye_left" );
            return eye_left;
        break;
        // 右目
        case 7:
            var eye_right = faceu_parse_name( xml, "eye_right" );
            return eye_right;
        break;
        // 鼻
        case 8:
            var nose  = faceu_parse_name( xml, "nose" );
            return nose;
        break;
        // 顔の輪郭
        case 9:
            var fl = faceu_parse_name( xml, "face_line" );
            return fl;
        break;
        default:
        break;
    }
}