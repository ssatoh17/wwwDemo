(function(){

	// --------------------------------------------------------------------------------
	// 定数
	// --------------------------------------------------------------------------------
	var INDEX_POS_Y = 40;
	var INDEX_WIDTH = 500;
	var INDEX_BORDER_WIDTH = 10;
	var ROOT_URL = "//hakuhin.jp/";

	// --------------------------------------------------------------------------------
	// トグルボタン
	// --------------------------------------------------------------------------------
	function ToggleButtonIndex(){

		// --------------------------------------------------------------------------------
		// ローカル変数
		// --------------------------------------------------------------------------------
		var _this = this;
		var _clicked;
		var _element;
		var _image;

		// --------------------------------------------------------------------------------
		// チェック状態をセット
		// --------------------------------------------------------------------------------
		_this.setCheck = function (type){
			_clicked = type;
			update();
		};

		// --------------------------------------------------------------------------------
		// チェック状態を取得
		// --------------------------------------------------------------------------------
		_this.getCheck = function (){
			return _clicked;
		};

		// --------------------------------------------------------------------------------
		// 変化時に実行されるイベント
		// --------------------------------------------------------------------------------
		_this.onchange = function (){};

		// --------------------------------------------------------------------------------
		// 要素を取得
		// --------------------------------------------------------------------------------
		_this.getElement = function (){
			return _element;
		};

		// --------------------------------------------------------------------------------
		// クリック
		// --------------------------------------------------------------------------------
		function click(){
			_clicked = !_clicked;
			update();
			_this.onchange();
			return false;
		}

		// --------------------------------------------------------------------------------
		// 更新
		// --------------------------------------------------------------------------------
		function update(){
			if(_clicked){
				_image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8xOS8xNNdcZSsAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAB7ElEQVRIicWWP2sUQRjGf7P/ksu6eyFgaZs0qf0OfgC7dJYigo0YIVhoQEF7K3strQTxO8ilucOLcCn1jv1zm5yX2X0tZjgIJMEJK/vCwg7MPM8z77zPvKNEhC7D65QdCABQKgJ6duwqqgE0cIbI0l2AIe8DMbAG+I4YNfAHiFAqdxURYHYeVzs793WSPEepvhO9SB6U5at4OPwELO33z+FZEWs6SQ6cyQGU6uskOcBkL3Bd3nkRepgz1EFRHCKSOyOI5EFRHGIKsXZdrsTUwG1gC1OIrmnUQAXMgF+InLks7vwIAkzxhNX29j2dpk9v5IKieB2PRh8tlnMGfCDQabp/Yxek6T5mM653SPdH0LYLnDtbWy44BXKMEzxAcXV2L/QO55vrmggwPcW3/1dha0zv8FGqbMsFb+LR6DPgzXd3H9S93hOuyYC3WLxLBoO3QNiWC55ZQrl1dPQhnE4fIlJcIrYMZ7NHyWDwHpOJ8zZdoIEFMN84Pv7Wm0z2VF3/WOlsmvH6ycnexnj8FZgDc0TO/RcQAWGdJL+bKLqLUutOtKYdv4ym0+9AacHFr6p5kGVf9ObmHZrmZzwcPg6zbAIUQIbIAowL2nqQVBZ8aXFSixnZecvVHEtuBIj8nyfZRUwunbMS0GF0fhX/Bc9F4a12RhPtAAAAAElFTkSuQmCC";
			}else{
				_image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8xOS8xNNdcZSsAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAAxklEQVRIie2UsQ3CMBREXxAbMAo0MAASEzCBRUFJGlaITEkR3QAIRkBiCESPWCCwAaEgkawICqxELvBVlnXfd/9/nZOyLAmJXlD1aADo1wdj0jmwBQY/vlEAS8nufQy4E8g9xKlqch/xpoEgcA0seI/zVxRVrReSv/8HYgqCryCmIPgKWk+BMekKyPje3BNYSzaDDlIg2Q0wBe4fuA9gVos3DbQGyZ6AIXB2ri/ASLJHl9tZCiR7AybADjgAY8lem7yYgmjgBb/+RTrLeTyFAAAAAElFTkSuQmCC";
			}
		}

		// --------------------------------------------------------------------------------
		// 初期化
		// --------------------------------------------------------------------------------
		(function(){
			_element = document.createElement("a");
			_image = new Image();
			_image.style.cssText = "border:none;";
			_element.href = "javascript:void(0)";
			_element.id = "index_button";
			_element.appendChild(_image);

			if(_element.addEventListener){
				_element.addEventListener("click",click);
			}else if(_element.attachEvent){
				_element.attachEvent("onclick",click);
			}

			_clicked = false;
			update();
		})();
	}

	// --------------------------------------------------------------------------------
	// インデックス管理
	// --------------------------------------------------------------------------------
	function IndexManager(){

		// --------------------------------------------------------------------------------
		// ローカル変数
		// --------------------------------------------------------------------------------
		var _this = this;
		var _element;
		var _style;
		var _fade_task;
		var _visible;

		// --------------------------------------------------------------------------------
		// タスクデストラクタ
		// --------------------------------------------------------------------------------
		function FadeTaskDestructor(){
			_fade_task = null;
		}

		// --------------------------------------------------------------------------------
		// フェードイン
		// --------------------------------------------------------------------------------
		_this.fadein = function (){
			if(_visible) return;
			_visible = true;

			if(_fade_task){
				_fade_task.release();
				_fade_task = null;
			}
			// 補間タスク
			_fade_task = TweenTaskCreate(function(a){
				setOpacity(a);
			},function(){
				setOpacity(1.0);
				FadeTaskDestructor();
			});
		};

		// --------------------------------------------------------------------------------
		// フェードアウト
		// --------------------------------------------------------------------------------
		_this.fadeout = function (){
			if(!_visible) return;
			_visible = false;

			if(_fade_task){
				_fade_task.release();
				_fade_task = null;
			}
			// 補間タスク
			_fade_task = TweenTaskCreate(function(a){
				a = 1.0 - a;
				setOpacity(a);
			 },function(){
				setOpacity(0.0);
				FadeTaskDestructor();
			});
		};

		// --------------------------------------------------------------------------------
		// 可視状態を取得
		// --------------------------------------------------------------------------------
		_this.getVisible = function (){
			return _visible;
		};

		// --------------------------------------------------------------------------------
		// 可視状態をセット
		// --------------------------------------------------------------------------------
		_this.setVisible = function (type){
			_visible = type;
			if(_visible){
				setOpacity(1.0);
			}else{
				setOpacity(0.0);
			}
		};

		// --------------------------------------------------------------------------------
		// サイズをセット
		// --------------------------------------------------------------------------------
		_this.setSize = function (w,h){
			_style.width  = (w) + "px";
			_style.height = (h) + "px";
		};

		// --------------------------------------------------------------------------------
		// 要素を取得
		// --------------------------------------------------------------------------------
		_this.getElement = function (){
			return _element;
		};

		// --------------------------------------------------------------------------------
		// フォーカスを失うと実行されるイベント
		// --------------------------------------------------------------------------------
		_this.onblur = function (){};

		// --------------------------------------------------------------------------------
		// 透明度をセット
		// --------------------------------------------------------------------------------
		function setOpacity(a){
			_style.opacity = a;
			_style.filter = "alpha(opacity=" + (a * 100) + ")";

			if(a == 0.0){
				if(_element.parentNode){
					_element.parentNode.removeChild(_element);
				}
			}else{
				if(_element.parentNode != document.body){
					document.body.appendChild(_element);
				}
			}
		}

		// --------------------------------------------------------------------------------
		// 初期化
		// --------------------------------------------------------------------------------
		(function(){
			_element = document.createElement("div");
			_style = _element.style;
			_style.cssText = "width:" + (INDEX_WIDTH - 10) + "px; height:0px; border:0px #fff outset; background:#eee; position:fixed; z-index:2; border-right:2px solid #888;";
			_style.left = (0) + "px";
			_style.top  = (INDEX_POS_Y)  + "px";
		})();
	}

	// --------------------------------------------------------------------------------
	// コンテンツ要素管理
	// --------------------------------------------------------------------------------
	function ContentElementManager(element){

		// --------------------------------------------------------------------------------
		// ローカル変数
		// --------------------------------------------------------------------------------
		var _this = this;
		var _pos_prev;
		var _pos_next;
		var _pos;
		var _element;
		var _style;
		var _fade_task;

		// --------------------------------------------------------------------------------
		// タスクデストラクタ
		// --------------------------------------------------------------------------------
		function FadeTaskDestructor(){
			_pos_prev = _pos;
			_fade_task = null;
		}

		// --------------------------------------------------------------------------------
		// フェードイン
		// --------------------------------------------------------------------------------
		_this.fadein = function (){
			if(_fade_task){
				_fade_task.release();
				_fade_task = null;
			}
			// 補間タスク
			_fade_task = TweenTaskCreate(function(d){
				_pos = (_pos_next - _pos_prev) * d + _pos_prev;
				_style.left = _pos + "px";
			 },FadeTaskDestructor);
		};

		// --------------------------------------------------------------------------------
		// フェードアウト
		// --------------------------------------------------------------------------------
		_this.fadeout = function (){
			if(_fade_task){
				_fade_task.release();
				_fade_task = null;
			}
			// 補間タスク
			_fade_task = TweenTaskCreate(function(d){
//				d = 1.0 - d;
				_pos = (_pos_next - _pos_prev) * d + _pos_prev;
				_style.left = _pos + "px";
			 },FadeTaskDestructor);
		};

		// --------------------------------------------------------------------------------
		// X 位置をセット
		// --------------------------------------------------------------------------------
		_this.setPosX = function (pos_x){
			if(_fade_task){
				_pos_next = pos_x;
			}else{
				_style.left = (pos_x) + "px";
				_pos_next = _pos_prev = pos_x;
			}
		};

		// --------------------------------------------------------------------------------
		// 要素を取得
		// --------------------------------------------------------------------------------
		_this.getElement = function (){
			return _element;
		};

		// --------------------------------------------------------------------------------
		// 初期化
		// --------------------------------------------------------------------------------
		(function(){
			_element = element;
			_style = _element.style;
			_pos_next = _pos_prev = _pos = 0.0;
		})();
	}

	// --------------------------------------------------------------------------------
	// ツリーリストアイテム
	// --------------------------------------------------------------------------------
	function TreeListItem(type){

		// --------------------------------------------------------------------------------
		// ローカル変数
		// --------------------------------------------------------------------------------
		var _this = this;
		var _text_node;
		var _text_node_expand;
		var _element_anchor;
		var _element_expand;
		var _open = false;
		var _child = false;
		var _open_task = null;

		// --------------------------------------------------------------------------------
		// ラベルをセット
		// --------------------------------------------------------------------------------
		_this.setLabel = function (str){
			_text_node.nodeValue = str;
			_this._element.title = str;
		};

		// --------------------------------------------------------------------------------
		// 親を登録
		// --------------------------------------------------------------------------------
		_this.attachParent = function (element){
			element.appendChild(_this._element);
			if(_this._element_child){
				element.appendChild(_this._element_child);
			}
		};

		// --------------------------------------------------------------------------------
		// 子を登録
		// --------------------------------------------------------------------------------
		_this.attachChild = function (item){
			item._parent = _this;
			if(_this._element_child){
				item.attachParent(_this._element_child);
			}else{
				item.attachParent(_this._element);
			}
		};

		// --------------------------------------------------------------------------------
		// 親を取得
		// --------------------------------------------------------------------------------
		_this.getParent = function (){
			return _this._parent;
		};

		// --------------------------------------------------------------------------------
		// 子を有効
		// --------------------------------------------------------------------------------
		_this.enableChild = function (){
			if(_element_expand){
				_child = true;
				_element_expand.className = "index_expand_button_enable";
				_element_expand.href = "javascript:void(0);";
				_element_expand.onclick = function(){
					_this.setOpen(!_open,true);
					return false;
				}
				_this.setOpen(false,false);
			}
		};

		// --------------------------------------------------------------------------------
		// 選択状態を設定
		// --------------------------------------------------------------------------------
		_this.setSelect = function (type){
			if(type){
				_this._element.className = "index_anchor_select";
			}else{
				_this._element.className = "index_anchor_normal";
			}
		};

		// --------------------------------------------------------------------------------
		// 展開状態をセット
		// --------------------------------------------------------------------------------
		_this.setOpen = function (type,anime){
			_open = type;
			if(_child){

				if(_open_task){
					_open_task.release();
					_open_task = null;
				}

				if(type){
					_text_node_expand.nodeValue = "－";
				}else{
					_text_node_expand.nodeValue = "＋";
				}

				if(anime){
					_this._element_child.style.display = "block";
					_this._element_child.style.height = "auto";
					_this._element_child.style.overflow = "hidden"

					var rect = _this._element_child.getBoundingClientRect();
					var height_max = rect.bottom - rect.top;

					if(_open){
						_open_task = TweenTaskCreate(function(d){
							_this._element_child.style.height = (d * height_max) + "px";
						},function(){
							_this._element_child.style.height = "auto";
							OpanTaskDestructor();
						});
					}else{
						_open_task = TweenTaskCreate(function(d){
							d = 1.0 - d;
							_this._element_child.style.height = (d * height_max) + "px";
						},function(){
							_this._element_child.style.height = "auto";
							_this._element_child.style.display = "none";
							OpanTaskDestructor();
						});
					}
				}else{
					if(type){
						_this._element_child.style.display = "block";
					}else{
						_this._element_child.style.display = "none";
					}
				}
			}
		};

		// --------------------------------------------------------------------------------
		// 強調表示
		// --------------------------------------------------------------------------------
		_this.setHighlight = function (type){
			var text = "5px solid #f66";
			_this._element.style.borderLeft = text;
			_this._element_child.style.borderLeft = text;
		};

		// --------------------------------------------------------------------------------
		// インデントを設定
		// --------------------------------------------------------------------------------
		_this.setDepth = function (depth){
			_this._element.style.paddingLeft = (depth * (16 + 8) + 6) + "px";
		};

		// --------------------------------------------------------------------------------
		// URL を設定
		// --------------------------------------------------------------------------------
		_this.setURL = function (url){
			if(_element_anchor){
				_element_anchor.href = url;
			}
		};

		// --------------------------------------------------------------------------------
		// タイプを取得
		// --------------------------------------------------------------------------------
		_this.getType = function (){
			return type;
		};

		// --------------------------------------------------------------------------------
		// タスクデストラクタ
		// --------------------------------------------------------------------------------
		function OpanTaskDestructor(){
			_open_task = null;
		}

		// --------------------------------------------------------------------------------
		// 公開変数
		// --------------------------------------------------------------------------------
		_this._element = null;
		_this._element_child = null;
		_this._parent = null;

		// --------------------------------------------------------------------------------
		// 初期化
		// --------------------------------------------------------------------------------
		(function(){

			switch(type){
			case "item":
				var anchor = document.createElement("a");
				anchor.style.cssText = "text-decoration:none; display:block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;";
				var span = document.createElement("span");
				span.style.cssText = "display:table-cell; vertical-align:middle; padding-left:8px;";
				_text_node = document.createTextNode("");
				anchor.appendChild(span);
				span.appendChild(_text_node);
				anchor.className = "index_anchor_normal";
				_this._element = anchor;
				_this._element_child = document.createElement("div");
				_element_anchor = anchor;
				
				if(!_element_expand){
					_element_expand = document.createElement("a");
					_element_expand.style.cssText = "display:table-cell; width:16px; height:16px; text-align:center; text-decoration:none; vertical-align:middle; font-size:12px;";
					var div = document.createElement("div");
					div.style.cssText = "width:16px;";
					_text_node_expand = document.createTextNode("");
					_text_node_expand.nodeValue = "・";
					_element_expand.appendChild(div);
					div.appendChild(_text_node_expand);
					_element_expand.className = "index_expand_button_disable";
					_this._element.insertBefore(_element_expand,_this._element.firstChild);
				}

				break;
			case "text":
				var div = document.createElement("div");
				_text_node = document.createTextNode("");
				div.appendChild(_text_node);
				div.style.cssText = "text-overflow: ellipsis; overflow: hidden; white-space: nowrap; font-size:16px; font-weight:bold; padding:6px 0px 6px; margin-bottom:4px; background:#444; color:#fff;";
				_this._element = div;
				break;
			case "breakline":
				var div = document.createElement("div");
				div.style.cssText = "height:12px;";
				_this._element = div;
				break;
			case "end":
				var div = document.createElement("div");
				div.style.cssText = "height:20px;";
				_this._element = div;
				break;
			case "separate":
				var div = document.createElement("div");
				div.style.cssText = "border-top:1px dotted #ccc;";
				_this._element = div;
				break;
			};
		})();
	}

	// --------------------------------------------------------------------------------
	// ツリーリスト
	// --------------------------------------------------------------------------------
	function TreeList(parent){

		// --------------------------------------------------------------------------------
		// ローカル変数
		// --------------------------------------------------------------------------------
		var _this = this;
		var _element;
		var _item_list = new Array();
		var _item_select = null;

		// --------------------------------------------------------------------------------
		// データをセット
		// --------------------------------------------------------------------------------
		_this.setData = function (data){

			function f(data,parent,depth,base_url){
				var separate = false;
				var i;
				var num = data.length;
				for(i=0;i<num;i++){
					var param = data[i];

					if(separate){
						if(param.type == "item"){
							var item = new TreeListItem("separate");
							item.attachParent(_element);
						}
					}

					var item = new TreeListItem(param.type);
					_item_list.push(item);
					item.setDepth(depth);
					if(param.label){
						item.setLabel(param.label);
					}
					if(parent){
						parent.attachChild(item);
					}else{
						item.attachParent(_element);
					}
					var url = base_url;
					if(param.url){
						url += param.url;
						item.setURL(url);
					}
					if(param.child){
						item.enableChild();
						f(param.child,item,depth+1,url.match(/^(.*?)(#|$)/)[1]);
					}
					if(depth == 0){
						separate = (param.type == "item");
					}
				}
			}

			f(data,null,0,ROOT_URL + _category + "/");
		};

		// --------------------------------------------------------------------------------
		// 座標をセット
		// --------------------------------------------------------------------------------
		_this.setPosition = function (x,y){
			var style = _element.style;
			style.left = (x) + "px";
			style.top  = (y) + "px";
		};

		// --------------------------------------------------------------------------------
		// サイズをセット
		// --------------------------------------------------------------------------------
		_this.setSize = function (w,h){
			var style = _element.style;
			try{
				style.width  = (w-2) + "px";
				style.height = (h-2) + "px";
			}catch(e){
			}
		};

		// --------------------------------------------------------------------------------
		// 選択状態をセット
		// --------------------------------------------------------------------------------
		_this.select = function (url){
			if(_item_select){
				_item_select.setSelect(false);
				_item_select = null;
			}

			var base_url = url.match(new RegExp("^(.*?)(#|\\?|$)"))[1];
			var item_select = null;

			var i;
			var num = _item_list.length;
			for(i=0;i<num;i++){
				var item = _item_list[i];
				if(item._element.tagName == "A"){
//					if(item._element.href.indexOf(base_url) == 0){
					if(item._element.href == base_url){
						item.setOpen(true,false);
					}
					if(item._element.href == base_url){
						item.setHighlight();
					}
					if(base_url == item._element.href){
						item_select = item;
					}
					if(url == item._element.href){
						item_select = item;
						break;
					}
				}


			}
			if(item_select){
				_item_select = item_select;
				_item_select.setSelect(true);

				var item = _item_select;
				while(item){
					item.setOpen(true,false);
					item = item.getParent();
				}
			}
		};

		// --------------------------------------------------------------------------------
		// スクロール
		// --------------------------------------------------------------------------------
		_this.scroll = function (url){
			var base_url = url.match(new RegExp("^(.*?)(#|\\?|$)"))[1];
			var item_text = null;
			var item_select = null;

			var i;
			var num = _item_list.length;
			for(i=0;i<num;i++){
				var item = _item_list[i];
				if(item.getType() == "text"){
					item_text = item;
				}
				if(item._element.tagName == "A"){
					if(base_url == item._element.href){
						item_select = item;
						break;
					}
				}
			}
			if(item_select){
				_element.scrollTop = item_text._element.offsetTop;
			}
		};

		// --------------------------------------------------------------------------------
		// 初期化
		// --------------------------------------------------------------------------------
		(function(){
			_element = document.createElement("div");
			_element.style.cssText = "top:0px; left:0px; width:0px; height:0px; border:1px #fff inset; background:#fff; position:absolute; overflow-y:hidden; line-height:1.0;";
			parent.appendChild(_element);

			var showScrollBar = function(){
				 _element.style.overflowY = "scroll";
			};
			var hideScrollBar = function(){
				 _element.style.overflowY = "hidden";
			};

			_element.onmouseover = showScrollBar;
			_element.onmouseout  = hideScrollBar;
			if(_element.addEventListener){
				_element.addEventListener("touchstart",showScrollBar);
				_element.addEventListener("touchmove" ,showScrollBar);
			}
		})();
	}

	// --------------------------------------------------------------------------------
	// タスクコンテナ
	// --------------------------------------------------------------------------------
	function TaskContainer(){

		var _container = new Object();

		// --------------------------------------------------------------------------------
		// タスク生成
		// --------------------------------------------------------------------------------
		_container.createTask = function(parent){
			var _task = new Object();

			// --------------------------------------------------------------------------------
			// タスクを実行
			// --------------------------------------------------------------------------------
			_task.execute = function(level){
				if(!_task._alive)	return;
				if(_task._execute_func){
					if(level & _task._level){
						_task._execute_func(_task);
					}
				}
			};

			// --------------------------------------------------------------------------------
			// タスクを破棄
			// --------------------------------------------------------------------------------
			_task.release = function(){
				_task.releaseChild();
				TaskRelease(_task);
			};

			// --------------------------------------------------------------------------------
			// 子タスクをすべて破棄
			// --------------------------------------------------------------------------------
			_task.releaseChild = function(){
				var a = new Array();
				var child = _task._child;
				var task = child._next;
				while(task != child){
					a.push(task);
					task = task._next;
				}
				var i;
				var num = a.length;
				for(i=0;i<num;i++){
					task = a[i];
					task.releaseChild();
					TaskRelease(task);
				}
			};

			// --------------------------------------------------------------------------------
			// 子タスクとして登録
			// --------------------------------------------------------------------------------
			_task.attachChild = function(task){
				task.removeParent();
				var prev = _task._child;
				var next = prev._next;
				prev._next = task;
				next._prev = task;
				task._prev = prev;
				task._next = next;
				task._parent = _task;
				_task._child_count += 1;
			};

			// --------------------------------------------------------------------------------
			// 自身の親子関係を外す
			// --------------------------------------------------------------------------------
			_task.removeParent = function(){
				if(_task._parent){
					_task._parent._child_count -= 1;
					var prev = _task._prev;
					var next = _task._next;
					prev._next = next;
					next._prev = prev;
					_task._prev = _task;
					_task._next = _task;
					_task._parent = null;
				}
			};

			// --------------------------------------------------------------------------------
			// 子の親子関係を外す
			// --------------------------------------------------------------------------------
			_task.removeChild = function(){
				var a = new Array();
				var child = _task._child;
				var task = child._next;
				while(task != child){
					a.push(task);
					task = task._next;
				}

				var i;
				var num = a.length;
				for(i=0;i<num;i++){
					task = a[i];
					task.removeParent();
				}
			};

			// --------------------------------------------------------------------------------
			// 子を取得
			// --------------------------------------------------------------------------------
			_task.getChild = function(func){
				var a = new Array();
				var child = _task._child;
				var task = child._next;
				while(task != child){
					a.push(task);
					task = task._next;
				}

				var i;
				var num = a.length;
				for(i=0;i<num;i++){
					task = a[i];
					func(task);
				}
			};

			// --------------------------------------------------------------------------------
			// 親を取得
			// --------------------------------------------------------------------------------
			_task.getParent = function(){
				return _task._parent;
			};

			// --------------------------------------------------------------------------------
			// 実行関数をゲット
			// --------------------------------------------------------------------------------
			_task.getExecuteFunc = function(){
				return _task._execute_func;
			};

			// --------------------------------------------------------------------------------
			// 実行関数をセット
			// --------------------------------------------------------------------------------
			_task.setExecuteFunc = function(func){
				_task._execute_func = func;
			};

			// --------------------------------------------------------------------------------
			// デストラクタ関数をゲット
			// --------------------------------------------------------------------------------
			_task.getDestructorFunc = function(){
				return _task._destructor_func;
			};

			// --------------------------------------------------------------------------------
			// デストラクタ関数をゲット
			// --------------------------------------------------------------------------------
			_task.setDestructorFunc = function(func){
				_task._destructor_func = func;
			};

			// --------------------------------------------------------------------------------
			// 自身の前の優先度でタスクを登録
			// --------------------------------------------------------------------------------
			_task.attachPrioPrev = function(task){
				TaskRemovePrio(task);
				var prev = _task._prio_prev;
				var next = _task;
				prev._prio_next = task;
				next._prio_prev = task;
				task._prio_prev = prev;
				task._prio_next = next;
			};

			// --------------------------------------------------------------------------------
			// 自身の後の優先度でタスクを登録
			// --------------------------------------------------------------------------------
			_task.attachPrioNext = function(task){
				TaskRemovePrio(task);
				var prev = _task;
				var next = _task._prio_next;
				prev._prio_next = task;
				next._prio_prev = task;
				task._prio_prev = prev;
				task._prio_next = next;
			};

			// --------------------------------------------------------------------------------
			// 自身の直前の優先度に位置するタスクを取得
			// --------------------------------------------------------------------------------
			_task.getPrioPrev = function(){
				return _task._prio_prev;
			};

			// --------------------------------------------------------------------------------
			// 自身の直後の優先度に位置するタスクを取得
			// --------------------------------------------------------------------------------
			_task.getPrioNext = function(){
				return _task._prio_next;
			};

			// --------------------------------------------------------------------------------
			// 子の総数を取得
			// --------------------------------------------------------------------------------
			_task.getCountChild = function(){
				return _task._child_count;
			};

			// --------------------------------------------------------------------------------
			// タスクレベルをゲット
			// --------------------------------------------------------------------------------
			_task.getLevel = function(){
				return _task._level;
			};

			// --------------------------------------------------------------------------------
			// タスクレベルをセット
			// --------------------------------------------------------------------------------
			_task.setLevel = function(level){
				_task._level = level;
			};

			// --------------------------------------------------------------------------------
			// 生存状態をゲット
			// --------------------------------------------------------------------------------
			_task.getAlive = function(){
				return _task._alive;
			};

			// --------------------------------------------------------------------------------
			// ユーザーワークを取得
			// --------------------------------------------------------------------------------
			_task.getUserWork = function(){
				return _task._user_work;
			};

			// --------------------------------------------------------------------------------
			// 初期化
			// --------------------------------------------------------------------------------
			_task._prio_prev = _task;
			_task._prio_next = _task;
			_task._prev = _task;
			_task._next = _task;
			_task._parent = null;
			_task._child_count = 0;
			_task._child = new Object();
			_task._child._prev = _task._child;
			_task._child._next = _task._child;
			_task._alive = true;
			_task._level = 0xffffffff;
			_task._user_work = new Object();
			_task._execute_func = null;
			_task._destructor_func = null;
			_container.attachPrioLast(_task);

			if(parent){
				parent.attachChild(_task);
			}

			_container.attachPrioLast(_task);

			if(_task_count == 1){
				if(_start_func)	_start_func();
			}
			_task_count += 1;

			return _task;
		};

		// --------------------------------------------------------------------------------
		// タスクコンテナ実行
		// --------------------------------------------------------------------------------
		_container.execute = function(level){
			var a = new Array();
			var task = _container._prio_next;
			while(task != _container){
				a.push(task);
				task = task._prio_next;
			}

			var i;
			var num = a.length;
			for(i=0;i<num;i++){
				task = a[i];
				if(task.getAlive()){
					task.execute(level);
				}else{
					// 開放
					var prev = task._prio_prev;
					var next = task._prio_next;
					prev._prio_next = next;
					next._prio_prev = prev;
				}
			}
		};

		// --------------------------------------------------------------------------------
		// タスクコンテナ開放
		// --------------------------------------------------------------------------------
		_container.release = function(){
			var a = new Array();
			var task = _container._prio_next;
			while(task != _container){
				a.push(task);
				task = task._prio_next;
			}

			var prev;
			var next;
			var i;
			var num = a.length;
			for(i=0;i<num;i++){
				task = a[i];
				TaskRelease(task);
				prev = task._prio_prev;
				next = task._prio_next;
				prev._prio_next = next;
				next._prio_prev = prev;
			}
		};

		// --------------------------------------------------------------------------------
		// 子としてタスクを登録
		// --------------------------------------------------------------------------------
		_container.attachChild = function(task){
			_root_task.attachChild(task);
		};

		// --------------------------------------------------------------------------------
		// 優先度を最前列で登録
		// --------------------------------------------------------------------------------
		_container.attachPrioFirst = function(task){
			TaskRemovePrio(task);
			var prev = _container;
			var next = prev._prio_next;
			prev._prio_next = task;
			next._prio_prev = task;
			task._prio_prev = prev;
			task._prio_next = next;
		};

		// --------------------------------------------------------------------------------
		// 優先度を最後尾で登録
		// --------------------------------------------------------------------------------
		_container.attachPrioLast = function(task){
			TaskRemovePrio(task);
			var next = _container;
			var prev = next._prio_prev;
			prev._prio_next = task;
			next._prio_prev = task;
			task._prio_prev = prev;
			task._prio_next = next;
		};

		// --------------------------------------------------------------------------------
		// 優先度を外す（内部用）
		// --------------------------------------------------------------------------------
		function TaskRemovePrio(task){
			var next = task._prio_next;
			if(task != next){
				var prev = task._prio_prev;
				prev._prio_next = next;
				next._prio_prev = prev;
				task._prio_prev = task;
				task._prio_next = task;
			}
		}

		// --------------------------------------------------------------------------------
		// 開放（内部用）
		// --------------------------------------------------------------------------------
		function TaskRelease(task){
			if(task._alive){
				task._alive = false;

				if(task._destructor_func){
					task._destructor_func(task);
				}

				task.removeParent();

				task._user_work = null;
				_task_count -= 1;

				if(_task_count == 1){
					if(_end_func)	_end_func();
				}
			}
		}

		// --------------------------------------------------------------------------------
		// タスク総数を取得
		// --------------------------------------------------------------------------------
		_container.getCountTask = function(){
			return _task_count - 1;
		};

		// --------------------------------------------------------------------------------
		// 開始関数をセット
		// --------------------------------------------------------------------------------
		_container.setStartFunc = function(f){
			_start_func = f;
		};

		// --------------------------------------------------------------------------------
		// 終了関数をセット
		// --------------------------------------------------------------------------------
		_container.setEndFunc = function(f){
			_end_func = f;
		};

		// --------------------------------------------------------------------------------
		// プライベート変数
		// --------------------------------------------------------------------------------
		var _root_task;
		var _task_count;
		var _start_func = null;
		var _end_func = null;

		// --------------------------------------------------------------------------------
		// 初期化
		// --------------------------------------------------------------------------------
		_task_count = 0;
		_container._prio_prev = _container;
		_container._prio_next = _container;
		_root_task = _container.createTask(null);

		return _container;
	}

	// --------------------------------------------------------------------------------
	// XMLHttpRequest オブジェクトを作成する関数
	// --------------------------------------------------------------------------------
	function XMLHttpRequestCreate(){
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

	// --------------------------------------------------------------------------------
	// 「JSON 文字列」から「JavaScript のオブジェクト」に変換する関数
	// --------------------------------------------------------------------------------
	function JsonParse(str){
		if(window.JSON){
			return JSON.parse(str);
		}
		return eval("(" + str + ")");
	}

	// --------------------------------------------------------------------------------
	// ドキュメントのクライアント領域のサイズを取得する関数
	// --------------------------------------------------------------------------------
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

	// --------------------------------------------------------------------------------
	// スクロール位置を取得する関数
	// --------------------------------------------------------------------------------
	function DocumentGetScrollPosition(document_obj){
		return{
			x:document_obj.body.scrollLeft || document_obj.documentElement.scrollLeft,
			y:document_obj.body.scrollTop  || document_obj.documentElement.scrollTop
		};
	}

	// --------------------------------------------------------------------------------
	// エレメントから StyleSheet オブジェクトを取得する関数
	// --------------------------------------------------------------------------------
	function ElementGetStyleSheet(style_sheet){
		if(style_sheet.sheet !== undefined){
			return style_sheet.sheet;
		}else if(style_sheet.styleSheet !== undefined){
			return style_sheet.styleSheet;
		}
		return null;
	}

	// --------------------------------------------------------------------------------
	// スタイルシートにルールを追加する関数
	// --------------------------------------------------------------------------------
	function CSSStyleSheetInsertRule(style_sheet,selector,style,index){
		if(style_sheet.insertRule !== undefined){
			style_sheet.insertRule(selector + "{" + style + "}",index);
		}else if(style_sheet.addRule !== undefined){
			style_sheet.addRule(selector,style,index);
		}
		return index;
	}

	// --------------------------------------------------------------------------------
	// Internet Explorer で動作しているか調べる関数（IEコンポーネントを含む）
	// --------------------------------------------------------------------------------
	function NavigatorGetExecutedInInternetExplorer(){
		// ユーザーエージェント情報を取得
		var user_agent = navigator.userAgent;

		// InternetExplorer で動作しているか
		if(user_agent.indexOf("Trident") != -1)	return true;
		return (user_agent.indexOf("MSIE") != -1);
	}

	// --------------------------------------------------------------------------------
	// 主要ブラウザのバージョンを取得する関数
	// --------------------------------------------------------------------------------
	function NavigatorGetBrowserVersion(){
		var i;
		var num;

		// ユーザーエージェント情報を取得
		var user_agent = navigator.userAgent;
		if(user_agent){
			var user_agent_param = [
				"Sleipnir",
				"Lunascape",
				"SeaMonkey",
				"NetFront",
				"Comodo_Dragon",
				"Firefox",
				"Version"
			];
			num = user_agent_param.length;
			for(i=0;i < num;i++){
				if(user_agent.match(new RegExp(user_agent_param[i] + "[ /]([0-9.]+)","i"))){
					return RegExp.$1;
				}
			}
		}

		// バージョン情報を取得
		var app_version = navigator.appVersion;
		if(app_version){
			var app_version_param = [
				"OPR",
				"Version",
				"rv",
				"Chrome",
				"MSIE"
			];
			num = app_version_param.length;
			for(i=0;i < num;i++){
				if(app_version.match(new RegExp(app_version_param[i] + "[ :/]([0-9.]+)","i"))){
					return RegExp.$1;
				}
			}
		}

		return "";
	}

	// --------------------------------------------------------------------------------
	// 変数
	// --------------------------------------------------------------------------------
	var _tree_list = null;
	var _index_manager = null;
	var _content_element_manager = null;
	var _toggle_button_index = null;
	var _style_sheet = null;
	var _task_container = null;
	var _width_type;
	var _expand_auto;
	var _category;

	// --------------------------------------------------------------------------------
	// 実行ループ
	// --------------------------------------------------------------------------------
	(function(){
		// タスクコンテナを生成
		_task_container = new TaskContainer();

		var time_handle;

		// タスクを毎サイクル実行
		function TaskContainerExecute(){
			_task_container.execute(0xffffffff);
		}

		// 開始関数をセット
		_task_container.setStartFunc(function(){
			time_handle = setInterval(TaskContainerExecute, 1000 / 60);
		});

		// 終了関数をセット
		_task_container.setEndFunc(function(){
			clearInterval(time_handle);
			time_handle = undefined;
		});
	})();

	// --------------------------------------------------------------------------------
	// 補完タスク生成
	// --------------------------------------------------------------------------------
	function TweenTaskCreate(execute,complete){
		var pos = 0;
		var spd = 0;

		// タスク実行
		var _task = _task_container.createTask();
		_task.setDestructorFunc(complete);
		_task.setExecuteFunc(function(task){
			spd += 0.05;
			if(spd > 0.2) spd = 0.2;
			var sub = (1.0 - pos) * 0.5;
			if(sub < spd) spd = sub;
			pos += spd;
			if(pos > 0.999){
				pos = 1.0;
				task.release();
				return;
			}
			execute(pos);
		});

		execute(pos);
		return _task;
	}

	// --------------------------------------------------------------------------------
	// Document から幅のタイプを取得
	// --------------------------------------------------------------------------------
	function DocumentGetWidthType(){
		var document_size = DocumentGetClientSize(document);
		if(document_size.width < 1180 + INDEX_WIDTH){
			return "narrow";
		}
		return "wide";
	}

	// --------------------------------------------------------------------------------
	// リサイズ
	// --------------------------------------------------------------------------------
	function WindowResizeFunc(e){

		var width_type = DocumentGetWidthType();
		if(_width_type === width_type){
		}else{
			_width_type = width_type;

			switch(_width_type){
			case "wide":
				if(_expand_auto){
					_toggle_button_index.setCheck(true);
					_index_manager.fadein();
					_content_element_manager.fadein();
				}
				break;
			case "narrow":
				_toggle_button_index.setCheck(false);
				_index_manager.fadeout();
				_content_element_manager.fadeout();
				break;
			}
		}

		WindowResizeUpdate();
	}

	// --------------------------------------------------------------------------------
	// リサイズ更新
	// --------------------------------------------------------------------------------
	function WindowResizeUpdate(){
		var client_size = DocumentGetClientSize(document);

		// インデックスサイズ
		var height = client_size.height - INDEX_POS_Y;
		if(height < 0) height = 0;
		_index_manager.setSize(INDEX_WIDTH-10,height);
		_tree_list.setSize(INDEX_WIDTH-10-(INDEX_BORDER_WIDTH*2),height-(INDEX_BORDER_WIDTH));

		// コンテンツ位置
		var rect = _content_element_manager.getElement().getBoundingClientRect();
		var width = rect.right - rect.left;
		var w = ((client_size.width - INDEX_WIDTH) - width) / 2;
		var p = (client_size.width - width) / 2;
		p = INDEX_WIDTH + w - p;
		if(_width_type == "narrow"){
			p = 0;
		}
		if(!_toggle_button_index.getCheck()){
			p = 0;
		}
		_content_element_manager.setPosX(p);
	}

	// --------------------------------------------------------------------------------
	// 初期化
	// --------------------------------------------------------------------------------
	(function(){

		// --------------------------------------------------------------------------------
		// IE7 以下は未対応
		// --------------------------------------------------------------------------------
		if(NavigatorGetExecutedInInternetExplorer()){
			var m = NavigatorGetBrowserVersion().match(new RegExp("^([0-9]+)(\\.|$)"));
			if(m){
				if(+m[1] < 8){
					return;
				}
			}
		}

		// --------------------------------------------------------------------------------
		// カテゴリ取得
		// --------------------------------------------------------------------------------
		var allow = {"as":true,"as3":true,"air":true,"js":true};

		if(!_category){
			// 各記事
			var m = document.URL.match(new RegExp("/([^/]+?)/[^/]+?\\.html"));
			if(m){
				if(allow[m[1]]){
					_expand_auto = true;
					_category = m[1];
				}
			}
		}
		if(!_category){
			// トップ
			var m = document.URL.match(new RegExp("([^/]+?)\\.html"));
			if(m){
				_expand_auto = false;
				_category = m[1];
			}
		}
		if(!_category) return;

		if(_expand_auto){
			try{
				var storage = window.sessionStorage;
				var data = JSON.parse(storage.getItem("index"));
				if(!(data.toggle_button.pressed)){
					_expand_auto = false;
				}
			}catch(e){
			}
		}

		// --------------------------------------------------------------------------------
		// 管理
		// --------------------------------------------------------------------------------
		try{
			// インデックス管理
			_index_manager = new IndexManager();
			// ツリーリスト
			_tree_list = new TreeList(_index_manager.getElement());
			_tree_list.setPosition(INDEX_BORDER_WIDTH,0);
			// コンテンツ管理
			_content_element_manager = new ContentElementManager(document.getElementById("out"));
			// トグルボタン
			_toggle_button_index = new ToggleButtonIndex();
			document.getElementById("index_button_container").appendChild(_toggle_button_index.getElement());
		}catch(e){
			return;
		}

		// --------------------------------------------------------------------------------
		// トグルボタンクリック
		// --------------------------------------------------------------------------------
		_toggle_button_index.onchange = function (){
			if(_toggle_button_index.getCheck()){
				switch(_width_type){
				case "wide":
					_content_element_manager.fadein();
					break;
				case "narrow":
					break;
				}
				_index_manager.fadein();
				WindowResizeUpdate();
			}else{
				_index_manager.fadeout();
				_content_element_manager.fadeout();
				_content_element_manager.setPosX(0.0);
			}

			try{
				if(_width_type == "wide"){
					var storage = window.sessionStorage;
					storage.setItem("index",JSON.stringify({
						toggle_button:{
							pressed:_toggle_button_index.getCheck()
						}
					}));
				}
			}catch(e){
			}
		};

		// --------------------------------------------------------------------------------
		// スタイルシート
		// --------------------------------------------------------------------------------
		var element_style = document.createElement("style");
		document.body.appendChild(element_style);
		_style_sheet = ElementGetStyleSheet(element_style);
		CSSStyleSheetInsertRule(_style_sheet,".index_anchor_normal","font-size:14px; padding:4px 4px; color:#000;",0);
		CSSStyleSheetInsertRule(_style_sheet,".index_anchor_normal:link","text-decoration:none;",1);
		CSSStyleSheetInsertRule(_style_sheet,".index_anchor_normal:hover","text-decoration:none; background:#eee;",2);
		CSSStyleSheetInsertRule(_style_sheet,".index_anchor_select","font-size:14px; padding:4px 4px; color:#00a; background:#f0f0ff;",3);
		CSSStyleSheetInsertRule(_style_sheet,".index_anchor_select:link","text-decoration:underline;",4);
		CSSStyleSheetInsertRule(_style_sheet,".index_anchor_select:hover","text-decoration:underline; background:#f0f0ff;",5);
		CSSStyleSheetInsertRule(_style_sheet,".index_expand_button_disable","border:1px outset #fff; background:#ffffff; border-radius:6px;",6);
		CSSStyleSheetInsertRule(_style_sheet,".index_expand_button_enable", "border:1px outset #aaa; background:#ffffff; border-radius:4px; box-shadow:1px 1px 1px #aaa;",7);
		CSSStyleSheetInsertRule(_style_sheet,".index_expand_button_enable:hover","background:#ffe0e0; color:#a00; font-size:10px;",8);
		CSSStyleSheetInsertRule(_style_sheet,"#index_button","padding:3px; display:block;",9);
		CSSStyleSheetInsertRule(_style_sheet,"#index_button:hover","border:1px solid #ccc; padding:2px; background:#fff; border-radius:4px;",10);

		// --------------------------------------------------------------------------------
		// 幅タイプを取得
		// --------------------------------------------------------------------------------
		_width_type = DocumentGetWidthType();
		switch(_width_type){
		case "wide":
			if(_expand_auto){
				_toggle_button_index.setCheck(true);
				_index_manager.setVisible(true);
			}else{
				_toggle_button_index.setCheck(false);
				_index_manager.setVisible(false);
			}
			break;
		case "narrow":
			_toggle_button_index.setCheck(false);
			_index_manager.setVisible(false);
			break;
		}
		WindowResizeUpdate();

		// --------------------------------------------------------------------------------
		// リサイズを監視
		// --------------------------------------------------------------------------------
		if(window.addEventListener){
			window.addEventListener("resize",WindowResizeFunc);
		}else if(window.attachEvent){
			window.attachEvent("onresize",WindowResizeFunc);
		}

		// --------------------------------------------------------------------------------
		// クリックを監視
		// --------------------------------------------------------------------------------
		(function(){
			function click(e){
				if(!(_index_manager.getVisible())) return;

				var element_index  = _index_manager.getElement();
				var element_button = _toggle_button_index.getElement();
				var node = e.target;
				if(!node) node = e.srcElement;
				while(node){
					if(element_index == node) break;
					if(element_button == node) break;
					node = node.parentNode;
				}
				if(node == element_index){
				}else if(node == element_button){
				}else{
					if(_width_type == "narrow"){
						_index_manager.fadeout();
						_content_element_manager.fadeout();
						_content_element_manager.setPosX(0.0);
						_toggle_button_index.setCheck(false);
					}
				}
			}

			if(document.addEventListener){
				document.addEventListener("click",click);
			}else if(document.attachEvent){
				document.attachEvent("onclick",click);
			}
		})();

		// --------------------------------------------------------------------------------
		// JSON をロード
		// --------------------------------------------------------------------------------
		var xhr = XMLHttpRequestCreate();
		xhr.onreadystatechange = function (){
			if(xhr.readyState == 4){
				if((200 <= xhr.status && xhr.status < 300) || (xhr.status == 304)){
					_tree_list.setData(JsonParse(xhr.responseText));
					_tree_list.select(location.href);
					_tree_list.scroll(location.href);

					// フラグメント識別子監視
					function WindowHashChange(e){
						_tree_list.select(e.newURL);
					}
					if(window.addEventListener){
						window.addEventListener("hashchange",WindowHashChange);
					}else if(window.attachEvent){
						window.attachEvent("onhashchange",WindowHashChange);
					}
				}
			}
		};

		xhr.open("GET",ROOT_URL + "index/" + _category + ".json");
		xhr.send(null);

	})();


})();