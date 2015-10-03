/*
 * pux_faceu.js 0.3.0 - FaceU WebAPI
 *
 * Copyright (c) 2013 PUX Corporation.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Since:     2013-02-14
 * Modified:  2013-02-25
 *
 * jQuery 1.8.2
 * pux_parse
 * jqfloat
 */

/*
 * [使用方法] XHTMLのhead要素内で次のように読み込みます。
    <link href="css/pux_faceu.css" rel="stylesheet" type="text/css" media="all">
    <script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="js/jcanvas.js"></script>
    <script type="text/javascript" src="js/pux_parse.js"></script>
    <script type="text/javascript" src="js/pux_faceu.js"></script>
    <script type="text/javascript" src="js/jqfloat.min.js"></script>

 */

;(function($){

    /* 顔認識プラグイン 2013/02/05 */
    $.fn.faceu = function(options){

        return this.each(function(){

            // デフォルト・パラメータの取得
            var opts = $.extend({}, $.fn.faceu.defaults, options);

            // 変数の初期化
            var img_url       = opts.img_url+"?" + new Date().getTime();
            var limit         = 4096;  // 画像の最大幅
            var clear_score   = 90    // ゲームをクリアするためのスコア

            // API Key が設定されていなければメッセージを表示
            if(opts.apikey == 'none'){
                alert('API key is nothing.')
                return;
            }

            // キャンバスを作成
            $(this).empty();
            $(this).append("<canvas id='bg' style='position: absolute; z-index: 0'></canvas><canvas id='fg' style='position: absolute; z-index: 1'></canvas>");

            // 送信方法により処理を分岐
            switch(opts.use) {
                // URL指定
                case "url":
                    // イメージオブジェクトを作成
                    var img = new Image();
                    img.src = opts.img_url; // 読む込む画像を指定

                    img.onload = function() {

                        // 画像の最大幅・高さをチェック
                        if(img.naturalWidth > limit){
                            alert("本APIで扱える画像の大きさは4096ピクセルX4096ピクセルです（この画像は"+img.naturalWidth+"ピクセルX"+img.naturalHeight+"）。")
                            return;
                        }
                        if(img.naturalHeight > limit){
                            alert("本APIで扱える画像の大きさは4096ピクセルX4096ピクセルです（この画像は"+img.naturalWidth+"ピクセルX"+img.naturalHeight+"）。")
                            return;
                        }

                        $("canvas").attr("width", img.naturalWidth).attr("height", img.naturalHeight);

                        $("#dataForm").remove();
                        // リクエストを送信するフォーム(非表示)を作成
                        $("<form id='dataForm' method='post' style='display:none; width: 1px; height: 1px;' enctype='multipart/form-data'><input type='text' id='apiKey' name='apiKey' value='"+opts.apikey+"' /><input type='text' name='imageURL' id='imageURL' value='"+opts.img_url+"' /></form>").insertAfter("canvas#fg");

                        // フォームを送信
                        var myForm = document.getElementById("dataForm");
                        var fd = new FormData(myForm);
                        var xhr = new XMLHttpRequest();

                        // XMLHttpRequest Level2が利用できるか確認
                        if(typeof xhr.withCredentials === "undefined"){
                            alert("XMLHttpRequest Leve12を利用できません");
                            return;
                        }

                        xhr.open("POST", opts.service_url, false);
                        xhr.send(fd);

                        // 読み込み完了・ステータス正常なら処理を続ける
                        if (xhr.readyState == 4 && xhr.status == 200) {

                            xml_data = xhr.responseXML; // XMLオブジェクトの取得
                            var errorInfo = faceu_parse( $(this), "errorInfo" );　// エラーコードの取得

                            // エラーチェック・出力
                            if( errorInfo > 0 ){
                                alert("error: "+errorInfo);
                            }else{

                                // ゲームモード以外は先に背景画像を描写
                                if(opts.mode != 8){

                                    // 背景画像の描写
                                    $("canvas#bg").drawImage({
                                        source: img.src,
                                        x: 0, y: 0,
                                        fromCenter: false
                                    });

                                }else{
                                    // ゲームモード
                                    $("body").addClass("sword");
                                    
                                    // スコアの表示
                                    var total_score = 0;
                                    $("<div id='score'>0</div>").insertBefore("canvas#bg");
                                    
                                    var canvas = document.getElementById('bg');
                                    if (canvas.getContext) {
                                        var context = canvas.getContext('2d');
                                        var square = faceu_parse_name( xml_data, "square" );
                                        context.beginPath();
                                        context.moveTo( eval(square[0]), eval(square[1]) );
                                        context.lineTo( eval(square[2]), eval(square[3]) );
                                        context.lineTo( eval(square[4]), eval(square[5]) );
                                        context.lineTo( eval(square[6]), eval(square[7]) );
                                        context.lineTo( eval(square[0]), eval(square[1]) );
                                        context.clip();
                                    }

                                    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

                                    $("canvas#bg").jqFloat({
                                      width: 800,
                                      height: 200,
                                      speed: 500
                                    });

                                    // ヒットしたら10点を加算
                                    $("canvas#bg").on("mouseover", function(){

                                        // 合計得点が一定以上になったら終了
                                        total_score = $("#score").html();
                                        if(total_score > clear_score){
                                            $("#score").html(total_score+" Congratulation!");
                                            $("canvas#bg").remove();
                                            context.clearRect(0, 0, img.naturalWidth, img.naturalHeight);
                                        }else{
                                        total_score = eval( $("#score").html() )+10;
                                        $("#score").html(total_score);
                                        if(total_score > clear_score){
                                            $("#score").html(total_score+" Congratulation!");
                                            $("canvas#bg").remove();
                                        }                                        }

                                    });

                                }

                                // エラーがなければ描画処理を行う
                                $(xml_data).find("detectionFaceInfo").each( function(){

                                    // 指定されたモードを描写
                                    draw_do( opts, $(this) );

                                });

                            }

                        }else{
                            alert("送信できませんでした");
                        }
                        
                    }

                break;

                // ファイルアップロード指定
                case "file":
                    // File API に対応しているブラウザなら処理を進める
                    if (window.File && window.FileReader) {
                        $("#dataForm").remove();
                        $("<form id='dataForm' method='post' width: 1px; height: 1px;' enctype='multipart/form-data'><input type='hidden' id='apiKey' name='apiKey' value='"+opts.apikey+"' /><input type='file' name='inputFile' id='inputFile' /></form><div class='clear'></div>").insertBefore(this);

                        $("#inputFile").on("change",function() {

                            var file = this.files;

                            // 画像ファイル以外は処理を中止
                            if (!file[0].type.match(/^image\/(png|jpeg|gif)$/)) return;

                            var img    = new Image();       // 表示用のイメージオブジェクトを取得
                            var reader = new FileReader();  // ファイルリーダー作成

                            // POST送信
                            var myForm = document.getElementById("dataForm");
                            var fd = new FormData(myForm);
                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", opts.service_url, false);
                            xhr.send(fd);

                            // 読み込み完了・ステータス正常なら処理を続ける
                            if (xhr.readyState == 4 && xhr.status == 200) {

                                xml_data = xhr.responseXML; // XMLオブジェクトの取得
                                var errorInfo = faceu_parse( $(this), "errorInfo" );　// エラーコードの取得

                                // エラーチェック・出力
                                if( errorInfo > 0 ){
                                    alert("error: "+errorInfo);
                                }else{
                                
                                    // 表示するエリアをリセット
                                    $("img.upload_img").remove();
                                    $("#score").remove();
                                    
                                    // 画像の大きさを取得してキャンバスの大きさを変更
                                    var img_width  = faceu_parse( xml_data, "width" );
                                    var img_height = faceu_parse( xml_data, "height" );
                                    $("canvas").attr("width", img_width).attr("height", img_height);

                                    reader.onload = function (e) {

                                        // ゲームモード以外
                                        if(opts.mode != 8){

                                            // readAsDataURLをsrcに指定してイメージを作成
                                            $("<img class='upload_img' src='"+e.target.result+"' width='"+img_width+"' height='"+img_height+"' alt='canvas' />").insertAfter("canvas#fg");

                                            // エラーがなければ描画処理を行う
                                            $(xml_data).find("detectionFaceInfo").each( function(){
                                                // 指定されたモードを描写
                                                draw_do( opts, $(this) );
                                            });

                                        }else{
                                            // ゲームモード
                                            $("body").addClass("sword");
                                            // スコアの表示
                                            var total_score = 0;
                                            $("<div id='score'>0</div>").insertBefore("canvas#bg");
                                            
                                            var square = faceu_parse_name( xml_data, "square" );
                                            var square_width  = eval(square[2]) - eval(square[0]);
                                            var square_height = eval(square[5]) - eval(square[3]);
                                            $("canvas#bg").drawImage({
                                                source: e.target.result,
                                                x: eval(square[0]), y: eval(square[1]),
                                                sWidth: square_width,
                                                sHeight: square_height,
                                                sx: eval(square[0]), sy: eval(square[1]),
                                                cropFromCenter: false
                                            }).jqFloat({
                                                width: 800,
                                                height: 200,
                                                speed: 500
                                            });
                                                                                            
                                                // ヒットしたら10点を加算
                                                $("canvas#bg").on("mouseover", function(){
    
                                                    // 合計得点が一定以上になったら終了
                                                    total_score = $("#score").html();
                                                    if(total_score > clear_score){
                                                        $("#score").html(total_score+" Congratulation!");
                                                        $("canvas#bg").remove();
                                                        context.clearRect(0, 0, img.naturalWidth, img.naturalHeight);
                                                    }else{
                                                        total_score = eval( $("#score").html() )+10;
                                                        $("#score").html(total_score);
                                                        if(total_score > clear_score){
                                                            $("#score").html(total_score+" Congratulation!");
                                                            $("canvas#bg").remove();
                                                        }
    
                                                    }
    
                                                }); 
                                            
                                        }

                                    };

                                    reader.readAsDataURL(file[0]);
                                }
                            }
                        });
                    } else {
                      // ブラウザがFile APIに対応していない時のメッセージ
                      alert('このブラウザは必要なFileAPIをサポートしていません。');
                    }

                break;

                default:
                break;
            }




            function draw_do(opts, xml, img_w, img_h){

                // モードによって描画するタイプを変更する
                // 1:　カラーコンタクト
                // 2:　矩形描画
                // 3: 眉毛選択
                // 4: 口紅描画
                // 5: 目玉選択
                // 6: 鼻選択
                // 7: 顔の輪郭選択

                switch(opts.mode) {
                    // カラーコンタクト

                    case 1:

                      var eyes = faceu_parse_name( xml, "eyes" );
                      $("canvas#fg").drawArc({
                          fillStyle: opts.fill,　
                          x: eyes[0], y: eyes[1],
                          radius: opts.circle,
                          opacity: opts.opacity
                      }).drawArc({
                          fillStyle: opts.fill,　
                          x: eyes[2], y: eyes[3],　
                          radius: opts.circle,
                          opacity: opts.opacity
                      });

                    break;

                    // 矩形選択
                    case 2:

                      var square = faceu_parse_name( xml, "square" );
                      $("canvas#fg").drawLine({

                          strokeStyle: opts.color,
                          strokeWidth: opts.stroke,
                          opacity: opts.opacity,

                          // 左上から右上
                          x1: eval(square[0]), y1: eval(square[1]),
                          x2: eval(square[2]), y2: eval(square[3]),

                          // 右上から右下
                          x3: eval(square[2]), y3: eval(square[3]),
                          x4: eval(square[4]), y4: eval(square[5]),

                          // 右下から左下
                          x5: eval(square[4]), y5: eval(square[5]),
                          x6: eval(square[6]), y6: eval(square[7]),

                          // 左下から左上
                          x7: eval(square[6]), y7: eval(square[7]),
                          x8: eval(square[0]), y8: eval(square[1]),
                          closed: true
                      });

                    break;

                    // 眉毛選択
                    case 3:

                      var eyebrow_left = faceu_parse_name( xml, "eyebrow_left" );
                      var eyebrow_right = faceu_parse_name( xml, "eyebrow_right" );
                      $("canvas#fg").drawLine({
                          strokeWidth: opts.stroke,
                          strokeStyle: opts.color,
                          fillStyle: opts.fill,
                          opacity: opts.opacity,
                          x1: eval(eyebrow_left[0]), y1: eval(eyebrow_left[1]),
                          x2: eval(eyebrow_left[2]), y2: eval(eyebrow_left[3]),
                          x3: eval(eyebrow_left[4]), y3: eval(eyebrow_left[5]),
                          x4: eval(eyebrow_left[6]), y4: eval(eyebrow_left[7]),
                          x5: eval(eyebrow_left[8]), y5: eval(eyebrow_left[9]),
                          x6: eval(eyebrow_left[10]), y6: eval(eyebrow_left[11]),
                          closed: true
                      }).drawLine({
                          strokeWidth: opts.stroke,
                          strokeStyle: opts.color,
                          fillStyle: opts.fill,
                          opacity: opts.opacity,
                          x1: eval(eyebrow_right[0]), y1: eval(eyebrow_right[1]),
                          x2: eval(eyebrow_right[2]), y2: eval(eyebrow_right[3]),
                          x3: eval(eyebrow_right[4]), y3: eval(eyebrow_right[5]),
                          x4: eval(eyebrow_right[6]), y4: eval(eyebrow_right[7]),
                          x5: eval(eyebrow_right[8]), y5: eval(eyebrow_right[9]),
                          x6: eval(eyebrow_right[10]), y6: eval(eyebrow_right[11]),
                          closed: true
                      });

                    break;

                    // 口紅
                    case 4:
                      var mouth = faceu_parse_name( xml, "mouth" );
                      $("canvas#fg").drawLine({
                          strokeStyle: opts.color,
                          fillStyle: opts.fill,
                          opacity: opts.opacity,
                          x1: eval(mouth[0]), y1: eval(mouth[1]),
                          x2: eval(mouth[2]), y2: eval(mouth[3]),
                          x3: eval(mouth[4]), y3: eval(mouth[5]),
                          x4: eval(mouth[6]), y4: eval(mouth[7]),
                          x5: eval(mouth[8]), y5: eval(mouth[9]),
                          x6: eval(mouth[10]), y6: eval(mouth[11]),
                          x7: eval(mouth[12]), y7: eval(mouth[13]),
                          x8: eval(mouth[14]), y8: eval(mouth[15]),
                          x9: eval(mouth[16]), y9: eval(mouth[17]),
                          x10: eval(mouth[18]), y10: eval(mouth[19]),
                          x11: eval(mouth[0]), y11: eval(mouth[1]),
                          closed: true
                      }).drawLine({
                          strokeStyle: opts.color,
                          fillStyle: opts.fill,
                          opacity: opts.opacity,
                          x1: eval(mouth[0]), y1: eval(mouth[1]),
                          x2: eval(mouth[20]), y2: eval(mouth[21]),
                          x3: eval(mouth[22]), y3: eval(mouth[23]),
                          x4: eval(mouth[24]), y4: eval(mouth[25]),
                          x5: eval(mouth[26]), y5: eval(mouth[27]),
                          x6: eval(mouth[28]), y6: eval(mouth[29]),
                          x7: eval(mouth[12]), y7: eval(mouth[13]),
                          x8: eval(mouth[30]), y8: eval(mouth[31]),
                          x9: eval(mouth[32]), y9: eval(mouth[33]),
                          x10: eval(mouth[34]), y10: eval(mouth[35]),
                          x11: eval(mouth[0]), y11: eval(mouth[1]),
                          closed: true
                      });

                    break;

                    // 目玉
                    case 5:
                      var eye_left  = faceu_parse_name( xml, "eye_left" );
                      var eye_right = faceu_parse_name( xml, "eye_right" );
                      $("canvas#fg").drawLine({
                          strokeWidth: opts.stroke,
                          strokeStyle: opts.color,
                          opacity: opts.opacity,
                          x1: eval(eye_left[0]), y1: eval(eye_left[1]),
                          x2: eval(eye_left[2]), y2: eval(eye_left[3]),
                          x3: eval(eye_left[4]), y3: eval(eye_left[5]),
                          x4: eval(eye_left[6]), y4: eval(eye_left[7]),
                          x5: eval(eye_left[8]), y5: eval(eye_left[9]),
                          x6: eval(eye_left[10]), y6: eval(eye_left[11]),
                          x7: eval(eye_left[12]), y7: eval(eye_left[13]),
                          x8: eval(eye_left[14]), y8: eval(eye_left[15]),
                          closed: true
                      }).drawLine({
                          strokeWidth: opts.stroke,
                          strokeStyle: opts.color,
                          opacity: opts.opacity,
                          x1: eval(eye_right[0]), y1: eval(eye_right[1]),
                          x2: eval(eye_right[2]), y2: eval(eye_right[3]),
                          x3: eval(eye_right[4]), y3: eval(eye_right[5]),
                          x4: eval(eye_right[6]), y4: eval(eye_right[7]),
                          x5: eval(eye_right[8]), y5: eval(eye_right[9]),
                          x6: eval(eye_right[10]), y6: eval(eye_right[11]),
                          x7: eval(eye_right[12]), y7: eval(eye_right[13]),
                          x8: eval(eye_right[14]), y8: eval(eye_right[15]),
                          closed: true
                      })
                    break;

                    // 鼻
                    case 6:
                      var nose  = faceu_parse_name( xml, "nose" );
                      $("canvas#fg").drawLine({
                          strokeWidth: opts.stroke,
                          strokeStyle: opts.color,
                          opacity: opts.opacity,
                          x1: eval(nose[0]), y1: eval(nose[1]),
                          x2: eval(nose[2]), y2: eval(nose[3]),
                          x3: eval(nose[4]), y3: eval(nose[5]),
                          x4: eval(nose[6]), y4: eval(nose[7]),
                          x5: eval(nose[8]), y5: eval(nose[9]),
                          x6: eval(nose[10]), y6: eval(nose[11]),
                          x7: eval(nose[12]), y7: eval(nose[13]),
                          x8: eval(nose[14]), y8: eval(nose[15]),
                          x9: eval(nose[16]), y9: eval(nose[17]),
                          x10: eval(nose[18]), y10: eval(nose[19]),
                          x11: eval(nose[20]), y11: eval(nose[21]),
                          x12: eval(nose[22]), y12: eval(nose[23]),
                          closed: true
                      })
                    break;

                    // 顔の輪郭
                    case 7:
                      var fl = faceu_parse_name( xml, "face_line" );
                      $("canvas#fg").drawLine({
                          strokeWidth: opts.stroke,
                          strokeStyle: opts.color,
                          opacity: opts.opacity,
                          x1: eval(fl[0]), y1: eval(fl[1]),
                          x2: eval(fl[2]), y2: eval(fl[3]),
                          x3: eval(fl[4]), y3: eval(fl[5]),
                          x4: eval(fl[6]), y4: eval(fl[7]),
                          x5: eval(fl[8]), y5: eval(fl[9]),
                          x6: eval(fl[10]), y6: eval(fl[11]),
                          x7: eval(fl[12]), y7: eval(fl[13]),
                          x8: eval(fl[14]), y8: eval(fl[15]),
                          x9: eval(fl[16]), y9: eval(fl[17]),
                          x10: eval(fl[18]), y10: eval(fl[19]),
                          x11: eval(fl[20]), y11: eval(fl[21]),
                          x12: eval(fl[22]), y12: eval(fl[23]),
                          x13: eval(fl[24]), y13: eval(fl[25]),
                          x14: eval(fl[26]), y14: eval(fl[27]),
                          x15: eval(fl[28]), y15: eval(fl[29])
                      }).drawQuad({
                          strokeWidth: opts.stroke,
                          strokeStyle: opts.color,
                          opacity: opts.opacity,
                          x1: eval(fl[28]), y1: eval(fl[29]),
                          cx1: eval(fl[28]), cy1: eval(fl[31]),
                          x2: eval(fl[30]), y2: eval(fl[31]),
                          cx2: eval(fl[0]), cy2: eval(fl[31]),
                          x3: eval(fl[0]), y3: eval(fl[1])
                      });

                    break;

                    // シューティングゲーム
                    case 8:
                    break;

                    default:
                    break;
                }

            }

        });
    }


  /* デフォルトパラメータ */
  $.fn.faceu.defaults = {
    apikey: 'none',
    service_url: 'http://eval.api.pux.co.jp:8080/webapi/face.do',
    mode: 1,              // 描画モード
    circle: 3,            // 円の大きさ
    color: '#2f2f2f',     // 線の色
    stroke: 3,            // 線の太さ
    fill: '#ffffff',      // 塗りつぶしの色
    use: 'url',           // 送信方法
    opacity: 0.5          // 透明度
  };

})(jQuery);