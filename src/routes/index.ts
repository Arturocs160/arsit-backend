import routerCultivos from '../controllers/cultivos/cultivos';
import routerInvernaderos from '../controllers/invernaderos/invernaderos'
import routerIA from '../controllers/generateMessage/generateMessage';

export default function routes (app: any) {
    app.use('/cultivos', routerCultivos)
    app.use('/invernaderos', routerInvernaderos)
    app.use('/chatbot', routerIA)
}

