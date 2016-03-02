// // (function () {

// //   angular
// //     .module('libraryApp')
// //     .service('InputService', InputService);

// // } ());

// function InputService() {

//   this.inputHandler = function (link) {
//     // return new Promise(function (succeed, fail) {
//     //   var input = validateInput(link);
//     //   succeed(input);
//     // });
//     return validateInput(link);
//   };

//   function validateInput(link) {
//     var videoID, provider;
//     try {
//       if (getYouTubeID(link) !== -1) {
//         videoID = getYouTubeID(link);
//         provider = YTService; 
//       }
//       else if (getVimeoID(link) !== -1) {
//         videoID = getVimeoID(link);
//         provider = VimeoService; 
//       }

//       return {
//         provider: provider,
//         videoID: videoID
//       };
//     }
//     catch (e) {
//       console.log("Wrong link entered. Error: " + e);
//     }
//   }

//   function getYouTubeID(url) {
//     var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     var match = url.match(regExp);
//     if (match && match[2].length === 11) {
//       return match[2];
//     } else {
//       return -1;
//     }
//   }
    
//   /* group 1 - group name, 2 - albumID, group 3 - videoID */
//   function getVimeoID(url) {
//     var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
//     var match = url.match(regExp);
//     if (match && match[3].length > 0) {
//       return match[3];
//     }
//     else {
//       return -1;
//     }
//   }

// }










// // interface IVideo {
// // 	id: string;
// // 	name: string;
// // }

// // interface IVideoService {
// // 	validate (url : string) : boolean;
// // 	fetchVideo (url : string) : Promise<IVideo>;
// // }

// // class YoutubeVideoService implements IVideoService {
// // 	validate() {
// // 		return false;
// // 	}
	
// // 	fetchVideo() {
// // 		return Promise.reject('chuj');
// // 	}
// // } 

// // class VimeoVideoService implements IVideoService {
// // 	validate() {
// // 		return false;
// // 	}
	
// // 	fetchVideo() {
// // 		return Promise.reject('chuj');
// // 	}
// // }


// // class LSVideoService implements IVideoService {
// // 	validate() {
// // 		return false;
// // 	}
	
// // 	fetchVideo() {
// // 		return Promise.reject('chuj');
// // 	}
// // } 

// // class VideoService implements IVideoService {
// // 	private services : IVideoService[] = [
// // 		new YoutubeVideoService(),
// // 		new VimeoVideoService(),
// // 		new LSVideoService()
// // 	]
	
// // 	validate(url : string) {
// // 		for (let s of this.services) {
// // 			if (s.validate(url)) {
// // 				return true;
// // 			}
// // 		}
		
// // 		return false;
// // 	}
	
// // 	fetchVideo(url : string) {
// // 		for (let s of this.services) {
// // 			if (s.validate(url)) {
// // 				return s.fetchVideo(url);
// // 			}
// // 		}
		
// // 		return Promise.reject('Podales chujowy url');
// // 	}
// // }
