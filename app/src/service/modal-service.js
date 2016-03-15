(function() {
  
  // <app-video-modal title="Video" visible="vm.youtube">
  //     <div id="player"></div>
  //   </app-video-modal>
  //   <app-video-modal title="Video" visible="vm.vimeo">
  //     <iframe id="playerVimeo"></iframe>
  //   </app-video-modal>
  
  var ModalService = (function ModalService() {
    function ModalService($compile) {
    }
    
    ModalService.prototype.showVideo = function showVideo(video) {
      // console.log(video);
    };
    
    return ModalService;
  })();
  
  
  // angular
  //   .module('libraryApp')
  //   .service('modalService', ModalService); 
})();