angular.module('Kanban', ['ngResource']);

angular.module('Kanban').value('apiUrl', 'http://localhost:50026/api');

angular.module('Kanban').controller('IndexController', function ($scope, $resource, apiUrl) {

    var CardResource = $resource(apiUrl + '/cards/:cardId', { cardId: '@CardId' }, {
        'cards': {
            method: 'GET',
            url: apiUrl + '/lists/:listId/cards',
            isArray: true
        }
    });
    var ListResource = $resource(apiUrl + '/lists/:listId', { listId: '@ListId' });

    $scope.data = {
        newList: {},
        newCard: {}
    };

    $scope.addList = function () {
        ListResource.save($scope.data.newList, function (data) {
            alert('Save Successful');
            activate();
        });
    };

    $scope.addCard = function (list) {
        list.newCard.ListId = list.ListId;
        CardResource.save(list.newCard, function (data) {
            alert('Save Successful');
            activate();
        });
    };

    $scope.removeList = function (list) {
        list.$remove(function (data) {
            alert('Delete Successful');
            activate();
        });
    };

    $scope.removeCard = function (card) {
        card.$remove(function (data) {
            alert('Delete Successful');
            activate();
        });
    };

    activate();

    function activate() {
        ListResource.query(function (data) {
            $scope.data.lists = data;

            $scope.data.lists.forEach(function (list) {
                list.cards = CardResource.cards({ listId: list.ListId });
            });
        });
    }
});
