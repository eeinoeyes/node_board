const Sequelize = require('sequelize')
module.exports = class Board extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            img: { type: Sequelize.STRING(255) },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'post',
            tableName: 'posts',
            paranoid: true, // 소프트삭제 (deleteAt 자동 생성)
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Board.belongsTo(db.Member, {
         foreignKey: 'member_id',
         targetKey: 'id',
      })
   }
}
