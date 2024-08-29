export const getDbConnectionString = (): string => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

  if (DB_USER && DB_PASSWORD && DB_HOST && DB_NAME) {
    // return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
    return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;
  } else if (DB_HOST && DB_PORT && DB_NAME) {
    return `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  } else {
    throw new Error(
      "Database connection parameters are missing or incomplete."
    );
  }
};
