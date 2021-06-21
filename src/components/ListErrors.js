import React from "react";

function ListErrors({ errors }) {
    if (errors) {
        return (
            <ul className="error-list">
                {Object.keys(errors).map((key) => {
                    return <li key={key}>{errors[key]}</li>;
                })}
            </ul>
        );
    } else {
        return null;
    }
}

export default ListErrors;
