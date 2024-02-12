Vue.component('product-tabs', {
    template: `
    <div>
        <ul>
            <span class="tab"
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
            >{{ tab }}</span>
        </ul>
        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                <p>You recomend me?: {{ review.recomend }}</p>
                </li>
            </ul>
        </div>
        <div v-show="selectedTab === 'Make a Review'">
        <div>
             <product-review @review-submitted="addReview"></product-review>
        </div>
        </div>
        <div v-show="selectedTab === 'Shipping'">
            <p>Shipping: {{ shipping }}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
        </div>
</div>
    `,
    data() {
    return {
    tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
    selectedTab: 'Reviews' 
    }
    },
    props: {
        reviews: {
        type: Array,
        required: false
        },
        details:{
            type: Array
        },
        shipping: {
            type: undefined
        }
        },
        methods:{
            addReview(productReview) {
                this.reviews.push(productReview)
            },
        
        }
})
Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        },
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
     <b>Please correct the following error(s):</b>

    <ul>
        <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>You recomend me?</p>

    <div class="recomend">
	    <input type="radio" v-model="recomend" id="recomend" for="recomend" name="radio" value="Yes!">
	    <label for="recomend">Yes!</label>
    </div>

    <div class="recomend">
        <input type="radio" v-model="recomend" id="recomend" for="recomend" name="radio" value="No!">
        <label for="recomend">No!</label>
    </div>

    <p>
        <input type="submit" value="Submit">
    </p>    
</form>
    `,
    data() {
    return {
        name: null,
        review: null,
        rating: null,
        recomend: null,
        errors: []
        }
    },
    methods: {
            onSubmit() {
                if(this.name && this.review && this.rating && recomend) {
                    let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recomend: this.recomend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recomend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recomend) this.errors.push("Recomend required.")
            }
        }    
    }
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
    <div class="product">
     <div class="product-image">
        <img :src="image" :alt="altText"/>
    </div>

    <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else>Out of Stock</p>
        <p v-if="onSale">Sale!!</p>
        <product-details :details="details"/>
        <p>Shipping: {{ shipping }}</p>
        <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor:variant.variantColor}"
            @mouseover="updateProduct(index)"></div>
        <ul><li v-for="size in sizes">{{ size }}</li></ul>
            <div class="buttons">
            <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}" >
                Add to cart
            </button>
            <button v-on:click="deleteToCart">delete Cart</button>
             </div>
                <a v-bind:href="link"> More products</a> 
            </div>   
            <product-tabs :details="details" :shipping="shipping" :reviews="reviews"></product-tabs>
        </div>
    </div>
    `,
    data() {
        return {
            selectedVariant: 0,
            description: "A pair of warm, fuzzy socks.",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            product: "Socks",
            brand: "Vue Mastery",
            altText: "A pair of socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            variants: [
                {
                    variantId: 2234,

                    variantColor: 'green',
                    variantImage: "../assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "../assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 10
                }
            ],
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
                this.variants[this.selectedVariant]);
        },

        deleteToCart() {
            this.$emit('delete-to-cart',
                this.variants[this.selectedVariant].variantId);
        },

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },

        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },

        onSale() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            let count = 1;
            let name = id.variantId
            let finder = this.cart.find(function(e) {
                return e.name === name;
            })
            if(finder){
                let ell = this.cart.find(function(e) {
                    return e.name === name;
                })
                ell.count++;
            }
            else{
                this.cart.push({name , count});
            }
            },
        
        removeCart(id){
            this.cart.shift(id)
        },
    
        removeCount(id) {
            id.count--
            if(id.count <= 0){
                this.cart.shift(id)
            }
        },
    
        addCount(id) {
            id.count++
        }
        },
})





