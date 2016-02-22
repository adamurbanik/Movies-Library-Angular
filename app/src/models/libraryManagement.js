var libraryManagement = (function () {

  var movies = [];

  function createModel(videoData) {
    var model = {
      title: videoData.title,
      date: new Date().toISOString(),
      dateNumber: Date.now(),
      thumb: videoData.thumb,
      author: videoData.author,
      favourite: videoData.favourite || false,
      videoID: videoData.video_id,
      favourCount: 0,
      viewingCount: videoData.viewingCount || 0,
      source: videoData.source
    };

    return {
      model: model
    };

  }

  function addToCollection(videoData) {
    console.log('addtocollection');
    var videoID = videoData.video_id || videoData.videoID;
    if (getMovieByVideoId(videoID) !== -1) {
      // increaseViewingTimes(videoId);
    }
    else {
      movies.push(createModel(videoData));
      updateStorage();
    }
  }

  function updateStorage() {
    localStorage.setItem('movies', JSON.stringify(movies));

  }

  function getMovieByVideoId(videoID) {
    movies.forEach(function (element) {
      if (element.model.videoID === videoID) {
        return element;
      }
    });
    return -1;
  }

  function getCollection() {
    movies = JSON.parse(localStorage.getItem('movies')) || [];
    return movies;
  }

  function clearLibrary() {
    movies = [];
    updateStorage();
    return movies;
  }


  return {
    addToCollection: addToCollection,
    getCollection: getCollection,
    clearLibrary: clearLibrary

  };

});