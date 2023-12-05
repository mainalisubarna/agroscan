import PropagateLoader from "react-spinners/PropagateLoader";
import { useSelector } from 'react-redux';
const Loader = () => {
    const override = {
        display: "block",
        margin: "40vh 50vw",
        borderColor: "red",
    };
    const isLoading = useSelector((state) => state.isLoading)
    return (
        <PropagateLoader
            color="hsla(134, 70%, 47%, 1)"
            size={25}
            loading={isLoading}
            cssOverride={override}
        />
    );
}
export default Loader;