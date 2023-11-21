import React from "react";
import { Input, TextInput } from '@mantine/core';

const Registration = () =>{
    // Incorrect usage, input is not accessible
    function Incorrect() {
        return (
        <Input.Wrapper label="Input label">
            <Input />
        </Input.Wrapper>
        );
    }
    
    // Use TextInput instead of Input everywhere you want to use Input,
    // it is accessible by default and includes Input.Wrapper
    function Correct() {
        return <TextInput label="Input label" description="Input description" />;
    }
  

    return(
        <div className="registration">
            <Input placeholder="Input component" />
        </div>

    )
};
export default Registration;