// getWebDavResourceList.js
'use strict';

//カレントディレクトリや親ディレクトリのパスを取得
function getDir(place, n) {
　　return place.pathname.replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((n || 0) + 1) + "}$"), "/");
}

/**
* WebDAVサーバ上のカレントディレクトリ上のResourcesリストを取得
* @private
* @property undefined
* @parameter ary : ヘッダ行の指定？
*/

function getResourceList(id,ary) //
{
    var isIE;
    //ブラウザの判定
    var userAgent = window.navigator.userAgent.toLowerCase();
    if( userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) ) {
        var isIE = true;
        var ieVersion = userAgent.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
        ieVersion = parseInt(ieVersion);
    } else {
        var isIE = false;
    }
    //if(window.DOMParser) isIE = false;
    
    //console.log("ary = " + ary);
    var local = window.location;
    var url = local.origin;
    var host = local.hostname;
    var hostUrl = "https://" + host;
    host = "https://" + host;
    var curDir = url + getDir(local); // 現在のディレクトリ
    //url + getDir(local,1); // 1つ上のディレクトリ
    //console.log("カレントディレクトリ curDir = " + curDir);    
    curDir = curDir.replace(host,"");
    //console.log("置換用文字列curDir = " + curDir);
    
    var xhr = new XMLHttpRequest();
    xhr.open("PROPFIND", "./",false); //falseなら同期するということ
    xhr.setRequestHeader('Depth', '1'); //直下のディレクトリのみ操作
    //xhr.setRequestHeader('Depth', '0'); //配下全てのディレクトリを取得（未サポート）
    //xhr.responseType = "document"; //エラー・・・ これだとHTMLが返ってくるらしい
    xhr.responseType = "text/xml"; //正解！(IE11は違うかも)
    //xhr.responseType = "xml"; //これもおそらく間違い
    //xhr.responseType = "text"; //これもエラー
    xhr.send();
    var $respXML = $(xhr.responseXML.childNodes[0]);
    var $respXML1 = $(xhr.responseXML.childNodes[1]);  // length = 0
    var $respXML2 = $(xhr.responseXML.childNodes[2]);  // length = 0
    var $respXML3 = $(xhr.responseXML.childNodes[3]);  // length = 0
    //var $respXML = $(xhr.responseXML.childNodes[0].innerHTML); //★こっちでは、findメソッドが使えないかも！！
    
    var xhrRespText = xhr.responseText;
    console.log("xhrRespText = " + xhrRespText);
    var $xml = $(xhrRespText);

    //console.table(xhr.responseXML); //無効！（何も表示されない）
    console.log("childNodes[0] = ");
    console.log(xhr.responseXML.childNodes[0]);
    console.log("innerText = " + xhr.responseXML.childNodes[0].innerText); // undefined
    console.log("innerHTML = ");
    console.log(xhr.responseXML.childNodes[0].innerHTML); // undefined（未定義）
    console.log("textContent = " + xhr.responseXML.childNodes[0].textContent); //IEではなら、これは、ファイルだけは拾えている
    
    //IE11用
    var xml;
    var parser = new DOMParser(); 
    //var doc = parser.parseFromString(xhr.responseXML, "text/xml");
    var $responseXML = $(xhr.responseXML);
    //var doc2 = parser.parseFromString($responseXML,"text/xml");
    if(isIE){ //IEの場合は
        xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.async = false;
        xml.loadXML(xhrRespText); //IE11ならこれでいけそう
    }else{
        xml = parser.parseFromString($responseXML,"text/xml"); //IE11の場合、エラーになってしまう
    }
    console.log("$responseXML = ");
    console.log($responseXML);
    
    //var $hrefs = $respXML.find("D:href");
    //var $hrefs = $respXML.find("href");
    var regExp;
    if(isIE){
        //regExp = new RegExp(decodeURI(curDir),"ig");
        regExp = new RegExp(encodeURI(curDir),"ig"); //IEの場合は、日本語で取得されるので、エンコードしないと置換（削除）できない
    }else{
        regExp = new RegExp(curDir,"ig"); //大文字、小文字を区別しないようにするために、オプション「i」も指定
    }
    var regExp2 = new RegExp("/d/","ig"); //WebDAV用アドレスを、web用URLに変換する
    
    var headerStr = "";
    for(var n=0; n<ary.length; n++){
        headerStr = headerStr +'<th><button class="sort" data-sort="'+ary[n]+'">'+ary[n]+'</button></th>';
    }
