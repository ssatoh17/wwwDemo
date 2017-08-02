// ------------------------------------------------------------
// 「基点 DOM オブジェクト」の直前に「新しい DOM オブジェクト」を登録する関数
// ------------------------------------------------------------
function DomNodeInsertBefore(node_ref,node_new){
	var parent = node_ref.parentNode;
	if(!parent)	return false;

	var node =  parent.insertBefore(node_new,node_ref);
	return (node == node_new);
}

// ------------------------------------------------------------
// 任意の DOM オブジェクトをノードリストから除外する関数
// ------------------------------------------------------------
function DomNodeRemove(node_ref){
	var parent = node_ref.parentNode;
	if(!parent)	return false;

	var node =  parent.removeChild(node_ref);
	return (node == node_ref);
}

// ------------------------------------------------------------
// ドキュメントのクライアント領域のサイズを取得する関数
// ------------------------------------------------------------
function DocumentGetClientSize(document_obj){
	var b = document_obj.body;
	var r = document_obj.documentElement;
	var w = b.clientWidth;
	var h;
	if(w < r.clientWidth)	w = r.clientWidth;
	if(document_obj.compatMode == "BackCompat"){
		h = b.clientHeight;
	}else{
		if(r.clientHeight){
			h = r.clientHeight;
		}else{
			h = b.clientHeight;
		}
	}
	return {
		width :w,
		height:h
	};
}

// ------------------------------------------------------------
// スクロール位置を取得する関数
// ------------------------------------------------------------
function DocumentGetScrollPosition(document_obj){
	return{
		x:document_obj.body.scrollLeft || document_obj.documentElement.scrollLeft,
		y:document_obj.body.scrollTop  || document_obj.documentElement.scrollTop
	};
}

// ------------------------------------------------------------
// エレメントに文字列をセットして、テキストノードを構築する関数
// ------------------------------------------------------------
function ElementSetTextContent(element,str){
	if(element.textContent !== undefined){
		element.textContent = str;
	}
	if(element.innerText !== undefined){
		element.innerText = str;
	}
}

// ------------------------------------------------------------
// XMLHttpRequest オブジェクトを作成
// ------------------------------------------------------------
function XMLHttpRequestCreate() {
		try{
			return new XMLHttpRequest();
		}catch(e){}
		try{
			return new ActiveXObject('MSXML2.XMLHTTP.6.0');
		}catch(e){}
		try{
			return new ActiveXObject('MSXML2.XMLHTTP.3.0');
		}catch(e){}
		try{
			return new ActiveXObject('MSXML2.XMLHTTP');
		}catch(e){}

		return null;
}

