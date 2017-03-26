(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());
        var returnStr = '';
        console.log('Truck #' + this.truckId + ' has pending orders:');
        returnStr += 'Truck #' + this.truckId + ' has pending orders:\n';
        customerIdArray.forEach(function(id) {
            console.log(this.db.get(id));
            returnStr += this.db.get(id).emailAddress + ': ' + this.db.get(id).coffee + '\n';
        }.bind(this));
        return returnStr;
    };

    App.Truck = Truck;
    window.App = App;

})(window);


/*sample code
var myTruck = new App.Truck ('007', new App.DataStore());
myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
myTruck.createOrder({ emailAddress: 'n@bond.com', coffee: 'earl green'});
myTruck.createOrder({ emailAddress: 'o@bond.com', coffee: 'earl greg'});*/