//    var tableStr = '<br><table class="type11"><col><col><thead><tr><th><button class="sort" data-sort="' + ary[0] + '">' + ary[0]
//  +'</button></th><th align="left"><button class="sort" data-sort="' + ary[1] + '">' + ary[1]
//  +'</button></th></th></thead><tbody class="list">'; //List.jsを適用するために、classに"list"の指定が必要
    var tableStr = '<br><table class="type11"><col><col><thead><tr>'+headerStr+'</thead><tbody class="list">'; //List.jsを適用するために、classに"list"の指定が必要
    
    if(isIE){
        if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
            jQuery.error( "Invalid XML: " + data );
        }
    }
    //console.log("getElementsByTagName.length = "  + xml.getElementsByTagName("href").length);
    console.log("getElementsByTagName.length = "  + xml.getElementsByTagName("D:href").length);
    var $xml;
    if(isIE){
        $xml = $(xml.getElementsByTagName("D:href")); //getElementsByTagNameは、findメソッドと同じ意味なはず
    }else{
        $xml = $respXML.find("href"); // 「D:href」だと何故か取得できない
    }
    // findメソッドか、eachメソッド
    //$respXML.find("D:href").each(function(i,elm){    //🔴何故かHitしない！！
    //console.log("findで抽出できた数（length) = " + $respXML.find("href").length);
    //sconsole.log("$xml.length = " + $xml.length);
    
    //if($respXML.find("href").length == 0) alert("ファイルもフォルダも存在しません");
    //if($xml.find("href").length == 0) alert("ファイルもフォルダも存在しません");
    //$respXML.find("href").each(function(i,elm){ //IE以外はこれでOK
    //xml.getElementsByTagName("D:href").each(function(i,elm){ //IE11の場合
    //xml.getElementsByTagName("D:href").each(function(i,elm){ //IE11の場合
    
    //$xml内の全要素？について走査
    $xml.each(function(i,elm){
    //xml.find("href").each(function(i,elm){
    //$xml.find("href").each(function(i,elm){
    //$responseXML.find("href").each(function(i,elm){
    //$respXML.find("D:href").each(function(i,elm){
        if(i == 0) return true; // eachにおける continue が、 return ture
        //ファイル名またはディレクトリ名（末尾がスラッシュならディレクトリ名）
        //console.log("elm = " + elm);
        var displayName;
        if(isIE){
            displayName = decodeURI(elm.text.replace(regExp,"")); // DOXでは、displaynameを直接取得はでき              
        }else{
            displayName = decodeURI(elm.innerHTML.replace(regExp,"")); // DOXでは、displaynameを直 IE11以外            
        }
        //var displayName = decodeURI(elm.replace(regExp,"")); // DOXでは、displaynameを直接取得はできないため、このhrefから置換（削除）で取得
        console.log(i + " , " + displayName);  
        
        //tableStr = tableStr + '<tr><td class="no">' + i + '</td><td class="displayName"><a href="' ;
        tableStr = tableStr + '<tr><td class="' + ary[0] + '">' + i + '</td><td class="' + ary[1] + '"><a href="' ;
        var a要素 = "";     
        var コメント = "";
        if(displayName.substr(displayName.length-1)!="/"){ //ディレクトリでない場合
            //以下だと、ディレクトリが移動できない。ディレクトリの場合は、w にしなければならない
            tableStr = tableStr + "./" + displayName;
        }else{ // ディレクトリの場合
            a要素 = '<a target="_blank" href="'+ displayName +'index.html">index.html</a>';
            //console.log("ディレクトリです." + elm.innerHTML.replace(regExp2,"/w/"));
            if(isIE){
                tableStr = tableStr + hostUrl + elm.text.replace(regExp2,"/w/");  //IE11の場合        
            }else{
                tableStr = tableStr + hostUrl + elm.innerHTML.replace(regExp2,"/w/");  //IE以外
            }
        }
        コメント = getComment(displayName);
        tableStr = tableStr + '" forSearch="' + katakanaToHiragana(displayName) + '">' + displayName+ '</a></td><td class="'+ary[2]+'">'+a要素+'</td><td class="'+ary[3]+'">'+ コメント +'</td></tr>';
    });
    //console.log("ここも");
    tableStr = tableStr + "</tbody></table>";

    //$('body').prepend(tableStr);
    //$('body').append(tableStr);
    $(id).append(tableStr);
}

