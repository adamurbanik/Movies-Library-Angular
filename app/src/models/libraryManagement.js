var libraryManagement = (function () {

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
      $scope.movies.push(createModel(videoData));
      updateStorage();
    }
  }

  function updateStorage() {
    localStorage.setItem('movies', JSON.stringify($scope.movies));

  }

  function getMovieByVideoId(videoID) {
    $scope.movies.forEach(function (element) {
      if (element.model.videoID === videoID) {
        return element;
      }
    });
  }
    
    // for (var i = 0; i < _moviesArr.length; i++) {
    //   if (_moviesArr[i].model.videoID == videoID) {
    //     return _moviesArr[i];
    //   }
    // }
    // return -1;
    // }

    return {
      addToCollection: addToCollection
    };

  });