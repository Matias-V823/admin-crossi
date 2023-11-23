import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
    return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;
    next();
    } catch (error) {
    res.status(403).json({ message: 'Token inválido' });
    }
};
export default verificarToken;