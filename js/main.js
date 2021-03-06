
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
            default:function () { return {} }
        }
    },

    //component element must contain exactly ONE root element
    //per ricevere i dati di un componente esso emetterà un evento passando dei parametri, allo scattare di quell'evento il mi attuale componente farà qualcosa(cattura evento e lo gestice)
    template:`<div class="box-monitor monitor">
        <h4>{{titolo}}</h4>
        <div class="monitor-stato">{{stato}}</div>
        <div class="monitor-messaggio">{{messaggio}}</div>
        <div v-if="Object.keys(prodotto).length>1" >Prezzo: {{calcolaPrezzo}}</div>
        <button @click="addToRead">Letto</button><br>        
        <annotazione @annotazione-submitted="doSave"></annotazione>
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
    },

    //per permette la fuoriuscita delle informazioni e gestire l'interazione del componente si possono utilizzare gli eventi.
    //il componente dall'interno emette un evento e viene catturato dall'esterno nel dom dove vi è @nome evento sul componente. Ovvero cosa farà vue quando il componente lancia quell'evento?ci sarà un'altra funzione di più ampia visibilità che se ne occuperà

    methods:{
        addToRead(){
            console.log("letto");
            console.log("prodotto:",this.prodotto);
            //this.$emit("add-to-read");//emittitore senza parametri
            this.$emit("add-to-read", this.prodotto);
        },
        doSave(annotazioneReview1){
            console.log("Ricevuti i dati della form di annotazione-submitted\n", annotazioneReview1)
        }
    }
    
})


//form
//bindare il data di un componente con un campo form attraverso v-model, innesto dentro al componente monitor come annotazione
//usare lo specificatore prevent sull'evento di submit della form per evitare il cambio pagina di default del browser
//https://www.vuemastery.com/courses/intro-to-vue-js/forms/
//provare a ciclare con v-for l'array degli errori
Vue.component('annotazione', {
    template: `
    <div>
    <form @submit.prevent="onMySubmit">
    <br>
        <div>Commento</div>
        <input v-model="nometxt" placeholder="Nome..." required><br>
        <textarea v-model="commenttxt" placeholder="Commento..."></textarea>
        <label for="score">Punteggio: </label>
        <select v-model.number="rating" id="score">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        <div>
            <div v-if="this.error">
            <p>Errore: {{this.error}}</p>
            </div>
            <input type="submit" value="ANNOTA" />
        </div>
        
    </form>    
    </div>
        `,
    data(){
        return {
            nometxt: null,
            commenttxt: null,
            rating:null,
            error:null  //pensare a questo come un array
        }
    },
    methods : {
        onMySubmit() {
            //qui gestione errori custom           
            if (this.rating && this.nometxt.length>=2){
                let annotazioneReview = {
                    nome: this.nometxt,
                    commento: this.commenttxt,
                    valutazione: this.rating 
                }
                //console.log(annotazioneReview);
                //faccio uscire i dati con un evento
                this.$emit("annotazione-submitted", annotazioneReview)
                this.nome="";
                this.commenttxt="";
                this.rating="";
                this.error=null;
            }else{
                this.error = "Nome valido e punteggio obbligatori" //usare il push se si intende un array di errori
            }
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
        nullo (){},
        hideMe(prod){
            console.log("Evento ricevuto dal componente");
            console.log(prod); //oggetto passato dall'evento
            alert("Letto il prodotto " + prod.name)
            
        }
    }
});

