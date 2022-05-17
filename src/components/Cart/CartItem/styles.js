import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow:"row wrap"
  },
  cartActions: {
    justifyContent: 'space-between',
    flexFlow:"row wrap",
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  
  },
}));