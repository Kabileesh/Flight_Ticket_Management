import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const DaySelector = (props) => {
  const selectHandler = () => {
    props.onButtonSelect(props.value);
  };

  return (
    <div>
      <FormGroup
        check
        inline
        style={{ display: "flex", alignItems: "center", marginRight: "10px" }}
      >
        <Input type="checkbox" value={props.value} onClick={selectHandler} />
        <Label check>{props.title}</Label>
      </FormGroup>
    </div>
  );
};

export default DaySelector;
