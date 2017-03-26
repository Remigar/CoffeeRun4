(function(window) {
    'use strict';
    var App = window.App || {};

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
        }
    };

    App.Validation = Validation;
    window.App = App;
}(window));
