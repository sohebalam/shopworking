import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  List,
  ListItem,
  Container,
} from "@material-ui/core/"
import Link from "next/link"
// import Likes from "./Likes"

import { DataContext } from "../store/GlobalState"
import { useContext } from "react"
import { addToCart } from "../store/Actions"

const useStyles = makeStyles({
  root: {
    height: 200,
  },
})

const ProductCard = ({ product }) => {
  const submitHandler = (e) => {}
  const classes = useStyles()
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state
  return (
    <>
      <Card style={{ height: "100%", padding: "0.75rem" }}>
        <Link href={`/product/${product._id}`}>
          {/* <Container> */}
          <CardActionArea>
            <CardMedia
              className={classes.root}
              image={product.selectedFile}
              title={product.title}
            />
            <CardHeader title={product.title} subheader={product.description} />
          </CardActionArea>
        </Link>
        <List>
          <ListItem>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "0.8rem" }}
              onClick={() => dispatch(addToCart(product, cart))}
            >
              {/* <Link
                href={`/product/${product._id}`}
                style={{ color: "white" }}
                underline="none"
              > */}
              Buy Now
              {/* </Link> */}
            </Button>
            <Typography
              style={{ color: "black", marginLeft: "0.5rem" }}
              variant="h5"
            >
              £{product.price}
            </Typography>

            {/* <Button onClick={submitHandler} disabled={!user}>
              <Likes product={product} />
            </Button> */}
          </ListItem>
        </List>
        {/* </Container> */}
      </Card>
    </>
  )
}

export default ProductCard
