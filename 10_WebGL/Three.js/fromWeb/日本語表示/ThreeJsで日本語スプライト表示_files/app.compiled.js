System.register("config", [], function() {
  "use strict";
  var __moduleName = "config";
  var _DEBUG_MODE_ = true;
  var _FPS_ = 60;
  var _ASSETS_PATH_ = "js/app/assets/";
  return {
    get _DEBUG_MODE_() {
      return _DEBUG_MODE_;
    },
    get _FPS_() {
      return _FPS_;
    },
    get _ASSETS_PATH_() {
      return _ASSETS_PATH_;
    }
  };
});
System.register("util", [], function() {
  "use strict";
  var __moduleName = "util";
  var PXConfig = System.get("config");
  function trace_func(str) {
    if (PXConfig._DEBUG_MODE_) {
      var d = new Date();
      var hh = d.getHours();
      var mm = d.getMinutes();
      var ss = d.getSeconds();
      var dd = d.getMilliseconds();
      var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
      console.log(log_time + " " + str);
    }
  }
  function debug_board(str) {
    'use strict';
    if (PXConfig._DEBUG_MODE_) {
      var d = new Date();
      var hh = d.getHours();
      var mm = d.getMinutes();
      var ss = d.getSeconds();
      var dd = d.getMilliseconds();
      var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
      $('#debug_board').html(log_time + ' ' + str);
    }
  }
  var Hoge = function Hoge() {};
  ($traceurRuntime.createClass)(Hoge, {hoge: function(x) {
      console.log('Hoge::hoge');
    }}, {});
  function confirmDialog(message, title, buttonok, buttoncancel, response) {
    var _dlg = $('<div>' + message + '</div>');
    var _buttons = {};
    _buttons[buttonok] = function() {
      $(this).dialog('close');
      response(false);
      $(this).dialog('destroy');
    };
    _buttons[buttoncancel] = function() {
      $(this).dialog('close');
      response(true);
      $(this).dialog('destroy');
    };
    _dlg.dialog({
      modal: true,
      draggable: true,
      title: title,
      height: 180,
      width: 500,
      buttons: _buttons,
      open: function() {
        var closeBtn = $('.ui-dialog-titlebar-close');
        closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span>');
      },
      overlay: {
        opacity: 0.3,
        background: "#225b7f"
      }
    });
  }
  function myDialog(message, title, buttonok, buttoncancel, response) {
    var _dlg = $('<div>' + message + '</div>');
    var _buttons = {};
    _buttons[buttonok] = function() {
      $(this).dialog('close');
      response(false);
      $(this).dialog('destroy');
    };
    _buttons[buttoncancel] = function() {
      $(this).dialog('close');
      response(true);
      $(this).dialog('destroy');
    };
    _dlg.dialog({
      modal: true,
      draggable: true,
      title: title,
      width: 500,
      buttons: _buttons,
      open: function() {
        var closeBtn = $('.ui-dialog-titlebar-close');
        closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span>');
      },
      overlay: {
        opacity: 0.3,
        background: "#225b7f"
      }
    });
  }
  function uuid(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
  }
  return {
    get trace_func() {
      return trace_func;
    },
    get debug_board() {
      return debug_board;
    },
    get Hoge() {
      return Hoge;
    },
    get confirmDialog() {
      return confirmDialog;
    },
    get myDialog() {
      return myDialog;
    },
    get uuid() {
      return uuid;
    }
  };
});
System.register("objects/debugbox", [], function() {
  "use strict";
  var __moduleName = "objects/debugbox";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var Debugbox = function Debugbox(callback_function) {
    PXUtil.trace_func('Debugbox::constructor');
    this.callback_function = callback_function;
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshPhongMaterial({color: 0x00ff00}));
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.callback_function(this.mesh);
  };
  ($traceurRuntime.createClass)(Debugbox, {rendering: function(delta) {
      this.mesh.rotation.y += delta;
    }}, {});
  return {get Debugbox() {
      return Debugbox;
    }};
});
System.register("objects/debugfloor", [], function() {
  "use strict";
  var __moduleName = "objects/debugfloor";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var Debugfloor = function Debugfloor(callback_function) {
    PXUtil.trace_func('Debugbox::constructor');
    this.callback_function = callback_function;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshPhongMaterial({color: 0xe0e0e0}));
    this.mesh.rotation.x = Math.PI + Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.callback_function(this.mesh);
  };
  ($traceurRuntime.createClass)(Debugfloor, {rendering: function(delta) {}}, {});
  return {get Debugfloor() {
      return Debugfloor;
    }};
});
System.register("objects/splite", [], function() {
  "use strict";
  var __moduleName = "objects/splite";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var Splite = function Splite(callback_function) {
    this.count = 0;
    PXUtil.trace_func('Splite::constructor');
    this.callback_function = callback_function;
    this.sprite = this.makeTextSprite(" スプライト, ", {
      fontsize: 24,
      borderColor: {
        r: 255,
        g: 0,
        b: 0,
        a: 1.0
      },
      backgroundColor: {
        r: 255,
        g: 100,
        b: 100,
        a: 0.8
      }
    });
    this.callback_function(this.sprite);
  };
  ($traceurRuntime.createClass)(Splite, {
    setPositionVector3: function(v) {
      this.sprite.position.set(v.x, v.y, v.z);
    },
    setPosition: function(x, y, z) {
      this.sprite.position.set(x, y, z);
    },
    rendering: function(delta) {
      this.updateSprite(' スプライト例 ' + this.count, {
//    this.updateSprite(' app.compiled.js内で更新 ' + this.count, {
        fontsize: 24,
        //fontsize: 10,
        borderColor: {
          r: 255,
          g: 0,
          b: 0,
          a: 1.0
        },
        backgroundColor: {
          r: 255,
          g: 100,
          b: 100,
          a: 0.8
        }
      });
      this.count++;
    },
    updateSprite: function(message, parameters) {
      if (parameters === undefined)
        parameters = {};
      var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
      var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
      var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
      var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
      };
      var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
        r: 255,
        g: 255,
        b: 255,
        a: 1.0
      };
      var metrics = this.context.measureText(message);
      var textWidth = metrics.width; // スプライトの幅では無かった
      //var textWidth = metrics.width + 200; // スプライトの幅
      this.context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
      this.context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
      this.context.lineWidth = borderThickness;
      this.roundRect(this.context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
      this.context.fillStyle = "rgba(0, 0, 0, 1.0)";
      this.context.fillText(message, borderThickness, fontsize + borderThickness);
      this.texture.needsUpdate = true;
    },
    makeTextSprite: function(message, parameters) {
      if (parameters === undefined)
        parameters = {};
      var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
      var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
      var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
      var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
      };
      var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
        r: 255,
        g: 255,
        b: 255,
        a: 1.0
      };
      var canvas = document.createElement('canvas');
      this.context = canvas.getContext('2d');
      this.context.font = "Bold " + fontsize + "px " + fontface;
      var metrics = this.context.measureText(message);
      var textWidth = metrics.width;
      this.context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
      this.context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
      this.context.lineWidth = borderThickness;
      this.roundRect(this.context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
      this.context.fillStyle = "rgba(0, 0, 0, 1.0)";
      this.context.fillText(message, borderThickness, fontsize + borderThickness);
      this.texture = new THREE.Texture(canvas);
      this.texture.needsUpdate = true;
      var spriteMaterial = new THREE.SpriteMaterial({
        map: this.texture,
        useScreenCoordinates: false
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(100, 50, 1.0);
      return sprite;
    },
    roundRect: function(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }, {});
  return {get Splite() {
      return Splite;
    }};
});
System.register("testscene", [], function() {
  "use strict";
  var __moduleName = "testscene";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var PXDebugbox = System.get("objects/debugbox");
  var PXDebugfloor = System.get("objects/debugfloor");
  var PXSplite = System.get("objects/splite");
  var _TEST_CONTROLLER_ = true;
  var TestScene = function TestScene(renderer) {
    PXUtil.trace_func('TestScene::constructor');
    this.renderer;
    this.scene;
    this.camera;
    this.light;
    this.ambient;
    this.all_items = 2;
    this.loaded_items = 0;
    this.render_target_array = new Array();
    this.clock;
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100000);
    this.camera.position = new THREE.Vector3(0, 150, 500);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.light = new THREE.SpotLight(0xffffff);
    this.light.position.set(100, 1000, 0);
    this.light.angle = Math.PI / 4;
    this.scene.add(this.light);
    this.ambient = new THREE.AmbientLight(0x333333);
    this.scene.add(this.ambient);
    this.light.castShadow = true;
    this.light.shadowMapWidth = 1024;
    this.light.shadowMapHeight = 1024;
    this.light.shadowCameraNear = 100;
    this.light.shadowCameraFar = 1100;
    this.light.shadowCameraFov = 30;
    this.light.shadowCameraVisible = true;
    this.renderer.shadowMapEnabled = true;
    this.loadObjects();
    if (_TEST_CONTROLLER_) {
      this.trackball = new THREE.TrackballControls(this.camera);
    }
  };
  ($traceurRuntime.createClass)(TestScene, {
    getLoadingStatus: function() {
      if (this.all_items === this.loaded_items || this.loading == false) {
        return true;
      } else {
        return false;
      }
    },
    loadedIncrements: function() {
      this.loaded_items++;
      if (this.loaded_items === this.all_items) {
        this.loading = false;
        this.clock = new THREE.Clock();
      }
    },
    rendering: function() {
      if (_TEST_CONTROLLER_) {
        this.trackball.update();
      }
      var delta = this.clock.getDelta();
      for (var i = 0; i < this.render_target_array.length; i++) {
        this.render_target_array[i].rendering(delta);
      }
      this.renderer.render(this.scene, this.camera);
    },
    loadObjects: function() {
      var $__4 = this;
      var debugbox = new PXDebugbox.Debugbox((function(mesh) {
        mesh.position.y += 70;
        $__4.scene.add(mesh);
        $__4.loadedIncrements();
      }));
      this.render_target_array.push(debugbox);
      var debugfloor = new PXDebugfloor.Debugfloor((function(mesh) {
        $__4.scene.add(mesh);
        $__4.loadedIncrements();
      }));
      this.render_target_array.push(debugfloor);
      var splite = new PXSplite.Splite((function(mesh) {
        mesh.position.set(0, 120, 0);
        $__4.scene.add(mesh);
      }));
      this.render_target_array.push(splite);
    },
    resize: function() {
      PXUtil.trace_func('TestScene::resize');
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
  }, {});
  return {get TestScene() {
      return TestScene;
    }};
});
System.register("app", [], function() {
  "use strict";
  var __moduleName = "app";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var PXScene = System.get("testscene");
  var Application = function Application() {
    PXUtil.trace_func('App::constructor');
    this.renderer;
    this.stats;
    this.currentSceneObject;
    this.renderer = Detector.webgl ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer();
    var width = window.innerWidth;
    var height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x00000, 1);
    document.getElementById('canvas').appendChild(this.renderer.domElement);
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.stats.domElement.style.zIndex = 100;
    document.body.appendChild(this.stats.domElement);
    if (PXConfig._DEBUG_MODE_) {
      document.body.appendChild(this.stats.domElement);
      $(document.body).append('<div id="debug_board" width="200" height="200">test<br>test2<br>test3<br></div');
    }
    this.currentSceneObject = new PXScene.TestScene(this.renderer);
    this.resize();
  };
  ($traceurRuntime.createClass)(Application, {
    run: function() {
      PXUtil.trace_func('App::run');
      this.update();
    },
    update: function() {
      this.rendering();
      this.stats.update();
    },
    rendering: function() {
      var $__6 = this;
      if (PXConfig._FPS_ === 60) {
        requestAnimationFrame((function() {
          $__6.update();
        }));
      } else {
        setTimeout((function() {
          requestAnimationFrame((function() {
            $__6.update();
          }));
        }), 1000 / PXConfig._FPS_);
      }
      if (this.currentSceneObject.getLoadingStatus() === true) {
        this.currentSceneObject.rendering();
      }
    },
    resize: function() {
      var $__6 = this;
      PXUtil.trace_func('App::resize');
      $(window).resize((function(e) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        PXUtil.trace_func('App::resize::resize w:' + w + ',h:' + h);
        $__6.renderer.setSize(w, h);
        $__6.currentSceneObject.resize();
      }));
    }
  }, {});
  $((function() {
    console.log(PXUtil.uuid());
    console.log(PXUtil.uuid());
    console.log(PXUtil.uuid());
    console.log(PXUtil.uuid());
    var app = new Application();
    app.run();
  }));
  return {};
});
System.get("app" + '');
