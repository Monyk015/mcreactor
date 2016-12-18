/**
 * Created by Monyk on 06.11.2016.
 */
import db from '../config/db'
import * as Sequelize from "sequelize";

export interface CommentaryRateAttribute {
    id?: number
    rate: number
}

export interface CommentaryRateInstance extends Sequelize.Instance<CommentaryRateAttribute>, CommentaryRateAttribute
{ }

export interface CommentaryRateModel extends Sequelize.Model<CommentaryRateInstance, CommentaryRateAttribute>
{ }

const CommentaryRate: CommentaryRateModel = db.define<CommentaryRateInstance, CommentaryRateAttribute>("CommentaryRate", {
    rate: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
    }
}, {
        timestamps: true
})


export default CommentaryRate
