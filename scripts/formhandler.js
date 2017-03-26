(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    function FormHandler(selector) {
        if (!selector) {
            throw new Error('no selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('could not find element with selector: ' + selector);
        }
        FormHandler.prototype.addSubmitHandler = function(fn) {
            console.log('Setting submit handler for form');
            this.$formElement.on('submit', function (event) {
                event.preventDefault();
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                fn(data);

                this.reset();
                this.elements[0].focus();

            });
        };

        FormHandler.prototype.addInputHandler = function (fn) {
            console.log('Setting input handler for form');
            this.$formElement.on('input', '[name="emailAddress"]', function(event) {
                var emailAddress = event.target.value;
                var message = '';
                if (fn(emailAddress)) {
                    event.target.setCustomValidity('');
                } else {
                    message = emailAddress + ' is not an authorized email address!';
                    event.target.setCustomValidity(message);
                }

            });
        };

        FormHandler.prototype.addCoffeeandSliderHandler = function(fn) {
            console.log('Setting input handler for coffee order and slider');
            //handler for order field
            this.$formElement.on('input', '[name="coffee"]', function(event) {
                var order = event.target.value;
                //get the value of the caffeine slider
                var strength = $('[name="strength"]').val();
                var message = '';
                if (fn(order, strength)) {
                    event.target.setCustomValidity('');
                } else {
                    message = 'decaf should have a strength level of 20 or less!';
                    event.target.setCustomValidity(message);
                }
            });
            //handler for slider
            this.$formElement.on('change', '[name="strength"]', function(event) {
                var strength = event.target.value;
                var order = $('[name="coffee"]').val();
                console.log(order);
                console.log(strength);
                var message = '';
                if (fn(order, strength)) {
                    event.target.setCustomValidity('');
                } else {
                    message = 'decaf should have a strength level of 20 or less!';
                    event.target.setCustomValidity(message);
                }
            });

        };
    }
    App.FormHandler = FormHandler;
    window.App = App;
})(window);
