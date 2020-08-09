new Vue({
    el: "#app",
    data: {
        playerLife: 100,
        monsterLife: 100,
        running: false,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0;
        },
        win() {
            return this.playerLife != 0 && this.monsterLife == 0;
        }
    },
    methods: {
        start() {
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = []
        },
        giveUp() {
            this.running = false;
        },
        attack(special){
           this.hurt("playerLife", 5, 13, false, "Player", "Monster", "player");
           if(this.monsterLife > 0){
               this.hurt("monsterLife", 5, 13, false, "Monster", "Player", "monster");
           }
        },
        hurt(who, min, max, special, source, target, clazz) {
            const plus = special ? 5 : 0;
            const hurt = this.getRandom(min + plus, max + plus);
            this[who] = Math.max(this[who] - hurt, 0);
            this.log(`${source} hit ${target} with ${hurt}`, clazz);
        },
        getRandom(min, max) {
            const value = Math.random() * (max-min) + min;
            return Math.round(value);
        },
        healAndHurt() {
            this.heal(10,15);
            this.hurt("playerLife", 7, 12, false, "Monster", "Player", "monster");
        },
        heal(min, max){
            const heal = this.getRandom(min, max);
            this.playerLife = Math.min(this.playerLife + heal, 100);
            this.log(`Player won power of ${heal}`, "player");
        },
        log(text, clazz){
            this.logs.unshift({text, clazz});
        }
    },
    watch: {
        hasResult(value) {
            if(value){
                this.running = false
            }
        }
    }
});