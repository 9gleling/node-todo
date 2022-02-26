import { database } from '../../libs/database';
export default class Dao {
  tableName = 'Tb_Todo';
  constructor () {
    try {
      let result = database.prepare(`SELECT * FROM ${this.tableName}`).all();
    } catch (e) {
      /** 테이블 존재하지 않음 **/
      this.createTable();
    }
  }

  createTable = () => {
    let sql = `DROP TABLE IF EXISTS ${this.tableName};`;
    database.exec(sql);
    sql = `CREATE TABLE IF NOT EXISTS Tb_Todo (
      id integer primary key autoincrement
      , UUID varchar(100) NOT NULL
      , title varchar(100) NOT NULL
      , content text NOT NULL
      , created_dt TIMESTAMP
      , status integer NOT NULL DEFAULT 1
    )`;
    database.exec(sql);
  }

  insertTodo = (vo) => {
    const queue = database.prepare(`
      INSERT INTO ${this.tableName} 
      (UUID, title, content, created_dt, status) 
      VALUES 
      (?,?,?,datetime('now', 'localtime'),1)
    `);

    let result = queue.run(vo.UUID, vo.title, vo.content);

    return result;
  }

  updateTodo = (vo) => {
    const queue = database.prepare(`
      UPDATE ${this.tableName} SET 
      status = ?
      WHERE id = ?
      and UUID = ?
    `);

    let result = queue.run(vo.status, vo.todoId, vo.UUID);

    return result;
  }

  deleteTodo = (vo) => {
    const queue = database.prepare(`
      DELETE FROM ${this.tableName} 
      WHERE id = ?
      AND UUID = ?
    `);

    let result = queue.run(vo.todoId, vo.UUID);

    return result;
  }

  findTodoByTodoId = (vo) => {
    let queue = database.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?;`);
    let result = queue.get(vo.todoId);

    return result;
  }

  findTodoListByUUID = (vo) => {
    let queue = database.prepare(`
      SELECT id, title, content, 
        (case 
          when status = '1' 
            then '진행중'
          when status = '2'
            then '완료'
          else 
            '보류'
        end) as status
      FROM ${this.tableName} 
      WHERE UUID = ?;
    `);
    let result = queue.all(vo.UUID);

    return result;
  }
}
