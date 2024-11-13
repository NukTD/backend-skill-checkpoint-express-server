// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres:9236_Thanate@localhost:5432/Question-Answer-webpost",
});

export default connectionPool;
