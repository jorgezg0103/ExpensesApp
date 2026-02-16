const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Expense = sequelize.define("Expense", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	amount: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
}, {
	timestamps: true,
});

User.hasMany(Expense, { foreignKey: "userId", onDelete: "CASCADE" });
Expense.belongsTo(User, { foreignKey: "userId" });

module.exports = Expense;
