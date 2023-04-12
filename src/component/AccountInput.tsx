/** @jsxImportSource @emotion/react */
import React, { useState, HTMLAttributes } from "react";
import { useBase } from "./withBase";

interface AccountInputProps {
  value?: string;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onClickHandler?(e: React.MouseEvent): void;
  onKeyDownHandler?(e: React.KeyboardEvent): void;
  label?: string; autocomplete?: string;
  inputmode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  descriptionId?: string;
  description?: string;
  pattern?: string;
  error?: string;
  maxLength?: number;
  required?: string;
  masked?: string;
  wrap?: boolean;
  autoFocus?: boolean;
}

const AccountInput = (props: AccountInputProps): JSX.Element => {
  const [type, setType] = useState(props.type);

  function shouldShow(e: React.MouseEvent): void {
    e.preventDefault();
    if (type === "password") {
      setType("text");
    } else {
      setType(props.type);
    }
  }

  const required = props.required == null ? false : true;

  const  { style } = useBase();

  return (
    <div style={{ marginTop: style?.spacing_unit }}>
      {props.label ? (
        <div
          style={{
            marginBottom: 6
          }}
        >
          <label htmlFor={props.id} style={{ fontWeight: 700, whiteSpace: !props.wrap ? "nowrap" : undefined }}>{props.label}</label>
        </div>
      ) : null}
      <div>
        <input
          id={props.id}
          name={props.name}
          aria-describedby="basic-addon2"
          type={type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onKeyDown={props.onKeyDownHandler}
          autoComplete={props.autocomplete}
          inputMode={props.inputmode}
          pattern={props.pattern}
          maxLength={props.maxLength}
          required={required}
          value={props.value}
          autoFocus={props.autoFocus}
          style={{
            padding: '0.7rem',
            boxSizing: 'border-box',
            width: '100%',
            borderColor: style?.primary_color || '',
            borderRadius: style?.border_radius || '',
            borderStyle: 'solid',
            borderWidth: '1px',
          }}
        />
        {props.type === "password" ? <span className="input-group-append">
          {/* <button className="btn btn-secondary" onClick={shouldShow}><EyeIcon /></button>  */}
        </span> : null}
        {props.error ? <div className="invalid-feedback" id={`${props.id}-error`} style={{ display: "block" }}>{props.error}</div> : null}
      </div>
      {props.description ? <small id={props.descriptionId} className="form-text text-muted">{props.description}</small> : null}
    </div>
  );
};


export default AccountInput