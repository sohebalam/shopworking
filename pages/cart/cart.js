import Head from "next/Head"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../store/GlobalState"
import Image from "next/image"
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"
import CartItem from "../../components/CartItem"
import { getData } from "../../utils/fetchData"
import { Alert } from "@material-ui/lab"
import CheckOutSteps from "../../components/CheckOutSteps"
const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  console.log(auth)

  const [total, setTotal] = useState(0)

  // useEffect(() => {
  //   const cartLocal = JSON.parse(localStorage.getItem("cart_constant"))
  //   // if (cartlocal && cartLocal.length > 0) {
  //   const updateCart = () => {
  //     for (const item of cartLocal) {
  //       if (item.quantity > 1) {
  //         console.log("only one")
  //         return (
  //           <>
  //             <Alert severity="warning">
  //               Only one course will be added to your profile
  //             </Alert>
  //           </>
  //         )
  //       }
  //     }
  //   }
  //   updateCart()
  // }, [cart])

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity
      }, 0)

      setTotal(res)
    }
    getTotal()
  }, [cart])

  if (cart.length === 0)
    return (
      <>
        <h2>Your cart is empty</h2>
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Image src="/emptycart.png" width="800rem" height="500rem" />
        </Container>
      </>
    )
  return (
    <div>
      <Head>
        <title>Cart Page</title>
      </Head>
      <Typography variant="h3" component="h3">
        Cart{" "}
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom="1.5rem">
        <CheckOutSteps step1 />
      </Box>
      <Grid container>
        <Grid item xs={9}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {/* <Box marginLeft="5rem">Image</Box> */}
                </TableCell>
                <TableCell size="small">Course Title</TableCell>
                <TableCell size="small">
                  <Box marginLeft="2.5rem">Quantity</Box>
                  {/* <Button></Button> */}
                </TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Remove</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableCell> */}
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  dispatch={dispatch}
                  cart={cart}
                />
              ))}
              {/* </TableCell> */}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={3}>
          <Card align="center" style={{ marginTop: "5rem" }}>
            <Link
              href={auth.user ? "/cart/address" : "/auth/login"}
              underline="none"
            >
              <Button
                variant="contained"
                fullWidth
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                Proceed to payment
              </Button>
              <h2>Total: £{total}</h2>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cart
