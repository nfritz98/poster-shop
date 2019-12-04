var LOAD_NUM = 4;

new Vue({
    el: "#app",
    data: {
        total: 0,
        products: [],
        cart: [],
        search: 'cat',
        lastSearch: '',
        loading: false,
        results: []
    },
    methods: {
        addToCart: function(product) {
            this.total += product.price;
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    this.cart[i].qty++;
                    found = true;
                }
            }
            if (!found) {
                this.cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    qty: 1
                });
            }
        },
        increase: function (item) {
            item.qty++;
            this.total += item.price;
        },
        decrease: function (item) {
            item.qty--;
            this.total -= item.price;
            if(item.qty <=0){
                //finds position of selected item in cart-array
                var i = this.cart.indexOf(item);
                //remove this item from cart-array
                this.cart.splice(i, 1)
            }
        },
        onSubmit: function () {
            this.products = [];
            this.loading = true;
            var path = '/search?q='.concat(this.search);
            this.$http.get(path)
                .then(function (response) {
                    this.results = response.body;
                    this.products = response.body.slice(0, LOAD_NUM);
                    this.lastSearch = this.search;
                    this.loading = false;
                });
        }
    },
    filters: {
        currency: function (price) {
            return price.toFixed(2).concat(' €');
        }
    },
    created: function () {
        this.onSubmit();
    }
});

//Creates listener for element on page
var sensor = document.querySelector('#product-list-bottom');
var watcher =  scrollMonitor.create(sensor);

watcher.enterViewport(function () {

});