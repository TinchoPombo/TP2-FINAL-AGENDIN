interface Dao<E,K> {

    add: (Element : E) => Promise<E>;

    getAll: () => Promise<Array<E>>;

    get: (Clave : K) => Promise<E>;

    delete: (Clave : K) => Promise<boolean>;

}

export default Dao;