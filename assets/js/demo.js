$(document).ready(function() {
    
    $("p#exe").click(function() {
    
        var api_key = $("#api_key").val();
        var imgurl  = $("#img_url").val();
        var md  = $("#md").val();
        
        if( (api_key!='') && (img_url!='') ){

            $("#ca").faceu({
                apikey: api_key,        // APIキー
                mode: parseInt(md),     // 描画モード
                color: '#0080ff',       // 線の色
                fill: '#0080ff',        // 塗りつぶしの色
                circle: 4,              // 円の大きさ
                opacity: 0.4,           // 透明度
                use: 'url',             // 送信方法
                img_url: imgurl
            });
        
        }

    });
    // end
    
});