/*
 * pux_faceu_parse.js 0.3.0 - FaceU WebAPI
 *
 * Copyright (c) 2013 PUX Corporation.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Since:     2013-02-14
 * Modified:  2013-02-22
 *
 * jQuery 1.8.2
 */
function faceu_parse(xml, tagname, no){

    if(!no){
      no = 0;
    }

    // indexOf 一致した文字列がなかった場合には、-1 を返します
    var attr_index = tagname.indexOf('_', 0);

    if(attr_index > -1){
      var attr_name = tagname.substr(attr_index+1);
      // タグ名から_*を削除(置換)
      var chg_tag = tagname.replace(/_.*/g, '');
      var result = $(xml).find(chg_tag).eq(no).attr(attr_name);
      return result;
    }

    // シンプルな値の取得
    if( attr_index == -1 ){
      var result = $(xml).find(tagname).eq(no).text();
      return result;
    }

}

function faceu_parse_name(xml, tagname, no){
    /*
    * square        外接矩形
    * eyes          両目（中心点）
    * mouth         唇
    * eyebrow_left  左眉
    * eyebrow_right 右眉
    * eye_left      左目玉
    * eye_right     右目玉
    * nose          鼻
    * face_line     輪郭
    */
    switch(tagname) {

        // 外接矩形
        case "square":
          // 左上
          var square_leftup_x = faceu_parse( xml, "boundingRectangleLeftUpper_x" , no);
          var square_leftup_y = faceu_parse( xml, "boundingRectangleLeftUpper_y" , no);
          // 右上
          var square_rightup_x = faceu_parse( xml, "boundingRectangleRightUpper_x" , no);
          var square_rightup_y = faceu_parse( xml, "boundingRectangleRightUpper_y" , no);
          //　右下
          var square_rightlower_x = faceu_parse( xml, "boundingRectangleRightLower_x" , no);
          var square_rightlower_y = faceu_parse( xml, "boundingRectangleRightLower_y" , no);
          //　左下
          var square_leftlower_x = faceu_parse( xml, "boundingRectangleLeftLower_x" , no);
          var square_leftlower_y = faceu_parse( xml, "boundingRectangleLeftLower_y" , no);

          var square = [ square_leftup_x, square_leftup_y, square_rightup_x, square_rightup_y, square_rightlower_x, square_rightlower_y, square_leftlower_x, square_leftlower_y ];
          return square;
        break;

        // 両目
        case "eyes":
            var left_eye_x = faceu_parse( xml, "leftBlackEyeCenter_x" , no);
            var left_eye_y = faceu_parse( xml, "leftBlackEyeCenter_y" , no);
            var right_eye_x = faceu_parse( xml, "rightBlackEyeCenter_x" , no);
            var right_eye_y = faceu_parse( xml, "rightBlackEyeCenter_y" , no);
            var eyes = [ left_eye_x, left_eye_y, right_eye_x, right_eye_y ];
            return eyes;
        break;

        // 唇
        case "mouth":
          var m1_x = faceu_parse( xml, "mouthLeftEnd_x" , no);
          var m1_y = faceu_parse( xml, "mouthLeftEnd_y" , no);
          var m2_x = faceu_parse( xml, "upperLipUpperLeftOutside_x" , no);
          var m2_y = faceu_parse( xml, "upperLipUpperLeftOutside_y" , no);
          var m3_x = faceu_parse( xml, "upperLipUpperLeftInside_x" , no);
          var m3_y = faceu_parse( xml, "upperLipUpperLeftInside_y" , no);
          var m4_x = faceu_parse( xml, "mouthUpperPart_x" , no);
          var m4_y = faceu_parse( xml, "mouthUpperPart_y" , no);
          var m5_x = faceu_parse( xml, "upperLipUpperRightInside_x" , no);
          var m5_y = faceu_parse( xml, "upperLipUpperRightInside_y" , no);
          var m6_x = faceu_parse( xml, "upperLipUpperRightOutside_x" , no);
          var m6_y = faceu_parse( xml, "upperLipUpperRightOutside_y" , no);
          var m7_x = faceu_parse( xml, "mouthRightEnd_x" , no);
          var m7_y = faceu_parse( xml, "mouthRightEnd_y" , no);
          var m8_x = faceu_parse( xml, "upperLipLowerRight_x" , no);
          var m8_y = faceu_parse( xml, "upperLipLowerRight_y" , no);
          var m9_x = faceu_parse( xml, "upperLipLowerCenter_x" , no);
          var m9_y = faceu_parse( xml, "upperLipLowerCenter_y" , no);
          var m10_x = faceu_parse( xml, "upperLipLowerLeft_x" , no);
          var m10_y = faceu_parse( xml, "upperLipLowerLeft_y" , no);
          var m11_x = faceu_parse( xml, "lowerLipLowerLeftOutside_x" , no);
          var m11_y = faceu_parse( xml, "lowerLipLowerLeftOutside_y" , no);
          var m12_x = faceu_parse( xml, "lowerLipLowerLeftInside_x" , no);
          var m12_y = faceu_parse( xml, "lowerLipLowerLeftInside_y" , no);
          var m13_x = faceu_parse( xml, "mouthLowerPart_x" , no);
          var m13_y = faceu_parse( xml, "mouthLowerPart_y" , no);
          var m14_x = faceu_parse( xml, "lowerLipLowerRightInside_x" , no);
          var m14_y = faceu_parse( xml, "lowerLipLowerRightInside_y" , no);
          var m15_x = faceu_parse( xml, "lowerLipLowerRightOutside_x" , no);
          var m15_y = faceu_parse( xml, "lowerLipLowerRightOutside_y" , no);
          var m16_x = faceu_parse( xml, "lowerLipUpperRight_x" , no);
          var m16_y = faceu_parse( xml, "lowerLipUpperRight_y" , no);
          var m17_x = faceu_parse( xml, "lowerLipUpperCenter_x" , no);
          var m17_y = faceu_parse( xml, "lowerLipUpperCenter_y" , no);
          var m18_x = faceu_parse( xml, "lowerLipUpperLeft_x" , no);
          var m18_y = faceu_parse( xml, "lowerLipUpperLeft_y" , no);
          var m19_x = faceu_parse( xml, "mouthCenter_x" , no);
          var m19_y = faceu_parse( xml, "mouthCenter_y" , no);
          var mouth = [ m1_x, m1_y, m2_x, m2_y, m3_x, m3_y, m4_x, m4_y, m5_x, m5_y, m6_x, m6_y, m7_x, m7_y, m8_x, m8_y, m9_x, m9_y, m10_x, m10_y, m11_x, m11_y, m12_x, m12_y, m13_x, m13_y, m14_x, m14_y, m15_x, m15_y, m16_x, m16_y, m17_x, m17_y, m18_x, m18_y, m19_x, m19_y ];
          return mouth;
        break;

        // 左眉
        case "eyebrow_left":
            var erb1_x = faceu_parse( xml, "leftEyebrowOutsideEnd_x" , no);
            var erb1_y = faceu_parse( xml, "leftEyebrowOutsideEnd_y" , no);
            var erb2_x = faceu_parse( xml, "leftEyebrowUpperOutside_x" , no);
            var erb2_y = faceu_parse( xml, "leftEyebrowUpperOutside_y" , no);
            var erb3_x = faceu_parse( xml, "leftEyebrowUpperInside_x" , no);
            var erb3_y = faceu_parse( xml, "leftEyebrowUpperInside_y" , no);
            var erb4_x = faceu_parse( xml, "leftEyebrowInsideEnd_x" , no);
            var erb4_y = faceu_parse( xml, "leftEyebrowInsideEnd_y" , no);
            var erb5_x = faceu_parse( xml, "leftEyebrowLowerInside_x" , no);
            var erb5_y = faceu_parse( xml, "leftEyebrowLowerInside_y" , no);
            var erb6_x = faceu_parse( xml, "leftEyebrowLowerOutside_x" , no);
            var erb6_y = faceu_parse( xml, "leftEyebrowLowerOutside_y" , no);
            var left_eye_brow = [erb1_x, erb1_y, erb2_x, erb2_y, erb3_x, erb3_y, erb4_x, erb4_y, erb5_x, erb5_y, erb6_x, erb6_y ];
            return left_eye_brow;
        break;

        // 右眉
        case "eyebrow_right":
            var erb1_x = faceu_parse( xml, "rightEyebrowOutsideEnd_x" , no);
            var erb1_y = faceu_parse( xml, "rightEyebrowOutsideEnd_y" , no);
            var erb2_x = faceu_parse( xml, "rightEyebrowUpperOutside_x" , no);
            var erb2_y = faceu_parse( xml, "rightEyebrowUpperOutside_y" , no);
            var erb3_x = faceu_parse( xml, "rightEyebrowUpperInside_x" , no);
            var erb3_y = faceu_parse( xml, "rightEyebrowUpperInside_y" , no);
            var erb4_x = faceu_parse( xml, "rightEyebrowInsideEnd_x" , no);
            var erb4_y = faceu_parse( xml, "rightEyebrowInsideEnd_y" , no);
            var erb5_x = faceu_parse( xml, "rightEyebrowLowerInside_x" , no);
            var erb5_y = faceu_parse( xml, "rightEyebrowLowerInside_y" , no);
            var erb6_x = faceu_parse( xml, "rightEyebrowLowerOutside_x" , no);
            var erb6_y = faceu_parse( xml, "rightEyebrowLowerOutside_y" , no);
            var right_eye_brow = [erb1_x, erb1_y, erb2_x, erb2_y, erb3_x, erb3_y, erb4_x, erb4_y, erb5_x, erb5_y, erb6_x, erb6_y ];
            return right_eye_brow;
        break;

        // 左目玉
        case "eye_left":
            var e1_x = faceu_parse( xml, "leftEyeOutsideEnd_x" , no);
            var e1_y = faceu_parse( xml, "leftEyeOutsideEnd_y" , no);
            var e2_x = faceu_parse( xml, "leftEyeUpperOutside_x" , no);
            var e2_y = faceu_parse( xml, "leftEyeUpperOutside_y" , no);
            var e3_x = faceu_parse( xml, "leftEyeUpperCenter_x" , no);
            var e3_y = faceu_parse( xml, "leftEyeUpperCenter_y" , no);
            var e4_x = faceu_parse( xml, "leftEyeUpperInside_x" , no);
            var e4_y = faceu_parse( xml, "leftEyeUpperInside_y" , no);
            var e5_x = faceu_parse( xml, "leftEyeInsideEnd_x" , no);
            var e5_y = faceu_parse( xml, "leftEyeInsideEnd_y" , no);
            var e6_x = faceu_parse( xml, "leftEyeLowerInside_x" , no);
            var e6_y = faceu_parse( xml, "leftEyeLowerInside_y" , no);
            var e7_x = faceu_parse( xml, "leftEyeLowerCenter_x" , no);
            var e7_y = faceu_parse( xml, "leftEyeLowerCenter_y" , no);
            var e8_x = faceu_parse( xml, "leftEyeLowerOutside_x" , no);
            var e8_y = faceu_parse( xml, "leftEyeLowerOutside_y" , no);
            var eye_left = [e1_x, e1_y, e2_x, e2_y, e3_x, e3_y, e4_x, e4_y, e5_x, e5_y, e6_x, e6_y , e7_x, e7_y , e8_x, e8_y ];
            return eye_left;
        break;

        // 右目玉
        case "eye_right":
            var e1_x = faceu_parse( xml, "rightEyeOutsideEnd_x" , no);
            var e1_y = faceu_parse( xml, "rightEyeOutsideEnd_y" , no);
            var e2_x = faceu_parse( xml, "rightEyeUpperOutside_x" , no);
            var e2_y = faceu_parse( xml, "rightEyeUpperOutside_y" , no);
            var e3_x = faceu_parse( xml, "rightEyeUpperCenter_x" , no);
            var e3_y = faceu_parse( xml, "rightEyeUpperCenter_y" , no);
            var e4_x = faceu_parse( xml, "rightEyeUpperInside_x" , no);
            var e4_y = faceu_parse( xml, "rightEyeUpperInside_y" , no);
            var e5_x = faceu_parse( xml, "rightEyeInsideEnd_x" , no);
            var e5_y = faceu_parse( xml, "rightEyeInsideEnd_y" , no);
            var e6_x = faceu_parse( xml, "rightEyeLowerInside_x" , no);
            var e6_y = faceu_parse( xml, "rightEyeLowerInside_y" , no);
            var e7_x = faceu_parse( xml, "rightEyeLowerCenter_x" , no);
            var e7_y = faceu_parse( xml, "rightEyeLowerCenter_y" , no);
            var e8_x = faceu_parse( xml, "rightEyeLowerOutside_x" , no);
            var e8_y = faceu_parse( xml, "rightEyeLowerOutside_y" , no);
            var eye_right = [e1_x, e1_y, e2_x, e2_y, e3_x, e3_y, e4_x, e4_y, e5_x, e5_y, e6_x, e6_y , e7_x, e7_y , e8_x, e8_y ];
            return eye_right;
        break;

        // 鼻
        case "nose":
            var n1_x = faceu_parse( xml, "noseLeftLineCenter_x" , no);
            var n1_y = faceu_parse( xml, "noseLeftLineCenter_y" , no);
            var n2_x = faceu_parse( xml, "noseLeftLineLower0_x" , no);
            var n2_y = faceu_parse( xml, "noseLeftLineLower0_y" , no);
            var n3_x = faceu_parse( xml, "noseLeftLineLower1_x" , no);
            var n3_y = faceu_parse( xml, "noseLeftLineLower1_y" , no);
            var n4_x = faceu_parse( xml, "nostrilsLeft_x" , no);
            var n4_y = faceu_parse( xml, "nostrilsLeft_y" , no);
            var n5_x = faceu_parse( xml, "noseBottomCenter_x" , no);
            var n5_y = faceu_parse( xml, "noseBottomCenter_y" , no);
            var n6_x = faceu_parse( xml, "nostrilsRight_x" , no);
            var n6_y = faceu_parse( xml, "nostrilsRight_y" , no);
            var n7_x = faceu_parse( xml, "noseRightLineLower1_x" , no);
            var n7_y = faceu_parse( xml, "noseRightLineLower1_y" , no);
            var n8_x = faceu_parse( xml, "noseRightLineLower0_x" , no);
            var n8_y = faceu_parse( xml, "noseRightLineLower0_y" , no);
            var n9_x = faceu_parse( xml, "noseRightLineCenter_x" , no);
            var n9_y = faceu_parse( xml, "noseRightLineCenter_y" , no);
            var n10_x = faceu_parse( xml, "noseRightLineUpper_x" , no);
            var n10_y = faceu_parse( xml, "noseRightLineUpper_y" , no);
            var n11_x = faceu_parse( xml, "noseCenterLine1_x" , no);
            var n11_y = faceu_parse( xml, "noseCenterLine1_y" , no);
            var n12_x = faceu_parse( xml, "noseLeftLineUpper_x" , no);
            var n12_y = faceu_parse( xml, "noseLeftLineUpper_y" , no);
            var nose = [n1_x, n1_y, n2_x, n2_y, n3_x, n3_y, n4_x, n4_y, n5_x, n5_y, n6_x, n6_y, n7_x, n7_y, n8_x, n8_y, n9_x, n9_y, n10_x, n10_y, n11_x, n11_y, n12_x, n12_y];
            return nose;
        break;

        // 顔の輪郭
        case "face_line":
            var f1_x = faceu_parse( xml, "leftCheek1_x" , no);
            var f1_y = faceu_parse( xml, "leftCheek1_y" , no);
            var f2_x = faceu_parse( xml, "leftCheek2_x" , no);
            var f2_y = faceu_parse( xml, "leftCheek2_y" , no);
            var f3_x = faceu_parse( xml, "leftCheek3_x" , no);
            var f3_y = faceu_parse( xml, "leftCheek3_y" , no);
            var f4_x = faceu_parse( xml, "leftCheek4_x" , no);
            var f4_y = faceu_parse( xml, "leftCheek4_y" , no);
            var f5_x = faceu_parse( xml, "leftCheek5_x" , no);
            var f5_y = faceu_parse( xml, "leftCheek5_y" , no);
            var f6_x = faceu_parse( xml, "leftCheek6_x" , no);
            var f6_y = faceu_parse( xml, "leftCheek6_y" , no);
            var f7_x = faceu_parse( xml, "leftCheek7_x" , no);
            var f7_y = faceu_parse( xml, "leftCheek7_y" , no);
            var f8_x = faceu_parse( xml, "chin_x" , no);
            var f8_y = faceu_parse( xml, "chin_y" , no);
            var f9_x = faceu_parse( xml, "rightCheek7_x" , no);
            var f9_y = faceu_parse( xml, "rightCheek7_y" , no);
            var f10_x = faceu_parse( xml, "rightCheek6_x" , no);
            var f10_y = faceu_parse( xml, "rightCheek6_y" , no);
            var f11_x = faceu_parse( xml, "rightCheek5_x" , no);
            var f11_y = faceu_parse( xml, "rightCheek5_y" , no);
            var f12_x = faceu_parse( xml, "rightCheek4_x" , no);
            var f12_y = faceu_parse( xml, "rightCheek4_y" , no);
            var f13_x = faceu_parse( xml, "rightCheek3_x" , no);
            var f13_y = faceu_parse( xml, "rightCheek3_y" , no);
            var f14_x = faceu_parse( xml, "rightCheek2_x" , no);
            var f14_y = faceu_parse( xml, "rightCheek2_y" , no);
            var f15_x = faceu_parse( xml, "rightCheek1_x" , no);
            var f15_y = faceu_parse( xml, "rightCheek1_y" , no);
            var f16_x = faceu_parse( xml, "parietal_x" , no);
            var f16_y = faceu_parse( xml, "parietal_y" , no);
            var face_line = [f1_x, f1_y, f2_x, f2_y, f3_x, f3_y, f4_x, f4_y, f5_x, f5_y, f6_x, f6_y, f7_x, f7_y, f8_x, f8_y, f9_x, f9_y, f10_x, f10_y, f11_x, f11_y, f12_x, f12_y, f13_x, f13_y, f14_x, f14_y, f15_x, f15_y, f16_x, f16_y];
            return face_line;
        break;

        default:
        break;
    }

}