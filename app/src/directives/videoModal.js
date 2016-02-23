function modal() {
  return {
    templateUrl: 'tmpl/modal.html',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope: {
      visible: '='
    },
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;      

      scope.$watch('visible', function(value) {
        $(element).modal( value ? 'show' : 'hide');
      });

      $(element)
        .on('shown.bs.modal', function() {
          scope.visible = true;
          console.log('shown');
          // scope.$apply(function() {
          //   scope.$parent[attrs.visible] = true;
          // });
        })
        .on('hidden.bs.modal', function() {
          scope.visible = false;
          console.log('hidden');
          // scope.$apply(function() {
          //   scope.$parent[attrs.visible] = false;
          // });
        });
    }
  };
}

(function(){
  angular
    .module('libraryApp')
    .directive('appVideoModal', modal);
  
}());

