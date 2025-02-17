import routerCultivos from '../controllers/cultivos/cultivos';
import routerInvernaderos from '../controllers/invernaderos/invernaderos'

export default function routes (app: any) {
    app.use('/cultivos', routerCultivos)
    app.use('/invernaderos', routerInvernaderos)
}

