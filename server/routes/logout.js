import express from 'express';

const router = express.Router();

router.post('/logout', (req, res) => {
    // Aquí implementarás la lógica de cierre de sesión
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).send('Error al cerrar sesión');
        } else {
            res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión
        }
    });
});

export default router;
