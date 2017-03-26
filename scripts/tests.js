/*(function(window) {
    'use strict';
    var App = window.App || {};
    window.App = App;
})(window);*/

QUnit.test('figure 8.10 code tests', function(assert) {
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    /*assert.equal(ds.getAll(), 'm@bond.com: "tea", james@bond.com: "eshpressho"');*/
    assert.propEqual(ds.getAll(), {
        'james@bond.com': 'eshpressho',
        'm@bond.com': 'tea'
    })
    ds.remove('james@bond.com');
    assert.propEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    });
    assert.equal(ds.get('m@bond.com'), 'tea');
    assert.equal(ds.get('james@bond.com'), undefined);
});

QUnit.test('figure 8.32 code tests', function(assert) {
    var myTruck = new App.Truck('ncc-1701', new App.DataStore());
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });
    /*printOrders() doesnt actually return anything, so truck.js had to be changed
    to return a string for the tests to work correctly*/
    assert.equal(myTruck.printOrders(), 'Truck #ncc-1701 has pending orders:\nme@goldfinger.com: double mocha\ndr@no.com: decaf\nm@bond.com: earl grey\n');
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    assert.equal(myTruck.printOrders(), 'Truck #ncc-1701 has pending orders:\nme@goldfinger.com: double mocha\n');
});
