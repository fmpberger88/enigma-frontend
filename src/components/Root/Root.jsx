import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer.jsx";


const Root = () => {
    return (
        <>
            <main>
                <h1>Hello World!</h1>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Root;