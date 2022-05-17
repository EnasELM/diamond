import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import {Link, useNavigate} from "react-router-dom";
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';


const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    let navigate =  useNavigate();
    
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                setCheckoutToken(token);
            } catch (error) {
                navigate("/");
            }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = ( data ) => {
    setShippingData(data);  
console.log(data)
    nextStep();
    }

    const timeout = () => {
        setTimeout(()=> {
            setIsFinished(true)
        }, 1000);
    }

    let Confirmation = () => order.customer ?(
        <>
        <div>
          <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button" >Back to home</Button>
      </>
    ) : isFinished ? (
        <>
        <div>
            <Typography className='ms-3 mb-3'variant="h5">Thank you for your purchase!</Typography>
            <Divider className={classes.divider} />
         </div>
         <br />
       <Button className='ms-3 mb-3'component={Link} to="/" variant="outlined" type="button" >Back to home</Button>
        </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  
    if (error) {
      Confirmation = () => (
        <>
          <Typography className='ms-3' variant="h5">Thank you for your purchase!</Typography>
          <br />
          <Button className='mb-3 ms-3'component={ Link } to="/" variant="outlined" type="button" >Back to home</Button>
        </>
      );
    }
    const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm  shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />

    
  return (
   <>
   <CssBaseline />
   <div  className={classes.toolbar}/>
   <main className={classes.layout}>
       <Paper className={classes.layout}>
           <Typography variant="h4" align="center">Checkout</Typography>
           <Stepper activeStep={0} className={classes.stepper}>
                {steps.map((step)=> (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
           </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
         </Paper>
   </main>
   </>
  )
}

export default Checkout;