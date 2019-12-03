new Vue({
    el: "#app",
    data: {
        total: 0,
        products: [
            { title: "Product 1", id: 1, price: 9.99 },
            { title: "Product 2", id: 2, price: 9.99 },
            { title: "Product 3", id: 3, price: 9.99 }
        ],
        cart: [],
        search: ''
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
        }
    },
    filters: {
        currency: function (price) {
            return price.toFixed(2).concat(' €');
        }
    }
});