import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
// import logo from "../image/v3.jpg"
// import logo from "../image/v3.png"
import Image from "next/image"
import { Button, Typography, Link, Box } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import AssignmentIcon from "@material-ui/icons/Assignment"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { DataContext } from "../store/GlobalState"
import Cookie from "js-cookie"
import Badge from "@material-ui/core/Badge"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function NavBar() {
  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state
  const classes = useStyles()
  const registerHandler = () => {}
  const logoutHandler = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" })
    localStorage.removeItem("firstLogin")
    dispatch({ type: "AUTH", payload: {} })
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } })
  }
  const loginHandler = () => {}

  return (
    <div>
      {/* <Container> */}
      <AppBar position="static" style={{ color: "primary" }}>
        <Toolbar>
          <IconButton>
            <Image src="/v3.png" alt="me" width="45" height="45" />
            {/* <img src="../public/v3.png" /> */}
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            OpenFreeUni
          </Typography>
          <>
            {Object.keys(auth).length ? (
              <>
                <Box
                  style={{
                    marginRight: "0.75rem",
                    marginLeft: "0.75rem",
                    marginTop: "0.75",
                  }}
                >
                  <Typography style={{ marginTop: "0.25rem" }}>
                    {" "}
                    Hello {auth.user?.firstName} {auth.user?.lastName}
                  </Typography>
                </Box>
                <Box
                  style={{
                    marginTop: "0.25rem",
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                  }}
                >
                  <Link style={{ color: "white" }} href="/cart">
                    <Button
                      color="inherit"
                      onClick={logoutHandler}
                      style={{ marginRight: "0.5rem" }}
                    >
                      <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        style={{ marginRight: "0.3rem" }}
                      >
                        <ShoppingCartIcon />
                      </Badge>
                      Cart
                    </Button>
                  </Link>
                  {/* <Link style={{ color: "white" }} href="/login"> */}
                  <Button
                    color="inherit"
                    onClick={logoutHandler}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <ExitToAppIcon style={{ marginRight: "0.25rem" }} />
                    LogOut
                  </Button>
                  {/* </Link> */}
                </Box>
              </>
            ) : (
              <>
                {" "}
                <Link style={{ color: "white" }} href="/auth/register">
                  <Button color="inherit" onClick={registerHandler}>
                    <AssignmentIcon style={{ marginRight: "0.25rem" }} />
                    Register
                  </Button>
                </Link>
                <Link style={{ color: "white" }} href="/auth/login">
                  <Button color="inherit" onClick={loginHandler}>
                    <PersonIcon style={{ marginRight: "0.25rem" }} />
                    Login
                  </Button>
                </Link>
              </>
            )}
          </>
        </Toolbar>
      </AppBar>
      {/* </Container> */}
    </div>
  )
}
