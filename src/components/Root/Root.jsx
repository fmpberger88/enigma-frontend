import {Outlet} from "react-router-dom";


const Root = () => {
    return (
        <>
            <main>
                <h1>Hello World!</h1>
                <Outlet />
            </main>
        </>
    )
}

export default Root;