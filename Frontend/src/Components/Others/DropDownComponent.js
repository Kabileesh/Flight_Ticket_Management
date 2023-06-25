import React from "react";

import { Input } from "reactstrap";
const DropDownBox = (props) => {
  return (
    <Input type="select" onChange={(e) => props.onSelect(e.target.value)} defaultValue={props.detailList[0]}>
      {props.detailList &&
        props.detailList.map((detail) => (
          <option value={detail}>{detail}</option>
        ))}
    </Input>
  );
};

export default DropDownBox;
