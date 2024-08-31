import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import {MainContainer} from "../../styles.jsx";


const Root = () => {
    return (
        <>
            <Header />
            <MainContainer>
                <Dashboard />
            </MainContainer>
            <Footer />
        </>
    )
}

export default Root;