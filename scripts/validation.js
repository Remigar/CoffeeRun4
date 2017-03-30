(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;


    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        decafCheck: function(order, strength) {
            //return true if the order isnt decaf
            if (order != 'decaf') return true;
            //else (the coffee order is decaf) check the strength
            else if (strength <= 20) return true;
            //if this condition fails, the order is decaf and its strength is greater then 20, which doesn't make any gosh dang sense!
            else return false;
        },
        alreadyExists: function(email) {
            //send a query to the remote server for an order with key email
            //if it exists, return true
            //else, return false
            var result = $.ajax({
                url: 'http://localhost:3002/coffeeorders' + '/' + email,
                success: function(result) {
                    //DO NOTHING
                },
                async: false
            });

            console.log(result);
            if (result.responseText == '{}')
                return false;
            else return true;
        }
    };

    App.Validation = Validation;
    window.App = App;
}(window));
