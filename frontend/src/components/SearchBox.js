import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="searchRecipe"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Busque una receta..."
        className="sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2"><i className="fas fa-search"></i>
        {" "}
        Buscar
      </Button>
    </Form>
  );
};

export default SearchBox;
