import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Container } from "@material-ui/core"
import Notify from "./Notify"

const Layout = ({ children }) => {
  return (
    <Container>
      <NavBar />
      <Notify />
      {children}
      <Footer />
    </Container>
  )
}

export default Layout
