import React, { useState, useContext, useEffect } from "react"
// import Message from "../components/Message"
import { Grid, Button, Link, CircularProgress } from "@material-ui/core"
// import { useDispatch, useSelector } from "react-redux"
// import { login } from "../actions/userActions"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { DataContext } from "../../store/GlobalState"
import Cookie from "js-cookie"
import { postData } from "../../utils/fetchData"
import { useRouter } from "next/router"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state
  const submitHandler = async (e) => {
    e.preventDefault()

    console.log(email, password)

    dispatch({ type: "NOTIFY", payload: { loading: true } })

    const userData = { email, password }

    const res = await postData("auth/login", userData)
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } })
    dispatch({ type: "NOTIFY", payload: { success: res.message } })

    dispatch({
      type: "AUTH",
      payload: { token: res.access_token, user: res.user },
    })
    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    })
    localStorage.setItem("firstLogin", true)
  }

  const classes = useStyles()
  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push("/")
    }
  }, [auth])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={`/auth/register`} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
export default Login
