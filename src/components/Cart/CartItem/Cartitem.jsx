import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();

  const handleUpdateCartQty = (lineItemId, newQuantity) =>
    onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <Card className="cart-item h-100 w-100 position-relative">
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={`${classes.cardContent} `}>
        <div className="mb-4 ">
          <Typography className="fs-4" variant="h4">
            {item.name}
          </Typography>
          <Typography className="fs-5" variant="h5">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </div>
        {/* <div className="position-absolute bottom-0 end-0 mt-3"> */}

        <CardActions className={`${classes.cardActions} pt-3  `}>
          <div
            className={`${classes.buttons} position-absolute bottom-0 start-0 mt-3 pb-3`}
          >
            <Button
              type="button"
              size="small"
              onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <div className="position-absolute bottom-0 end-0 mt-3 pb-3 ps-2 me-2">
            <Button
              variant="contained"
              type="button"
              color="secondary"
              onClick={() => onRemoveFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CartItem;
