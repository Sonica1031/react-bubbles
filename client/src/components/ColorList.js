import React, { useState, useEffect } from "react";
import axiosWithAuth from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const addedColor = {
  color: "",
  code: {hex: ""}
}

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(addedColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(res.data);
      })
      .catch(err =>{
        console.log(err);
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      updateColors(res.data)
    })
    .catch(err =>{
      console.log(err);
    })
  };
  const addColor =() =>{
    axiosWithAuth()
    .post('http://localhost:5000/api/colors', colorToAdd)
    .then(res =>{
      updateColors(res.data)
    })
    .catch(err =>{
      console.log(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={saveEdit}>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form>
        <input
        type="text"
        placeholder="enter color name"
        onChange={e => {setColorToAdd({...colorToAdd, color: e.target.value})}}
        />
        <input
        type="text"
        placeholder="enterhex code"
        onChange={e => {setColorToAdd({...colorToAdd, code:{ hex: e.target.value}})}}
        />
        <button onClick={addColor}>Dont Forget The Button</button>
      </form>
    </div>
  );
};

export default ColorList;
