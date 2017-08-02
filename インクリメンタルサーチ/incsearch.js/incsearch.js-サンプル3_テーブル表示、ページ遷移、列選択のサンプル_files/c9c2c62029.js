var trackfeed_ref = document.referrer;
if (trackfeed_ref == parent.document.URL && top.document) trackfeed_ref = top.document.referrer;
var trackfeed_url = document.URL;
var trackfeed_urlbase = false;
if (trackfeed_url.match(/([^\/]+\/\/[^\/]+[\/]?)([^\/\?\&\=!#%\*]*[\/])?/)){
	trackfeed_urlbase = RegExp.$1+RegExp.$2;
}
var trackfeed_image = false;
if (document.images['trackfeed_banner']){
	trackfeed_image = document.images['trackfeed_banner'];
}
if (trackfeed_urlbase && trackfeed_ref.indexOf(trackfeed_urlbase) != 0){
	// not in the same tree
	trackfeed_url = escape(trackfeed_url);
	trackfeed_ref = escape(trackfeed_ref);
	if (trackfeed_image){
		var trackfeed_tmpimg = new Image();
		trackfeed_tmpimg.src = "http://trackfeed.com/img.php?r=c9c2c62029&ref=" + trackfeed_ref + "&url=" + trackfeed_url;
		trackfeed_tmpimg.onload = function(){ trackfeed_image.src = trackfeed_tmpimg.src; };
	}else{
		document.write('<a href="http://trackfeed.com/?r=c9c2c62029" target="_blank"><img src="http://trackfeed.com/img.php?r=c9c2c62029&ref=',trackfeed_ref,'&url=',trackfeed_url,'" border="0" alt="track feed" /></a>');
	}
}else{
	// do nothing
	if (!trackfeed_image){
		document.write('<a href="http://trackfeed.com/?r=c9c2c62029" target="_blank"><img src="http://img.trackfeed.com/img/trackfeedbarblue.gif" border="0" alt="track feed" /></a>');
	}
}