//コメント。リソース名に含まれる文字列と、コメントのペア。（辞書型変数でも良かったか？）
//この配列をcsvファイルから読み込みたい(ajaxを使えばOKなはずだが、面倒かも)
//var comments = [["労務山積","引数つきで実行しないといけないので注意（無しでもデフォルト指定しているはずだが）"],
//                ["図面高速","鉄骨製品検査用。🔴 OH-1ではこの仕組みをほぼ使っておらず、動的に生成したリンクを一発で開いている"],
//                ["build","YUIDocで自動生成したドキュメント群が含まれる（この直下にindex.htmlは無い）"],
//                ["csv2table","🔴最新版にはバグがあるので注意"],
//                ["getWebDavResourceList.js","一覧表にコメントも表示できるようにした。"]
//               ];

//テキストファイルの読み込み
var comments = [[]];//配列の配列の初期化
$.ajax({ 
    url: 'コメント一覧.txt',  //なぜ小文字に変換？
    type: "GET", 
    scriptCharset: 'utf-8', 
    dataType: 'text', //【ポイント】JSONじゃない！！
    async: false   //非同期じゃない ＝ 同期
}).done(function(data){ // 成功時
    data = JSON.parse(data); //★★これをいれると、JSON形式でないテキストを、配列データとして取得できた！
    comments = data;
    console.table(comments);
}).fail(function(jqXHR, textStatus, errorThrown){
    // エラー処理
    console.log(textStatus);
    alert("error!: " + textStatus + " , \r\n errorThrown:  " + errorThrown);
});

//一覧表にコメントを付加したい場合はここで指定。
function getComment(dirName){
    //テキストファイル「コメント一覧.txt」の全コメント要素について、リソースに含まれるかどうかをチェックし、含まれていたら追加
    for(var i=0;i<comments.length; i++){
        if(dirName.indexOf(comments[i][0]) != -1){
            return comments[i][1];
        }
    }
    return "";    
}

//function createXMLHttpRequest(){
//  if(window.XMLHttpRequest){return new XMLHttpRequest()}
//  if(window.ActiveXObject){
//    try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}
//    try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}
//    try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}
//  }
//  return false;
//}

/** カタカナをひらがなに変換する関数
 * @param {String} src - カタカナ
 * @returns {String} - ひらがな
 */
function katakanaToHiragana(src) {
	return src.replace(/[\u30a1-\u30f6]/g, function(match) {
		var chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	});
}
/** ひらがなをカタカナに変換する関数
 * @param {String} src - ひらがな
 * @returns {String} - カタカナ
 */
function hiraganaToKatagana(src) {
	return src.replace(/[\u3041-\u3096]/g, function(match) {
		var chr = match.charCodeAt(0) + 0x60;
		return String.fromCharCode(chr);
	});
}