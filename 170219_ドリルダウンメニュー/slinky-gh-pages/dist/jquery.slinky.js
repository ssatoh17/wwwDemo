!function(e){
    var t;
    e.fn.slinky=function(a)
    {
        var s=e.extend({label:"Back",title:!1,speed:300,resize:!0},a),n=e(this),i=n.children().first();
        n.addClass("slinky-menu");
     var r=function(e,t){
         var a=Math.round(parseInt(i.get(0).style.left))||0;i.css("left",a-100*e+"%"),"function"==typeof t&&setTimeout(t,s.speed)},l=function(e){n.height(e.outerHeight())},
         d=function(e){
             n.css("transition-duration",e+"ms"),i.css("transition-duration",e+"ms")};
     if(d(s.speed),e("a + ul",n).prev().addClass("next"),e("li > ul",n).prepend('<li class="header">'),s.title===!0&&e("li > ul",n).each(function(){var t=e(this).parent().find("a").first().text(),a=e("<h2>").text(t);e("> .header",this).append(a)}),s.title||s.label!==!0){
             var o=e("<a>").text(s.label).prop("href","#").addClass("back");e(".header",n).append(o)}else e("li > ul",n).each(function(){
                 var t=e(this).parent().find("a").first().text(),a=e("<a>").text(t).prop("href","#").addClass("back");e("> .header",this).append(a)});
     e("a",n).on("click",function(a){
         if(t+s.speed>Date.now())return!1;t=Date.now();
             var i=e(this);
                                     (/#/.test(this.href)||i.hasClass("next"))&&a.preventDefault(),i.hasClass("next")?(n.find(".active").removeClass("active"),i.next().show().addClass("active"),r(1),s.resize&&l(i.next())):i.hasClass("back")&&(r(-1,function(){n.find(".active").removeClass("active"),i.parent().parent().hide().parentsUntil(n,"ul").first().addClass("active")}),s.resize&&l(i.parent().parent().parentsUntil(n,"ul")))}),
         this.jump=function(t,a){t=e(t);
                                     var i=n.find(".active");i=i.length>0?i.parentsUntil(n,"ul").length:0,n.find("ul").removeClass("active").hide();
                                     var o=t.parentsUntil(n,"ul");o.show(),t.show().addClass("active"),a===!1&&d(0),r(o.length-i),s.resize&&l(t),a===!1&&d(s.speed)},
         this.home=function(t)
        {
         t===!1&&d(0);
         var a=n.find(".active"), i=a.parentsUntil(n,"li").length;
         i>0&&(r(-i,function()
                 {a.removeClass("active")}),
                s.resize&&l(e(a.parentsUntil(n,"li").get(i-1)).parent())),
        t===!1&&d(s.speed)
        },
         this.destroy=function()
     {e(".header",n).remove(),e("a",n).removeClass("next").off("click"),n.removeClass("slinky-menu").css("transition-duration",""),i.css("transition-duration","")};
     var c=n.find(".active");return c.length>0&&(c.removeClass("active"),this.jump(c,!1)),this
    }
}(jQuery);