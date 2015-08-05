// js_functions.js

/// set important vars at init
var apikey = "&key=AIzaSyD3UkAlFf7AFo2-jJUNlK-MBu-ufZuMx6A";
var list_query = "https://www.googleapis.com/youtube/v3/search?part=snippet&mexresults=50&type=video"
var vid_query = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="

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
	var span = document.getElementById('video')
	span.innerHTML = html;
}

// this is the main function
function vidsearch() {
	// load input values from the html elements
	var duration = document.getElementById('time_input').value;
	// if goat, play goat video
	if (duration == "goat" || duration == "goats") {
		video_id = "SjHUb7NSrNk"
	} else {
	// do everything else
		duration = duration.split(':'); // split form input into usable numbers
		hour = parseInt(duration[0], 10) // get rid of leading zeroes
		minute = parseInt(duration[1], 10) // ditto
		second = parseInt(duration[2], 10) // ditto
		if (hour == 0 || hour == 'NaN') {
			// if no hour number, or hour = 0, then use just minutes and seconds
			time = "PT" + minute + "M" + second + "S"
		} else {
			// otherwise use hours
			time = "PT" + hour + "H" + minute + "M" + second + "S"
		};
		// get general duration for video (because the YT API is dumb)
		if (hour < 1 && minute < 4) {
			length = "&videoDuration=short"
		} else if (hour < 1 && minute > 4 && minute < 20) {
			length = "&videoDuration=medium"
		} else if (hour < 1 && minute > 20 || hour > 0) {
			length = "&videoDuration=long"
		}
		
		// call vid_list(), get JSON response from YT and parse
		vlist1 = JSON.parse(vid_list(length));
		
		// set up empty array for video id's
		ids = []
		
		// iterate through returned videos in JSON response
		for (i in vlist1.items) {
			// put the video id's into the array
			ids.push(vlist1.items[i].id.videoId);
		}
		// get the details for each video from YT API
		for (var i = 0; i < ids.length; i++) {
			// vall vid_details(), parse as JSON
			res = JSON.parse(vid_details(ids[i]))
			// set var to the object we want in the JSON
			duration = res.items[0].contentDetails.duration;
			// check for matches
			if (duration == time) {
				var video_id = res.items[0].id;
				break; // if something matches, use that ID and exit the loop
			} else {
				// default to interior crocodile alligator video
				video_id = 'q_qUiytLYRc'
				continue
			}
		}
	}
	// update DOM with video iframe
	set_css(video_id)	
}

