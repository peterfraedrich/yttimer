// js_functions.js

var apikey = "&key=AIzaSyD3UkAlFf7AFo2-jJUNlK-MBu-ufZuMx6A";
var list_query = "https://www.googleapis.com/youtube/v3/search?part=snippet&mexresults=50&type=video"
var vid_query = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="


function vid_list(length) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", list_query+length+apikey, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

function vid_details(vid_id) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", vid_query+vid_id+apikey, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

function set_css(video_id) {
	var html = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+video_id+'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
	var span = document.getElementById('video')
	span.innerHTML = html;
}

function vidsearch() {
	// load form input
	var duration = document.getElementById('time_input').value;
	if (duration == "goat" || duration == "goats") {
		video_id = "SjHUb7NSrNk"
	} else {
		duration = duration.split(':');
		hour = parseInt(duration[0], 10)
		minute = parseInt(duration[1], 10)
		second = parseInt(duration[2], 10)
		if (hour == 0 || hour == 'NaN') {
			time = "PT" + minute + "M" + second + "S"
		} else {
			time = "PT" + hour + "H" + minute + "M" + second + "S"
		};
		if (hour < 1 && minute < 4) {
			length = "&videoDuration=short"
		} else if (hour < 1 && minute > 4 && minute < 20) {
			length = "&videoDuration=medium"
		} else if (hour < 1 && minute > 20 || hour > 0) {
			length = "&videoDuration=long"
		}
		
		vlist1 = JSON.parse(vid_list(length));
		ids = []
		for (i in vlist1.items) {
			ids.push(vlist1.items[i].id.videoId);
		}
		for (var i = 0; i < ids.length; i++) {
			res = JSON.parse(vid_details(ids[i]))
			duration = res.items[0].contentDetails.duration;
			if (duration == time) {
				var video_id = res.items[0].id;
				break;
			} else {
				video_id = 'q_qUiytLYRc'
				continue
			}
		}
	}
	set_css(video_id)	
}

