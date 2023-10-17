const {Op, Model, DataTypes, Sequelize} = require('sequelize');
const sequelize = require('./models');  

class mainModel {
    constructor(model_name=""){
        this.models = sequelize[model_name];
        // console.log("this.models = " + sequelize["Jadwal_Kelas"]);
        // console.log(sequelize[model_name]);
    }

    get({where={}}){
        return this.models.findOne({
            where:where,
            // attributes:attr
        },{
            sequelize
        })
    }

    getAllInclude({ where = {}, include = {}, attributes = [] }) {
        return this.models.findAll({
          where: where,
          include: include,
          attributes: attributes
        },{
            sequelize
        })
    }

    getAllWhere({ where = {}}) {
        return this.models.findAll({
          where: where,
        },{
            sequelize
        })
    }

    getAll() {
        return this.models.findAll({
        },{
            sequelize
        })
    }

    getAllJustInclude({ include = {}, attributes = [] }) {
        return this.models.findAll({
            include: include,
            attributes: attributes
        },{
            sequelize
        })
    }

    post(data){
        return this.models.create(data,{
            fields:Object.keys(data)
        })
    }

    bulkPost(data){
        return this.models.bulkCreate(data)
    }

    patch(data, where){
        return this.models.update(data, {
            where:where,
            //fields:Object.keys(data)
        })
    }

    delete(where){
        return this.models.destroy({
            where:where
        })
    }
}

module.exports = mainModel;