const Sequelize = require('sequelize')
module.exports = class Member extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            name: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'Member',
            tableName: 'member',
            paranoid: true, // 소프트삭제 (deleteAt 자동 생성)
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Member.hasMany(db.Board, {
         foriegnKey: 'member_id',
         sourceKey: 'id',
      })
   }
}
