class Database {
    constructor(){
        localStorage.setItem('db', JSON.stringify({}));
    }
    #read(){
        return JSON.parse(localStorage.getItem('db'));
    }
    #write(data){
        localStorage.setItem('db', JSON.stringify(data));
    }
    get(key){
        return this.#read()[key];
    }
    set(key, value){
        let data = this.#read();
        data[key] = value;
        this.#write(data);
    }
}

let db = new Database();
db.set('game', false);
db.set('pause', false);
export default db;