import { useRef } from "react";

function useComponentWillMount(fn) {
    var willMount = useRef(true);

    if (willMount.current) {
        fn();
    }

    willMount.current = false;
}

export { useComponentWillMount };
