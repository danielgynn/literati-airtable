const hostname = process.env.NODE_ENV;
export const API_ROOT = hostname === "development" ? "http://localhost:8080/api" : "/api";

export const API = {
    books: {
        getAll: `${API_ROOT}/books`
    }
};