// ------------------------------------------------------------
// 「JSON 文字列」から「JavaScript のオブジェクト」に変換する関数
// ------------------------------------------------------------
function JsonParse(text){
	var pre_w = new Object();
	var pre_u = new Object();
	var pre_b = new Object();
	var pre_n = new Object();
	var pre_s = new Object();
	var pre_a = new Object();
	var pre_o = new Object();
	var dic_d = new Object();
	var dic_e = new Object();
	pre_u['n'] = pre_b['t'] = pre_b['f'] = pre_s['"'] = pre_a['['] = pre_o['{'] = pre_w[' '] = pre_w['\t'] = pre_w['\r'] = pre_w['\n'] = true;
	pre_n['0'] = pre_n['1'] = pre_n['2'] = pre_n['3'] = pre_n['4'] = pre_n['5'] = pre_n['6'] = pre_n['7'] = pre_n['8'] = pre_n['9'] = pre_n['-'] = true;
	dic_d['0'] = dic_d['1'] = dic_d['2'] = dic_d['3'] = dic_d['4'] = dic_d['5'] = dic_d['6'] = dic_d['7'] = dic_d['8'] = dic_d['9'] = true;
	dic_e['/'] = '/'; dic_e['b'] = '\b'; dic_e['f'] = '\f'; dic_e['n'] = '\n'; dic_e['r'] = '\r'; dic_e['t'] = '\t'; dic_e['\"'] = '\"'; dic_e['\\'] = '\\';

	var p = 0;
	var num = text.length;

	function skip(){
		while(pre_w[text.charAt(p)]){
			p++;
			if(p >= num){
				return;
			}
		}
	}

	function parse(){
		var r;
		var c;
		var w;
		var s;
		var e;

		skip();
		c = text.charAt(p);

		// オブジェクト
		if(pre_o[c]){
			var obj = new Object();

			p++;
			skip();
			r = true;
			while(true){
				c = text.charAt(p);
				if(c == '}'){
					if(!r) throw("JsonParse: Missing comma(,) position:" + p);
					p++;
					break;
				}
				if(c != '"') throw("JsonParse: Missing double quote(\") position:" + p);

				w = parse();

				skip();
				if(text.charAt(p) != ':') throw("JsonParse: Missing semicolon(:) position:" + p);
				p++;
				skip();

				obj[w] = parse();

				skip();
				if(p >= num){ throw("JsonParse: Missing curly bracket(}) position:" + p); }

				r = (text.charAt(p) != ',');
				if(!r){
					p++;
					skip();
				}
			}

			return obj;

		// 配列
		}else if(pre_a[c]){
			var ary = new Array();

			p++;
			skip();
			r = true;
			while(true){
				if(text.charAt(p) == ']'){
					if(!r) throw("JsonParse: Missing comma(,) position:" + p);
					p++;
					break;
				}

				ary.push(parse());

				skip();
				if(p >= num){ throw("JsonParse: Missing square bracket(]) position:" + p); }

				r = (text.charAt(p) != ',');
				if(!r){
					p++;
					skip();
				}
			}

			return ary;

		// 文字列
		}else if(pre_s[c]){
			p++;

			var str = "";
			while(true){
				if(p >= num)  throw("JsonParse: Missing double quote(\") position:" + p);
				c = text.charAt(p);
				p++;
				if(c == '"'){
					break;
				}else if(c == "\\"){
					c = text.charAt(p);
					p++;
					if(c == 'u'){
						e = 0;
						r = ((num - p) > 4);
						if(r){
							s = text.charCodeAt(p);
							if(!s)			s = 0;
							if(s >= 97)		s -= 87;
							else if(s >= 65)	s -= 55;
							else			s -= 48;
							if(0 <= s && s < 16){
								e += s * 0x1000;
								p++;
							}else{
								r = false;
							}
						}
						if(r){
							s = text.charCodeAt(p);
							if(!s)			s = 0;
							if(s >= 97)		s -= 87;
							else if(s >= 65)	s -= 55;
							else			s -= 48;
							if(0 <= s && s < 16){
								e += s * 0x0100;
								p++;
							}else{
								r = false;
							}
						}
						if(r){
							s = text.charCodeAt(p);
							if(!s)			s = 0;
							if(s >= 97)		s -= 87;
							else if(s >= 65)	s -= 55;
							else			s -= 48;
							if(0 <= s && s < 16){
								e += s * 0x0010;
								p++;
							}else{
								r = false;
							}
						}
						if(r){
							s = text.charCodeAt(p);
							if(!s)			s = 0;
							if(s >= 97)		s -= 87;
							else if(s >= 65)	s -= 55;
							else			s -= 48;
							if(0 <= s && s < 16){
								e += s * 0x0001;
								p++;
							}else{
								r = false;
							}
						}
						if(r){
							str += String.fromCharCode(e);
						}else{
							throw("JsonParse: Invalid codepoint. position:" + p);
						}
					}else if(dic_e[c] != undefined){
						str += dic_e[c];
					}else{
						throw("JsonParse: Invalid escape. position:" + (p-1));
					}
				}else{
					str += c;
				}
			}
			return str;

		// 数値
		}else if(pre_n[c]){
			s = p;
			p ++;

			while(dic_d[text.charAt(p)]){
				p++;
			}

			r = false;
			if(text.charAt(p) == '.'){
				p++;
				r = true;

				if(!dic_d[text.charAt(p)]){
					throw("JsonParse: Missing digits after decimal. position:" + p);
				}
				p++;

				while(dic_d[text.charAt(p)]){
					p++;
				}
			}
			if(text.charAt(p) == 'e'){
				p++;
				r = true;

				c = text.charAt(p);
				if(c == '+' || c == '-'){
					p++;
				}

				if(!dic_d[text.charAt(p)]){
					throw("JsonParse: Missing digits after exponent. position:" + p);
				}
				p++;

				while(dic_d[text.charAt(p)]){
					p++;
				}
			}

			if(r)	return parseFloat(text.substring(s,p));
			else	return parseInt(text.substring(s,p));

		// 真偽値
		}else if(pre_b[c]){
			w = text.substr(p, 5);
			if(w == "false"){
				p += 5;
				return false;
			}
			if(w.indexOf("true") == 0){
				p += 4;
				return true;
			}

		// null 値
		}else if(pre_u[c]){
			if(text.substr(p, 4) == "null"){
				p += 4;
				return null;
			}
		}

		throw("JsonParse: Unable to parse value. position:" + p);
	}

	var data = parse();
	skip();
	if(p < num) throw("JsonParse: Unexpected character after JSON. position:" + p);
	return data;
}

// ------------------------------------------------------------
// DOM オブジェクトの構築が完了したか調べる関数
// ------------------------------------------------------------
function DocumentGetLoadedDomContent(document_obj,callback){

	switch(document_obj.readyState){
	case "interactive":
	case "complete":
		callback();
		return;
	}

	if(document_obj.addEventListener){
		document_obj.addEventListener("DOMContentLoaded" , function callee(e){
			document_obj.removeEventListener("DOMContentLoaded" , callee);
			callback();
		});

	}else if(document_obj.attachEvent){
		var f = function (e){
			switch(document_obj.readyState){
			case "interactive":
			case "complete":
				document_obj.detachEvent("onreadystatechange" , f);
				callback();
				break;
			}
		};
		document_obj.attachEvent("onreadystatechange" , f);
	}
}


