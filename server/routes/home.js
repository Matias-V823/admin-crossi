import express from 'express';
import db from '../db';
import moment from 'moment';

const router = express.Router();

import registro from './registro';
import login from '../routes copy/login';
import logout from './logout';
import { isLoggedIn } from '../middleware/auth';

router.get('/', (req, res) => {
    res.redirect('/Home');
});

router.get('/Home', async (req, res) => {
    const recentPublications = await db.queryDB('PUBLICACIONES');
    
    const DATA_RECENT = {
        RECENT_FECHA_P: recentPublications.map(publication => moment(publication.FECHA_PUBLICACION).format('DD/MM/YYYY')),
        RECENT_CONTENIDO_P: recentPublications.map(publication => publication.CONTENIDO),
        RECENT_TITULO_P: recentPublications.map(publication => publication.TITULO)
    };

    res.render('index', DATA_RECENT);
});

router.get('/Blog', async (req, res) => {
    const result = await db.queryDB('PUBLICACIONES');
    const recent = await db.queryRecentP();
    
    const DATA_PUBLICACION = {
        ID_PUBLICACION: result.map(result => result.ID_PUBLICACION),
        FECHA_PUBLICACION: result.map(result => moment(result.FECHA_PUBLICACION).format('DD/MM/YYYY')),
        CONTENIDO_PUBLICACION: result.map(result => result.CONTENIDO),
        TITULO_PUBLICACION: result.map(result => result.TITULO),
        RECENT_ID_P: recent.map(recent => recent.ID_PUBLICACION),
        RECENT_FECHA_P: recent.map(recent => moment(recent.FECHA_PUBLICACION).format('DD/MM/YYYY')),
        RECENT_CONTENIDO_P: recent.map(recent => recent.CONTENIDO),
        RECENT_TITULO_P: recent.map(recent => recent.TITULO)
    };

    res.render('blog', DATA_PUBLICACION);
});

router.get('/post', (req, res) => {
    res.render('publicacion');
});

router.get('/Contacto', (req, res) => {
    res.render('contacto');
});

router.get('/Maquinas', (req, res) => {
    res.render('maquinas');
});

router.get('/Us', (req, res) => {
    res.render('quienes_somos');
});

router.get('/Servicios', (req, res) => {
    res.render('servicios');
});

router.get('/AdminUsers', isLoggedIn, (req, res) => {
    res.render('vista_admin');
});

router.get('/Consultas', async (req, res) => {
    const result = await db.queryDB('CONTACTOS');
    const tables = await db.queryTables();

    const DATA = {
        ID_CONTACTO: result.map(result => result.ID_CONTACTO),
        NOMBRE_CONTACTO: result.map(result => result.NOMBRE),
        APELLIDO_CONTACTO: result.map(result => result.APELLIDO),
        EMAIL_CONTACTO: result.map(result => result.EMAIL),
        TELEFONO_CONTACTO: result.map(result => result.TELEFONO),
        CONSULTA_CONTACTO: result.map(result => result.CONSULTA)
    };

    DATA.TABLES = tables;
    DATA.CAMPOS = await db.db(DATA.TABLES);
    res.render('consultas', DATA);
});

router.get('/AdminPost', async (req, res) => {
    const posts = await db.queryDB('PUBLICACIONES');
    
    const DATA = {
        ID_PUBLICACION: posts.map(posts => posts.ID_PUBLICACION),
        FECHA_PUBLICACION: posts.map(posts => moment(posts.FECHA_PUBLICACION).format('DD/MM/YYYY')),
        CONTENIDO_PUBLICACION: posts.map(posts => posts.CONTENIDO),
        TITULO_PUBLICACION: posts.map(posts => posts.TITULO)
    };

    res.render('adminPost', DATA);
});

router.post('/eliminar/:objeto', async (req, res) => {
    const identificador = await db.getPrimaryKey(req.params.objeto);
    await db.deleteDB(req.body.idDelete, req.params.objeto, identificador);
    res.redirect('/AdminPost');
});

router.get('/actualizar/:objeto', async (req, res) => {
    const campos = await db.queryColumns(req.params.objeto);
    const KEY = await db.getPrimaryKey(req.params.objeto);
    const contenido = await db.queryDB(req.params.objeto, `${KEY} = ${req.query.idUpdate};`);
    const { [KEY]: _, ...filtrado } = Object.values(contenido)[0];
    
    const DATA = {
        KEY: [KEY, req.params.objeto, req.query.idUpdate],
        CAMPOS: campos.filter(elem => elem !== KEY),
        CONTENIDO: Object.values(filtrado)
    };

    res.render('update', DATA);
});

router.get('/registro', registro);
router.post('/registro', registro);
router.get('/login', login);
router.post('/login', login);
router.post('/logout', logout);

export default router;
