import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // verifica e recupera as infos do token promissificando a função jwt.verify
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Recupera o id do usuário que está no token e adiciona no corpo da requisição
    // Essa informação será usada pelo endpoint
    req.userId = decoded.id;

    return next();
  } catch (error) {
    // ...
  }

  return next();
};