// ------------------------------------------------------------
// 公開メソッド
// ------------------------------------------------------------
(function(){

	// ------------------------------------------------------------
	// ヘッダ関連出力
	// ------------------------------------------------------------
	window.HH_WriteHeader = function(){
		window.HH_WriteHeader = function(){};

		// ------------------------------------------------------------
		// コメント出力
		// ------------------------------------------------------------
		(function(){
			try{
				var element = document.getElementById("comment_message");
				element.innerHTML = "Firefox の XHR.responseText コスト高すぎィ";
			}catch(e){
			}
		})();

		// ------------------------------------------------------------
		// 履歴出力
		// ------------------------------------------------------------
		(function(){
			try{
				var element = document.getElementById("history_message");
				element.innerHTML = '<PRE style="width:1px; padding:0px; margin:0px;">\
2016/08/05 … JS講座に、<A HREF="http://hakuhin.jp/js/set.html">Set クラスについて</A>を追加しました。\n\
2016/07/31 … <a href="http://hakuhin.jp/browser_extension/page_expand.html">PageExpand 1.5.7</a> をリリースしました。\n\
2016/07/29 … JS講座に、<A HREF="http://hakuhin.jp/js/generator.html">Generator について</A>を追加しました。\n\
2016/07/25 … JS講座に、<A HREF="http://hakuhin.jp/js/iterator.html">Iterator について</A>を追加しました。\n\
2016/07/06 … JS講座に、<A HREF="http://hakuhin.jp/js/battery_status.html">Battery Status API について</A>を追加しました。\n\
2016/07/01 … <a href="http://hakuhin.jp/browser_extension/page_expand.html">PageExpand 1.5.6</a> をリリースしました。\n\
2016/06/05 … <a href="http://hakuhin.jp/browser_extension/page_expand.html">PageExpand 1.5.5</a> をリリースしました。\n\
2016/04/10 … <a href="http://hakuhin.jp/browser_extension/page_expand.html">PageExpand 1.5.4</a> をリリースしました。\n\
2016/02/13 … <a href="http://hakuhin.jp/browser_extension/page_expand.html">PageExpand 1.5.3</a> をリリースしました。\n\
2016/02/10 … JS講座に、<A HREF="http://hakuhin.jp/js/clipboard.html">Clipboard API について</A>を追加しました。\n\
2016/01/27 … JS講座に、<A HREF="http://hakuhin.jp/js/text_editor.html">開発者向けのテキストエディタについて</A>を追加しました。\n\
2016/01/24 … <a href="http://hakuhin.jp/browser_extension/page_expand.html">PageExpand 1.5.1</a> をリリースしました。\n\
2016/01/05 … <a href="http://hakuhin.jp/browser_extension/page_expand.html">PageExpand 1.5.0</a> をリリースしました。\n\
</PRE>\n\
\n\
\n\
<span style="font-size:12px;"><A HREF="http://hakuhin.jp/history.html">過去の履歴はこちら</A></span>\n\
';
			}catch(e){
			}
		})();

		// ------------------------------------------------------------
		// 検索
		// ------------------------------------------------------------
		(function(){
			try{
				var input = document.getElementById('input_search');
				var output = document.getElementById('search_result');
				var attention;

				function initInput(){
					input.style.color = "#C0C0C0";
					input.value = "検索したいワードを入力";
					attention = true;
				}
				initInput();

				input.onfocus = function (){
					if(attention){
						input.value = "";
						input.style.color = "#000000";
					}
					attention = false;
				};

				input.onblur = function (){
					if(!input.value){
						initInput();
					}
				};

				google.load('search', '1', {language : 'ja'});
				google.setOnLoadCallback(function () {

					var customSearchControl = new google.search.CustomSearchControl('001801027233803208759:6nsu1ed9o_k');
					customSearchControl.setResultSetSize(google.search.Search.SMALL_RESULTSET);
					var options = new google.search.DrawOptions();
					options.setAutoComplete(true);

					var search;
					search = new GwebSearch();
					search.setSiteRestriction("001801027233803208759:nep_dhuvxxg");
					search.setUserDefinedLabel("AS1.0講座");
					customSearchControl.addSearcher(search);

					search = new GwebSearch();
					search.setSiteRestriction("001801027233803208759:rhm1kkoyu3m");
					search.setUserDefinedLabel("AS3.0講座");
					customSearchControl.addSearcher(search);

					search = new GwebSearch();
					search.setSiteRestriction("001801027233803208759:3opn0yurffy");
					search.setUserDefinedLabel("AIR講座");
					customSearchControl.addSearcher(search);

					search = new GwebSearch();
					search.setSiteRestriction("001801027233803208759:cmyjheigcis");
					search.setUserDefinedLabel("JS講座");
					customSearchControl.addSearcher(search);

					customSearchControl.draw('cse', options);

					options.setInput(input);
					customSearchControl.draw(output, options);

					var attached = false;
					customSearchControl.setSearchCompleteCallback(this,function (ctrl,searcher) {
						if(attached)	return;
						attached = true;

						var div = document.createElement("div");
						div.innerHTML = "検索結果";
						div.className = "search_head";

						DomNodeInsertBefore(output,div);
						output.className = "search_result";
					});

				}, true);
			}catch(e){
			}
		})();

	};

	// ------------------------------------------------------------
	// はてなブックマーク出力
	// ------------------------------------------------------------
	var hatena_bookmark_queue = new Array();
	(function(){
		var unique_id = 0;
		window.HH_WriteHatenaBookmark = function(param){
			try{
				var id = "hh_hatena_bookmark_" + unique_id;
				unique_id ++;

				document.write("<span id=\"" + id + "\"><\/span>");
				var element = document.getElementById(id);

				if(element){
					hatena_bookmark_queue.push({
						element:element,
						url:param.url
					});
				}
			}catch(e){
			}
		};
	})();

	// ------------------------------------------------------------
	// スクロール監視
	// ------------------------------------------------------------
	var observeScroll = function(parent,element,options){
		var show = false;

		function handler(){
			var rect = parent.getBoundingClientRect();
			var client_size = DocumentGetClientSize(document);
			var ax_min = rect.left;
			var ax_max = rect.right;
			var ay_min = rect.top;
			var ay_max = rect.bottom;
			var bx_min = 0 + 0;
			var bx_max = client_size.width  - 0;
			var by_min = 0 + 0;
			var by_max = client_size.height - 0;

			var hit = false;
			if(ax_max < bx_min){
			}else if(bx_max < ax_min){
			}else if(ay_max < by_min){
			}else if(by_max < ay_min){
			}else{
				hit = true;
			}

			if(show){
				if(!hit){
					show = false;
					if(options.destructor){
						options.destructor(options);
					}
					DomNodeRemove(element);
				}
			}else{
				if(hit){
					show = true;
					parent.appendChild(element);
					if(options.initialize){
						options.initialize(options);
					}
				}
			}
		};

		if(window.addEventListener){
			window.addEventListener("scroll",handler,true);
		}else if(window.attachEvent){
			window.attachEvent("onscroll",handler);
		}

		handler();
	};

	// ------------------------------------------------------------
	// Flash 要素を出力
	// ------------------------------------------------------------
	(function(){
		var unique_id = 0;
		window.HH_WriteFlash = function(param){
			try{
				var id = "hh_flash_" + unique_id;
				unique_id ++;

				document.write("<div id=\"" + id + "\" style=\"padding:0px; margin:0px auto; \"></div>");
				var container = document.getElementById(id);
				container.style.width  = (param.width)  + "px";
				container.style.height = (param.height) + "px";

				var element = document.createElement("embed");
				element.style.cssText = "border:1px #000000 solid;";
				element.type = "application/x-shockwave-flash";
				element.pluginspage = "http://www.adobe.com/go/getflashplayer_jp";
				element.base = (param.base) ? (param.base):"./";
				element.wmode = (param.wmode) ? (param.wmode):"direct";
				element.allowFullScreen = true;
				element.sameDomain = true;
				element.allowScriptAccess = "";
				element.width  = param.width;
				element.height = param.height;
				element.bgcolor = "#ffffff";
				element.quality = "high";
				element.src = param.url;
				observeScroll(container,element,param);
			}catch(e){
			}
		};
	})();

	// ------------------------------------------------------------
	// 要素を出力
	// ------------------------------------------------------------
	(function(){
		var unique_id = 0;
		window.HH_WriteHTML = function(param){
			try{
				var id = "hh_element_" + unique_id;
				unique_id ++;

				var width  = (param.width)  ? (param.width+"px") :"100%";
				var height = (param.height) ? (param.height+"px"):"auto";

				document.write("<div id=\"" + id + "\" style=\"padding:0px; margin:0px auto; \"></div>");
				var container = document.getElementById(id);
				container.style.width  = width;
				container.style.height = height;

				var element = document.createElement("div");
				element.style.width  = width;
				element.style.height = height;
				element.innerHTML = param.tag;
				observeScroll(container,element,param);
			}catch(e){
			}
		};
	})();

	// ------------------------------------------------------------
	// JavaScript サンプルを出力
	// ------------------------------------------------------------
	(function(){
		var unique_id = 0;
		window.HH_WriteSampleForJavaScript = function(script){
			try{
				var id = unique_id;
				unique_id ++;

				var str = script;
				str = str.replace(/(<!--)/g, "");
				str = str.replace(/(-->)/g, "");

				document.write("<div class=\"js_sample\">");
				document.write("<div class=\"js_sample_head\">サンプル</div>");
				document.write("<div class=\"js_sample_foot\">");
				document.write(str);
				document.write("</div></div>");

				var str = script;
				str = str.replace(/</g, "&lt;");
				str = str.replace(/>/g, "&gt;");
				str = str.replace(/(&lt;!--)/g, "<span class=\"comment\">$1<\/span>");
				str = str.replace(/([/][/])(.*)/g, "<span class=\"comment\">$1$2<\/span>");

				document.write("<div id=\"js_source" + id + "\" class=\"js_source\">");
				document.write("<div id=\"js_source_head" + id + "\" class=\"js_source_head\">ソースを開く（クリック）</div>");
				document.write("</div>");

				var element = document.getElementById("js_source" + id);
				element.onclick = function (){
					var head = document.getElementById("js_source_head" + id);
					head.innerText = "ソース";

					var foot = document.createElement('div');
					foot.className = "js_source_foot";
					foot.innerHTML = "<pre class = \"js_source_code\">" + str + "</PRE>";
					element.appendChild(foot);
					element.onclick = null;
				}
			}catch(e){
			}
		};
	})();

	// ------------------------------------------------------------
	// 講座用タブを出力
	// ------------------------------------------------------------
	window.HH_WriteTabForReference = function(params){
		try{
			var obj = new Object();
			obj.as  = {normal_color:"#CFDAE4", over_color:"#DFEAF4", label:"ActionScript1.0～2.0"	};
			obj.as3 = {normal_color:"#C6DDC6", over_color:"#D6EDD6", label:"ActionScript3.0"		};
			obj.air = {normal_color:"#D3C7C0", over_color:"#E0CFCB", label:"Adobe AIR"				};
			obj.js  = {normal_color:"#DCCAD5", over_color:"#ECDAE5", label:"JavaScript"				};
			obj.c   = {normal_color:"#CECDC5", over_color:"#B3B2AA", label:"C言語"					};
			obj.es  = {normal_color:"#CECDC5", over_color:"#B3B2AA", label:"ECMAScript"				};

			var num = params.length;
	
			document.write('<div><table cellspacing="0"><tr>');
	
			var i;
			for(i=0;i<num;i++){
				var param = params[i];
				document.write('<td style="padding:0px;" valign="bottom">');
				if(i != 0){
					document.write('<a href="../' + param.folder + '/' + param.file + '" style="text-decoration: none;">');
					document.write('<div style="color:#000; padding:5px 20px; margin:0px 0px 0px 5px; font-size:12px; font-weight:bold; border-radius: 10px 10px 0px 0px; background:' + obj[param.folder].normal_color + ';" onmouseover="this.style.background=\'' + obj[param.folder].over_color + '\'; this.style.padding=\'8px 20px\';" onmouseout="this.style.background=\'' + obj[param.folder].normal_color + '\'; this.style.padding=\'5px 20px\';">' + obj[param.folder].label + '</div>');
					document.write('</a>');
				}else{
					document.write('<div style="padding:8px 20px; font-size:14px; font-weight:bold; font-weight:bold; border-radius: 10px 10px 0px 0px; background:' + obj[param.folder].normal_color + ';">' + obj[param.folder].label + '</div>');
				}
				document.write('</td>');
			}

			document.write('</tr></table></div>');
		}catch(e){
		}
	};

	// ------------------------------------------------------------
	// 講座トップページ用タブを出力
	// ------------------------------------------------------------
	window.HH_WriteTabForReferenceRoot = function(params){
		try{
			var obj = new Object();
			obj.as  = {normal_color:"#CFDAE4", over_color:"#DFEAF4", label:"ActionScript1.0～2.0"	, short:"AS1.0"		};
			obj.as3 = {normal_color:"#C6DDC6", over_color:"#D6EDD6", label:"ActionScript3.0"		, short:"AS3.0"		};
			obj.air = {normal_color:"#D3C7C0", over_color:"#E0CFCB", label:"Adobe AIR"				, short:"AIR"		};
			obj.js  = {normal_color:"#DCCAD5", over_color:"#ECDAE5", label:"JavaScript"				, short:"JS"		};
			obj.c   = {normal_color:"#CECDC5", over_color:"#B3B2AA", label:"C言語"					, short:"C"			};
			obj.es  = {normal_color:"#CECDC5", over_color:"#B3B2AA", label:"ECMAScript"				, short:"ES"		};

			var num = params.length;
	
			document.write('<div><table cellspacing="0"><tr>');
	
			var i;
			for(i=0;i<num;i++){
				var param = params[i];
				document.write('<td style="padding:0px;" valign="bottom">');
				var context = '<span class="ref_desktop">' + obj[param.folder].label + '</span><span class="ref_mobile">' + obj[param.folder].short + '</span>';
				if(i != 0){
					document.write('<a href="./' + param.file + '" style="text-decoration: none;">');
					document.write('<div style="color:#000; padding:5px 20px; margin:0px 0px 0px 4px; font-size:12px; font-weight:bold; border-radius: 10px 10px 0px 0px; background:' + obj[param.folder].normal_color + ';" onmouseover="this.style.background=\'' + obj[param.folder].over_color + '\'; this.style.padding=\'8px 20px\';" onmouseout="this.style.background=\'' + obj[param.folder].normal_color + '\'; this.style.padding=\'5px 20px\';">' + context + '</div>');
					document.write('</a>');
				}else{
					document.write('<div style="padding:8px 20px; font-size:14px; font-weight:bold; font-weight:bold; border-radius: 10px 10px 0px 0px; background:' + obj[param.folder].normal_color + ';">' + context + '</div>');
				}
				document.write('</td>');
			}
			document.write('</tr></table></div>\n');
			document.write(
				'<style>\n'+
					'.ref_desktop{\n'+
						'display:block;\n'+
					'}\n'+
					'.ref_mobile{\n'+
						'display:none;\n'+
					'}\n'+
					'@media (min-width: 0px) and (max-width: 550px) {\n'+
						'.ref_desktop{\n'+
							'display:none;\n'+
						'}\n'+
						'.ref_mobile{\n'+
							'display:block;\n'+
						'}\n'+
				'}\n'+
			'</style>\n');
		}catch(e){
		}
	};

	// ------------------------------------------------------------
	// WeekCounter を出力
	// ------------------------------------------------------------
	window.HH_WriteReceive = function(params){
		try{
			document.write(
				'<div class="receive">' + 
				'<div class="receive_head">このページに関するご意見やご感想がありましたらどうぞ。（非公開）<input type="button" id = "receive_button" class = "receive_button" value="送信"></div>' + 
				'<div class="receive_foot" >' + 
				'	<textarea id = "receive_text" class = "receive_text" rows="5"></textarea>' + 
				'	</td></tr></table>' + 
				'</div>' + 
				'</div>'
			);

			var element_text = document.getElementById("receive_text");
			var element_button = document.getElementById("receive_button");

			element_button.onclick = function(){
				if(element_button.disabled) return;

				// エラーチェック
				var input = (function (){
					if(!(element_text.value)){
						return element_text;
					}
					return null;
				})();
				if(input){
					input.focus();
					return;
				}

				// メッセージを送る
				var param = "";
				param += "type=receive";
				param += "&";
				param += "message=" + encodeURIComponent(element_text.value);
				param += "&";
				param += "url=" + encodeURIComponent(document.location);

				var xhr = XMLHttpRequestCreate();
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4){
						if(xhr.status == 200) {
							var ary = xhr.responseText.split("&");
							var res = new Object();
							for(var i=0;i<ary.length;i++){
								var p = ary[i].split("=");
								res[p[0]] = p[1];
							}

							if(res.result){
								alert("送信が完了しました。");
							}else{
								alert("CGI がエラーを返しました\n\n" + res.error);
								element_button.disabled = false;
							}
						}else{
							alert("送信に失敗しました。\n\nHTTP:" + xhr.status);
							element_button.disabled = false;
						}
					}
				};

				xhr.open("POST", "http://hakuhin.jp/receive/receive.cgi");
				xhr.send(param);

				element_button.disabled = true;
			}
		}catch(e){
		}
	};

	// ------------------------------------------------------------
	// WeekCounter を出力
	// ------------------------------------------------------------
	window.HH_WriteWeekCounter = function(params){
		try{
			document.write('<span style="font-size:12px;" id="week_counter"></span>');

			function StringDateFromPerlTime(time){
				// 曜日データ
				var ary = ["日","月","火","水","木","金","土"];

				// ローカル時間を取得
				var date_obj = new Date(time * 1000);

				var year = date_obj.getFullYear();
				var mon = date_obj.getMonth() + 1;
				var day = date_obj.getDate();
				var week = ary[date_obj.getDay()];

				// ローカル時間で取得可能パラメータを文字として連結
				var str = "";
				str += (year < 10 ? "0" : "") + year;
				str += "/";
				str += (mon < 10 ? "0" : "") + mon;
				str += "/";
				str += (day < 10 ? "0" : "") + day;
				str += " ";
				str += "(" + week + ")";
				return str;
			}

			// エレメントを取得
			var week_counter = document.getElementById("week_counter");

			// ユニークなコールバック関数用の名前を生成
			var callback_name = "hh_week_counter";

			// スクリプトエレメントを作成する
			var element = document.createElement("script");

			// window 直下に受信用コールバック用関数を生成
			window[callback_name] = function (param){

				try{
					delete window[callback_name];
				}catch(e){
					window[callback_name] = null;
				}

				DomNodeRemove(element);
				ElementSetTextContent(week_counter,param.total.uu);

				var popup;
				week_counter.onmouseover = function (){
					if(popup)	return;

					popup = document.createElement("div");
					popup.style.cssText = "position:fixed; font-size:12px; line-height:1.0; width:auto; border:2px solid #000; background:#FFF;";

					var str = '<table style="width:100%;">' + 
					'<tr><td style="width:100px; text-align:center;">day</td><td style="width:60px; text-align:center;">uu</td><td style="width:60px; text-align:center;">pv</td></tr>';

					var i;
					var dailys = param.daily;
					for(i = dailys.length-1;i>=0;i--){
						str += '<tr>' + 
						'<td style="width:100px; text-align:center;">' + StringDateFromPerlTime(dailys[i].create_time) +  '</td><td style="width:60px; text-align:center;">' + dailys[i].uu + '</td><td style="width:60px; text-align:center;">' + dailys[i].pv  +  '</td>' +
						'</tr>';
					}
					str += '</table>';
					popup.innerHTML = str;
					document.body.appendChild(popup);

					// 矩形を取得
					var rect0 = week_counter.getBoundingClientRect();
					var rect1 = popup.getBoundingClientRect();
					popup.style.top  = (rect0.top - (rect1.bottom - rect1.top) - 4) + "px";
					popup.style.left = (rect0.right - (rect1.right - rect1.left)) + "px";
		
				};
				week_counter.onmouseout = function (){
					if(popup){
						DomNodeRemove(popup);
						popup = null;
					}
				};
			};

			// アドレスをセット
			element.src = "http://hakuhin.jp/week_counter/?callback=" + callback_name;

			// body のノードリストに登録する（通信開始）
			document.body.appendChild(element);

		}catch(e){
		}
	};

	// ------------------------------------------------------------
	// スポンサー
	// ------------------------------------------------------------
	(function(){
		var loadScript = function(){
			loadScript = function(){};
			document.write(
				'<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
			);
		};

		var sponsored_ink_text = '<div style="text-align:left; line-height:1.0; margin-bottom:3px;"><div style="font-size:10px; color:#888; line-height:1.0;">スポンサードリンク</div></div>';
		var adsbygoogle_style = " ";

		// ------------------------------------------------------------
		// レクタングル大広告 出力
		// ------------------------------------------------------------
		window.HH_WriteSponsorRectangleBig = function(){
			try{
				loadScript();
				var client_size = DocumentGetClientSize(document);
				if(client_size.width >= 340){
					document.write(
						sponsored_ink_text + '\n' +
						'<ins class="adsbygoogle"\n' +
						'     style="display:inline-block;width:336px;height:280px;' + adsbygoogle_style + '"\n' +
						'     data-ad-client="ca-pub-2028288171521864"\n' +
						'     data-ad-slot="6817693902"></ins>'
					);
					(adsbygoogle = window.adsbygoogle || []).push({});
				}else{
					document.write(
						sponsored_ink_text + '\n' +
						'<ins class="adsbygoogle"\n' +
						'     style="display:inline-block;width:300px;height:250px;' + adsbygoogle_style + '"\n' +
						'     data-ad-client="ca-pub-2028288171521864"\n' +
						'     data-ad-slot="3258919219"></ins>'
					);
					(adsbygoogle = window.adsbygoogle || []).push({});
				}
			}catch(e){
			}
		};

		// ------------------------------------------------------------
		// レクタングル大広告(クエリ付き) 出力
		// ------------------------------------------------------------
		window.HH_WriteSponsorRectangleBigArgument = function(query){
			try{
				var url = document.URL;
				var p = url.indexOf("#");
				var q = url.substring(p+1);
				if(q == query){
					HH_WriteSponsorRectangleBig();
				}
			}catch(e){
			}
		};

		// ------------------------------------------------------------
		// ビッグバナー広告 出力
		// ------------------------------------------------------------
		window.HH_WriteSponsorBigBanner = function(){
			try{
				loadScript();
				var client_size = DocumentGetClientSize(document);
				if(client_size.width >= 730){
					document.write(
						sponsored_ink_text + '\n' +
						'<ins class="adsbygoogle"\n' +
						'     style="display:inline-block;width:728px;height:90px;' + adsbygoogle_style + '"\n' +
						'     data-ad-client="ca-pub-2028288171521864"\n' +
						'     data-ad-slot="9605026767"></ins>'
					);
					(adsbygoogle = window.adsbygoogle || []).push({});
				}else{
					document.write(
						sponsored_ink_text + '\n' +
						'<ins class="adsbygoogle"\n' +
						'     style="display:inline-block;width:320px;height:100px;' + adsbygoogle_style + '"\n' +
						'     data-ad-client="ca-pub-2028288171521864"\n' +
						'     data-ad-slot="4735652413"></ins>'
					);
					(adsbygoogle = window.adsbygoogle || []).push({});
				}
			}catch(e){
			}
		};

		// ------------------------------------------------------------
		// ワイド スカイスクレイパー広告 出力
		// ------------------------------------------------------------
		window.HH_WriteSponsor = function(){
			try{
				loadScript();
				document.write(
					sponsored_ink_text + '\n' +
					'<ins class="adsbygoogle"\n' +
					'     style="display:inline-block;width:160px;height:600px;' + adsbygoogle_style + '"\n' +
					'     data-ad-client="ca-pub-2028288171521864"\n' +
					'     data-ad-slot="4341558188"></ins>'
				);
				(adsbygoogle = window.adsbygoogle || []).push({});
			}catch(e){
			}
		};

		// ------------------------------------------------------------
		// ワイド スカイスクレイパー広告(クエリなし) 出力
		// ------------------------------------------------------------
		window.HH_WriteSponsorNoFragment = function(){
			try{
				var url = document.URL;
				var p = url.indexOf("#");
				if(p == -1){
					loadScript();
					document.write(
						sponsored_ink_text + '\n' +
						'<ins class="adsbygoogle"\n' +
						'     style="display:inline-block;width:160px;height:600px;' + adsbygoogle_style + '"\n' +
						'     data-ad-client="ca-pub-2028288171521864"\n' +
						'     data-ad-slot="4319294411"></ins>'
					);
					(adsbygoogle = window.adsbygoogle || []).push({});
				}
			}catch(e){
			}
		};
	})();

	// ------------------------------------------------------------
	// 読み込み完了
	// ------------------------------------------------------------
	window.HH_LoadedDOMContent = function(){
		window.HH_LoadedDOMContent = function(){};

		// ------------------------------------------------------------
		// PR
		// ------------------------------------------------------------
		(function(){
			try{
				var element = document.getElementById("menu_pr");
				var list = [
					'<A HREF = "http://hakuhin.jp/game/bs_revise.html" ><IMG src="http://hakuhin.jp/link/bs_revise_banner00.png" class="image" width = "180" height="400" alt="BULLET STORM -惑星オーロンの最期- REVISED EDITION"></A><BR>'
				];
				element.innerHTML = list[Math.floor(Math.random() * list.length)];
			}catch(e){
			}
		})();

		// ------------------------------------------------------------
		// 問答集集
		// ------------------------------------------------------------
		(function(){
			try{
				var unique_id = 0;
				var menu_mcs = document.getElementById("menu_mcs");
				if(!menu_mcs) return;

				var url_list = [
					{
						category:"flash",
						subject:"Flash 関連の質問"
					},{
						category:"javascript",
						subject:"JavaScript の質問"
					}
				]

				var i;
				var num = url_list.length;
				for(i=0;i<num;i++){
					(function (){
						var item = url_list[i];
						var callback_name = "HH_McsCallbackFunc" + unique_id;
						unique_id ++;

						var script = document.createElement("script");
						window[callback_name] = function (response){
							try{
								delete window[callback_name];
							}catch(e){
								window[callback_name] = null;
							}

							DomNodeRemove(script);

							try{
								response = JsonParse(response);
							}catch(e){
								return;
							}

							var title = document.createElement("div");
							title.style.cssText = "font-size:14px; font-weight:bold;";
							menu_mcs.appendChild(title);

							var title_anchor = document.createElement("a");
							title_anchor.style.cssText = "color:#000;";
							title_anchor.href = "http://mcs.hakuhin.jp/" + item.category;
							ElementSetTextContent(title_anchor,item.subject);
							title.appendChild(title_anchor);

							var dot_break = document.createElement("div");
							dot_break.style.cssText = "margin:2px 0px; border-bottom:2px dotted #bbb;";
							menu_mcs.appendChild(dot_break);

							var accept_container = document.createElement("div");
							accept_container.style.cssText = "font-size:12px;";
							menu_mcs.appendChild(accept_container);

							var accepts = response.accept;
							var i;
							var num = accepts.length;

							if(num == 0){
								accept_container.innerHTML = '現在質問はありません。<div style="height:2px;"></div> → <a href="http://mcs.hakuhin.jp/' + item.category + '/#QUESTION">質問を投稿してみる</a>';
							}else{
								for(i=0;i<num;i++){
									var accept = accepts[i];
									var accept_anchor = document.createElement("a");
									accept_anchor.href = "http://mcs.hakuhin.jp/" + item.category + "/" + accept.id;
									ElementSetTextContent(accept_anchor,accept.title + "(" + accept.response_count + ")");
									accept_container.appendChild(accept_anchor);
									if(i < num - 1){
										var text_node = document.createTextNode(" / ");
										accept_container.appendChild(text_node);
									}
								}
							}

							var br = document.createElement("div");
							br.style.cssText = "height:25px";
							menu_mcs.appendChild(br);
						};

						script.type = "text/javascript";
						script.src = "http://mcs.hakuhin.jp/" + item.category + "/api/topic?callback=" + callback_name;
						document.body.appendChild(script);
					 })();
				}

			}catch(e){
			}
		})();

		// ------------------------------------------------------------
		// はてなブックマーク
		// ------------------------------------------------------------
		(function(){
			try{
				var unique_id = 0;
				var i;
				var num = hatena_bookmark_queue.length;
				for(i=0;i<num;i++){
					(function (){
						var item = hatena_bookmark_queue[i];
						var element = item.element;
						var callback_name = "HH_HatenaBookmarkCallbackFunc" + unique_id;
						unique_id += 1;

						var script = document.createElement("script");
						window[callback_name] = function (count){
							try{
								delete window[callback_name];
							}catch(e){
								window[callback_name] = null;
							}

							DomNodeRemove(script);

							if(!count)	return;

							var d = count / 100;
							if(d < 0)	d = 0;
							if(d > 1)	d = 1;
							var font_size = 10 + d * 2;

							var label = "";
							if(count > 1)	label = count + "users";
							else			label = count + "user";

							var anchor = document.createElement("a");
							anchor.href = "http://b.hatena.ne.jp/entry/" + item.url;
							ElementSetTextContent(anchor,label);
							element.appendChild(anchor);

							element.className = "hatena_b";
							element.style.fontSize = font_size + "px";
						};

						script.type = "text/javascript";
						script.src = "http://api.b.st-hatena.com/entry.count?url=" + escape(item.url) + "&callback=" + callback_name;
						document.body.appendChild(script);
					 })();
				}

			}catch(e){
			}
		})();

		// ------------------------------------------------------------
		// メニュースクロール
		// ------------------------------------------------------------
		(function(){
			try{
				var element_outer = document.getElementById("menu_container");
				var element_inner = document.getElementById("menu_block");
				var scroll_pos = DocumentGetScrollPosition(document);
				var type = 0;

				if(!element_outer) return;
				if(!element_inner) return;

				var handler = function(){
					var client_size = DocumentGetClientSize(document);
					var outer_rect = element_outer.getBoundingClientRect();
					var inner_rect = element_inner.getBoundingClientRect();
					var scroll_now = DocumentGetScrollPosition(document);

					var outer_t = outer_rect.top    + scroll_now.y;
					var outer_b = outer_rect.bottom + scroll_now.y;
					var inner_h = inner_rect.bottom - inner_rect.top;

					if(type == 0){
						if(inner_rect.top > client_size.height){
							type = 1;
						}
						if(inner_rect.bottom < 0.0){
							type = 2;
						}
					}else if(type == 1){
						if(scroll_now.y > scroll_pos.y){
							var y = scroll_now.y - outer_t + client_size.height;
							var b = outer_b - inner_h - outer_t;
							if(y > b) y = b;
							element_inner.style.top = (y)  + "px";
							type = 0;
						}
					}else{
						if(scroll_now.y < scroll_pos.y){
							var y = scroll_now.y - outer_t - inner_h;
							if(y < 0) y = 0;
							element_inner.style.top = (y) + "px";
							type = 0;
						}
					}

					scroll_pos = scroll_now;
				};

				if(window.addEventListener){
					window.addEventListener("scroll",handler);
				}else if(window.attachEvent){
					window.attachEvent("onscroll",handler);
				}
			}catch(e){
			}
		})();

	};

})();

// ------------------------------------------------------------
// アクセス解析
// ------------------------------------------------------------
(function () {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-15157446-2', 'hakuhin.jp');
  ga('send', 'pageview');
})();

(function () {
	var acclog_cgi_url = 'http://hakuhin.jp/acc/acclog.cgi';
	var img = document.createElement("img");
	img.src = acclog_cgi_url + "?referrer=" + document.referrer + "&width=" + screen.width + "&height=" + screen.height + "&color=" + screen.colorDepth + "&epoch=" + new Date().getTime();
})();

// ------------------------------------------------------------
// ロード完了
// ------------------------------------------------------------
DocumentGetLoadedDomContent(document,function(){
//	window.HH_LoadedDOMContent();
});
