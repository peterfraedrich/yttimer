// js_functions.js

/// set important vars at init
var apikey = "&key=AIzaSyD3UkAlFf7AFo2-jJUNlK-MBu-ufZuMx6A";
var list_query = "https://www.googleapis.com/youtube/v3/search?part=snippet&mexresults=50&type=video"
var vid_query = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="
var video_id = '' // set default video


// this gets a list of videos from youtube
function vid_list(length) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", list_query+length+apikey, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

// this gets details for a single video
function vid_details(vid_id) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", vid_query+vid_id+apikey, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

// this loads the video from youtube in an iframe
function set_css(video_id) {
	var html = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+video_id+'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
	var span = document.getElementById('video');
	span.innerHTML = html;
	document.getElementById('working').style.display = 'none';
}

// goat css
function goat() {
	video_id = 'SjHUb7NSrNk';
	set_css(video_id);
	gif = 'http://media.giphy.com/media/Vw2uzhE0Bwfks/giphy.gif';
	document.body.style.backgroundRepeat = 'repeat';
	document.body.style.backgroundImage = 'url(' + gif + ')';
	document.getElementById('wrapper').style.backgroundColor = 'rgba(255,255,255,0.0)';
}

function croc() {
	video_id = 'q_qUiytLYRc';
	set_css(video_id);
	// set wallpaper to stupid gif
	gif = 'http://img.photobucket.com/albums/v717/Lauranoodle/AnimationAlligatorSkip_color.gif';
	document.body.style.backgroundRepeat = 'repeat';
	document.body.style.backgroundImage = 'url(' + gif + ')';
	document.getElementById('wrapper').style.backgroundImage = 'url(http://media.giphy.com/media/URZcG7uLd9h4s/giphy.gif)';
	document.getElementById('wrapper').style.backgroundRepeat = 'repeat';
	document.getElementById('wrapper').style.backgroundColor = 'rgba(255,255,255,0.0)';
}
/*
// this is the main function 
function vidsearch() {
	// load input values from the html elements
	var duration = document.getElementById('time_input').value;
	// if goat, play goat video
	if (duration == "goat" || duration == "goats") {
		goat(); // trigger goat-themed CSS
		video_id = "SjHUb7NSrNk";
		set_css(video_id);
	} else {
	// do everything else
		duration = duration.split(':'); // split form input into usable numbers
		hour = parseInt(duration[0], 10); // get rid of leading zeroes
		minute = parseInt(duration[1], 10); // ditto
		second = parseInt(duration[2], 10); // ditto
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
		
		// call vid_list(), get JSON response from YT and parse
		vlist1 = JSON.parse(vid_list(length));
		
		// set up empty array for video id's
		ids = [];
		
		// iterate through returned videos in JSON response
		for (i in vlist1.items) {
			// put the video id's into the array
			ids.push(vlist1.items[i].id.videoId);
		};
		// get the details for each video from YT API
		for (var i = 0; i < ids.length; i++) {
			// vall vid_details(), parse as JSON
			res = JSON.parse(vid_details(ids[i]));
			// set var to the object we want in the JSON
			duration = res.items[0].contentDetails.duration;
			// check for matches
			if (duration == time) {
				video_id = res.items[0].id;
				break; // if something matches, use that ID and exit the loop
			} else {
				// default to interior crocodile alligator video
				video_id = 'q_qUiytLYRc';
				// set wallpaper to stupid gif
				gif = 'http://img.photobucket.com/albums/v717/Lauranoodle/AnimationAlligatorSkip_color.gif';
				document.body.style.backgroundRepeat = 'repeat';
				document.body.style.backgroundImage = 'url(' + gif + ')';
				document.getElementById('wrapper').style.backgroundImage = 'url(http://media.giphy.com/media/URZcG7uLd9h4s/giphy.gif)';
				document.getElementById('wrapper').style.backgroundRepeat = 'repeat';
				document.getElementById('wrapper').style.backgroundColor = 'rgba(255,255,255,0.0)';
				continue;
			};
		};
	};
	// update DOM with video iframe
	set_css(video_id);	
}; */

function get_videos(length, page) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", list_query+length+page+'&type=video'+apikey, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
};

function show_working_bug() {
	document.getElementById('working').style.display = 'block';
}

function vsearch2() {
	document.getElementById('working').style.opacity = 1;
	// load input values from the html elements
	var duration = document.getElementById('time_input').value;
	// check for easter eggs
	if (duration == 'goat' || duration == 'goats') {
		goat();
	} else if (duration == '') {
		croc();
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

