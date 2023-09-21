/* Funçoes com o banco de dados:
    Pegar todas as tasks do BD,
    Adicionar tasks no BD,
    Atualizar o BD,
    Deletar tasks no BD.
 */
import { Model, DataTypes } from "sequelize";
import { sequelize } from '../instances/mysql';

export interface TasksInstance extends Model {
    id: number,
    title: string,
    status: string,
    created_at: string
}

export const Task = sequelize.define<TasksInstance>("Task",{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type:DataTypes.STRING
    },
    status: {
        type:DataTypes.STRING
    },
    created_at: {
        type:DataTypes.STRING
    }
}, {
    tableName: 'tasks',
    timestamps: false
});
