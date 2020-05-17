import React, { useReducer, useContext, useEffect } from "react";
import request from "./mock";

const store = {
  user: null,
  books: null,
  movies: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.user };
    case "setBooks":
      return { ...state, books: action.books };
    case "setMovies":
      return { ...state, movies: action.movies };
    default:
      throw new Error("invalid type: " + action.type);
  }
};

const Context = React.createContext(null);

export default function App() {
  // useReducer只能执行在函数中
  const [state, dispatch] = useReducer(reducer, store);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <User />
      <hr />
      <Books />
      <Movies />
    </Context.Provider>
  );
}

function User() {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    request("/user").then(user => dispatch({ type: "setUser", user }));
  }, []);
  console.log(state);
  return (
    <div>
      <h1>个人信息</h1>
      <div>name: {state.user ? state.user.name : ""}</div>
    </div>
  );
}

function Books() {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    request("/books").then(books => dispatch({ type: "setBooks", books }));
  }, []);
  return (
    <div>
      <h1>我的书籍</h1>
      <ol>
        {(state.books || []).map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ol>
    </div>
  );
}

function Movies() {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    request("/movies").then(movies => dispatch({ type: "setMovies", movies }));
  }, []);
  return (
    <div>
      <h1>我的电影</h1>
      <ol>
        {(state.movies || []).map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ol>
    </div>
  );
}
