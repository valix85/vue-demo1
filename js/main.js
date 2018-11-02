
Vue.component('monitor', {
    // props are used for passing data into our components, sono variabili che espone per contenere i dati dall'esterno. Si possono usare queste variabili nel template
    //props: [stato,messaggio],
    //meglio specificare come oggetto con default value
    props:{
        stato: {
            type: String,
            required: true,
            default: "500"
        },
        messaggio:{
            type: String,
            required: false,
            default: "nessun messaggio"
        },
        titolo:{
            type: String,
            required: false,
            default: "Monitor Sconosciuto"
        },
        prodotto: {
            type: Object,
            required: false,
            default: {}
        }
    },

    //component element must contain exactly ONE root element
    template:`<div class="box-monitor monitor">
        <h4>{{titolo}}</h4>
        <div class="monitor-stato">{{stato}}</div>
        <div class="monitor-messaggio">{{messaggio}}</div>
        <div v-if="Object.keys(prodotto).length>1" >Prezzo: {{calcolaPrezzo}}</div>
    </div>`,
    
    //component can have proper data, it's use a data function that return a data object. Each component return a unique data
    data(){
        return {
        
        }
    },   

    //Computed property (cache)
    computed: {
    calcolaPrezzo(){
        if(this.prodotto.priority){
            return "[Prioritario]" + this.prodotto.prezzo*1.22;
        }
        return this.prodotto.prezzo;
    }
    }
})















const app = new Vue({
    el: "#app",
    data: {
        products: [{
            id:123,
            name:"Pasta",
            priority: true,
            qta:0,
            prezzo: 2
        },
        {
            id:456,
            name:"Acqua",
            priority: false,
            qta:0,
            prezzo: 1
        },
        {
            id:789,
            name:"Sugo",
            priority: true,
            qta:0,
            prezzo: 3
        }],
        title: "Lista della spesa",
        click:0,
        parolaDaInvertire: "Hello World!",
        b2b: false
    },
    computed:{
        totaleElementi (){
            return this.products.length;
        },
        elementiNelCarrello (){
            return this.products.reduce((sum,item)=>{return sum+=item.qta},0);
        }        
    },
    methods:{
        addClick: function(){
            this.click+=1;
        },
        inverti (){this.parolaDaInvertire = this.parolaDaInvertire.split('').reverse().join('');},
        nullo (){}
    }
});

