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
        
            inStock(){
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
            this.cart.push(id)
        },
        deleteCart(id) {
            if (this.cart.length>0){
                this.cart.splice(this.cart.indexOf(id),1);
            }
      
    }
}
})

 Vue.component('product-details', {
    props:  {
            details: {
            type: Array,
            required: true
        },
    },
    template:`
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
    
  })

 