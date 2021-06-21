import React from "react";

function FilterLink({ onClick, children, inProgress }) {
    return (
        <button
            onClick={onClick}
            disabled={inProgress}
            style={{
                marginLeft: "4px",
            }}
        >
            {children}
        </button>
    );
}

export default FilterLink;
