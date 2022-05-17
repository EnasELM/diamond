import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  console.log(product);

  return (
    <Card className={`${classes.root} position-relative`}>
      <div>
        <CardContent>
          <CardMedia
            className={classes.media}
            image={product.image.url}
            title={product.name}
          />
          <div className={`${classes.cardContent} mt-3`}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body-2"
            color="textSecondary"
          />
          <div className="position-absolute bottom-0 end-0">
            <CardActions className={`${classes.cardActions} `}>
              <IconButton
                aria-label="Add to Cart"
                onClick={() => onAddToCart(product.id, 1)}
              >
                <AddShoppingCart />
              </IconButton>
            </CardActions>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Product;
