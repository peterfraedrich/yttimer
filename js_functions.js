// js_functions.js

/// set important vars at init
var apikey = "&key=AIzaSyD3UkAlFf7AFo2-jJUNlK-MBu-ufZuMx6A";
var list_query = "https://www.googleapis.com/youtube/v3/search?part=snippet&mexresults=50&type=video"
var vid_query = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="
var video_id = '' // set default video

// this gets details for a single video
function vid_details(vid_id) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", vid_query+vid_id+apikey, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
};
// list videos in the length range
function get_videos(length, page) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", list_query+length+page+'&type=video'+apikey, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
};
// this loads the video from youtube in an iframe
function set_css(video_id) {
	console.log(video_id);
	var html = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+video_id+'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
	var span = document.getElementById('video');
	span.innerHTML = html;
	document.getElementById('working').style.display = 'none';
};
// goat css
function goat() {
	video_id = 'SjHUb7NSrNk';
	set_css(video_id);
	gif = 'http://media.giphy.com/media/Vw2uzhE0Bwfks/giphy.gif';
	document.body.style.backgroundRepeat = 'repeat';
	document.body.style.backgroundImage = 'url(' + gif + ')';
	document.getElementById('wrapper').style.backgroundColor = 'rgba(255,255,255,0.0)';
};
// taylor goat css
function taylor_swift() {
	video_id = 'L26vEW8Xg2g';
	set_css(video_id);
	gif = 'http://media.giphy.com/media/Vw2uzhE0Bwfks/giphy.gif';
	document.body.style.backgroundRepeat = 'repeat';
	document.body.style.backgroundImage = 'url(' + gif + ')';
	document.getElementById('wrapper').style.backgroundColor = 'rgba(255,255,255,0.0)';
};
// croc css
function croc() {
	video_id = 'q_qUiytLYRc';
	set_css(video_id);
	gif = 'http://img.photobucket.com/albums/v717/Lauranoodle/AnimationAlligatorSkip_color.gif';
	document.body.style.backgroundRepeat = 'repeat';
	document.body.style.backgroundImage = 'url(' + gif + ')';
	document.getElementById('wrapper').style.backgroundImage = 'url(http://media.giphy.com/media/URZcG7uLd9h4s/giphy.gif)';
	document.getElementById('wrapper').style.backgroundRepeat = 'repeat';
	document.getElementById('wrapper').style.backgroundColor = 'rgba(255,255,255,0.0)';
};
// this is the main function that is called by the onClick event
function vsearch2() {
	document.getElementById('working').style.opacity = 1; // make the single ladies visible
	// load input values from the html elements
	var duration = document.getElementById('time_input').value;
	// check for easter eggs
	if (duration == 'goat' || duration == 'goats') {
		goat();
	} else if (duration == '') {
		croc();
	} else if (duration == 'taylor' || duration == 'swift' || duration == 'justin' || duration ==  'bieber' || duration == 'miley' || duration == 'cyrus') {
		taylor_swift();
	} else {
		video_id = 'q_qUiytLYRc';
		duration = duration.split(':'); // split form input into usable numbers
		hour = parseInt(duration[0], 10); // get rid of leading zeroes
		minute = parseInt(duration[1], 10); // ditto
		second = parseInt(duration[2], 10) + 1; // ditto, apparently YT trims 1 second off the duration, soooo idk
		if (hour == 0 || hour == 'NaN') {
			// if no hour number, or hour = 0, then use just minutes and seconds
			time = "PT" + minute + "M" + second + "S";
		} else {
			// otherwise use hours
			time = "PT" + hour + "H" + minute + "M" + second + "S";
		};
		// get general duration for video (because the YT API is dumb)
		if (hour < 1 && minute < 4) {
			length = "&videoDuration=short";
		} else if (hour < 1 && minute > 4 && minute < 20) {
			length = "&videoDuration=medium";
		} else if (hour < 1 && minute > 20 || hour > 0) {
			length = "&videoDuration=long";
		};
		ids = []; // empty array for ids
		var loop = true; // set looper so it goes until it finds a video
		var page = '&pageToken='; // set page to empty string
		var failsafe = 0;

		// look for videos until you find one
		while (loop == true){
			res1 = JSON.parse(get_videos(length,page))
			for (i in res1.items) {
				// put the video id's into the array
				ids.push(res1.items[i].id.videoId);
			};
			for (var i = 0; i < ids.length; i++) {
				// vall vid_details(), parse as JSON
				res2 = JSON.parse(vid_details(ids[i]));
				// set var to the object we want in the JSON
				duration = res2.items[0].contentDetails.duration;
				// check for matches
				if (duration == time) {
					var video_id = res2.items[0].id;
					loop = false; // exit while loop
					break; // if something matches, use that ID and exit the loop
				};
			};
			page = '&pageToken=' + res1.nextPageToken;				
			// keep from looping too many times
			failsafe = failsafe + 1;
			if (failsafe == 101) { // YT only returns 100 results, so limit to 101 to make sure we dont keep looping
				loop = false;
				croc();
			};
		};
		set_css(video_id);
	};
};

function nodesearch() {
	document.getElementById('working').style.opacity = 1;
	var duration = document.getElementById('time_input').value;
	if (duration == 'goat' || duration == 'goats') {
		goat();
	} else if (duration == '') {
		croc();
	} else if (duration == 'taylor' || duration == 'swift' || duration == 'justin' || duration ==  'bieber' || duration == 'miley' || duration == 'cyrus') {
		taylor_swift();
	} else {
		duration = duration.split(':'); // split form input into usable numbers
		hour = parseInt(duration[0], 10); // get rid of leading zeroes
		minute = parseInt(duration[1], 10); // ditto
		second = parseInt(duration[2], 10); // ditto, apparently YT trims 1 second off the duration, soooo idk
		if (hour == 0 || hour == 'NaN') {
			// if no hour number, or hour = 0, then use just minutes and seconds
			time = "PT" + minute + "M" + second + "S";
			rawtime = hour + '%3A' + minute + '%3A' + second;
		} else {
			// otherwise use hours
			time = "PT" + hour + "H" + minute + "M" + second + "S";
			rawtime = minute + '%3A' + second;
		};
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", 'http://ytdb:667/video?duration=' + time + '&rawtime=' + rawtime, true);
		//xmlHttp.responseType = 'json';
		xmlHttp.send();
		console.log(xmlHttp.responseText);
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 & xmlHttp.status==200) {
				data = xmlHttp.responseText;
				console.log(data);
				set_css(data)
			}
		}/*
		data = JSON.parse(xmlHttp.responseText);
		console.log(data);
		set_css(data.video_id)*/
	}
}
