/**
 * Created by Monyk on 05.11.2016.
 */
import * as Sequelize from 'sequelize'

const db : Sequelize.Sequelize = new Sequelize('mysql://root:root@db/mcreactor', {
    dialectOptions: {
        multipleStatements: true
    }
})

export default db
