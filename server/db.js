import mysql from "mysql2/promise";

// Conexión DB
async function connectDB() {
    const conn = await mysql.createConnection({
        user: 'freedb_enoc-falcon',
        password: '#4GKvUM&fzeCE9u',
        host: 'sql.freedb.tech',
        port: '3306',
        database: 'freedb_chile-vending',
        ssl: {
            rejectUnauthorized: false
        }
    });

    return conn;
}

// Consultas
async function queryRecentP() {
    const conn = await connectDB();
    const [rows, fields] = await conn.query('SELECT * FROM PUBLICACION WHERE FECHA_PUBLICACION = (SELECT MAX(FECHA_PUBLICACION) FROM PUBLICACION);');
    conn.end();
    return rows;
}

async function queryDB(table, condicion = false) {
    const conn = await connectDB();
    if (condicion === false) {
        const [rows, fields] = await conn.query(`SELECT * FROM ${table};`);
        conn.end();
        return rows;
    } else {
        const [rows, fields] = await conn.query(`SELECT * FROM ${table} WHERE ${condicion};`);
        conn.end();
        return rows;
    }
}

// Visualización Caracteristicas DB
async function queryColumns(table) {
    const conn = await connectDB();
    const [rows, fields] = await conn.execute(`SHOW COLUMNS FROM ${table};`);
    conn.end();
    return rows.map(row => row.Field);
}

async function queryTables() {
    const conn = await connectDB();
    const [rows, fields] = await conn.query('SHOW TABLES;');
    conn.end();
    return rows.map(row => row.Tables_in_vendingdb);
}

async function db(tables) {
    let db = [];
    for (let i = 0; i < tables.length; i++) {
        let campos = await queryColumns(tables[i]);
        db.push(campos);
    }
    return db;
}

// Operaciones Genericas
async function getPrimaryKey(table) {
    const conn = await connectDB();
    const [rows, column] = await conn.query(`SHOW KEYS FROM ${table} WHERE Key_name = 'PRIMARY';`);
    conn.end();
    return rows.map(row => row.Column_name)[0];
}

async function deleteDB(id, table, campo) {
    const conn = await connectDB();
    await conn.execute(`DELETE FROM ${table} WHERE ${campo} = ?;`, [id]);
    conn.end();
}

async function updateDB(id, table, campos, datos) {
    const conn = await connectDB();
    const KEY = await getPrimaryKey(table);
    for (let i = 0; i < campos.length; i++) {
        await conn.execute(`UPDATE ${table} SET ${campos[i]} = ? WHERE ${KEY} = ?;`, [datos[i], id]);
    }
    conn.end();
}

export {
    connectDB,
    queryRecentP,
    queryDB,
    queryColumns,
    queryTables,
    db,
    deleteDB,
    getPrimaryKey,
    updateDB
};
