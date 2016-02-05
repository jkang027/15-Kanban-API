angular.module('Kanban', ['ngResource']);

angular.module('Kanban').value('apiUrl', 'http://localhost:50026/api');

angular.module('Kanban').controller('IndexController', function ($scope, $resource, apiUrl) {

    var ListResource = $resource(apiUrl + '/lists/:listId', { listId: '@ListId' }, {
        'cards': {
            url: apiUrl + '/lists/:listId/cards',
            method: 'GET',
            isArray: true
        }
    });

    var CardResource = $resource(apiUrl + '/cards/:cardId', { cardId: '@CardId' });

    function activate() {
        ListResource.query(function (data) {
            $scope.lists = data;

            $scope.lists.forEach(function (list) {
                list.cards = ListResource.cards({ listId: list.ListId });
            });
        });
    }

    $scope.newList = {};

    $scope.addList = function () {
        ListResource.save($scope.newList, function () {
            alert('Save Successful');
            activate();
        });
    };

    $scope.deleteList = function (list) {
        list.$delete(function () {
            alert('Delete Successful');
            activate();
        });
    };

    activate();
});
