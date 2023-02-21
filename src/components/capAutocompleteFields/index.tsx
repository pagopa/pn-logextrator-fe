import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {FieldsProps} from "../formFields/FormFields";
import {retrieveCaps} from "../../api/paperChannelApi";

const filter = createFilterOptions<string>();


type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  value: string[];
  required: boolean;
  error: boolean;
  onChange: any
}

export function CapAutocompleteField(props:Props){
  const [inputText, setInputText] = useState("");
  const [cap, setCap] = useState<string[]>([]);

  const fetch = useCallback(()=>{
    retrieveCaps(inputText, (caps) =>{
      setCap(caps.map(item => item.cap))
    } , (e) => {
      console.error("Error with caps request ", e);
    })
  }, [inputText])

  useEffect(() => {
    fetch();
  }, [fetch])

  const handleOnChange = (event: React.SyntheticEvent, value: string[]) => {
    props.onChange?.(value);
  }


  return <Autocomplete
    multiple
    id="caps-autocomplete"
    options={cap}
    value={props.value}
    fullWidth={true}
    limitTags={3}
    onInputChange={(event, newInputValue) => {
      setInputText(newInputValue);
    }}
    onChange={handleOnChange}
    getOptionLabel={(option) => option}
    filterOptions={(options, params) => {
      const filtered = filter(options, params);

      const { inputValue } = params;
      // Suggest the creation of a new value
      const isExisting = options.some((option) => inputValue === option);
      if (inputValue !== '' && !isExisting) {
        filtered.push(inputValue);
      }

      return filtered;
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label={props.field.label}
        placeholder={props.field.placeholder}
      />
    )}
  />
}