let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "../assets/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks",
        inStock: false,
        inventory: 100,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "../assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "../assets/vmSocks-blue-onWhite.jpg",
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        deleteFromCart() {
            this.cart -= 1
            if (this.cart < 0) {
                this.cart = 0
            }
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
    },

})






