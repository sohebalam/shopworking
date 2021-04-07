import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Container } from "@material-ui/core"

const Layout = ({ children }) => {
  return (
    <Container>
      <NavBar />
      {children}
      <Footer />
    </Container>
  )
}

export default Layout
