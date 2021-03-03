import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import SnackbarContext from '../contexts/SnackbarContext';
import LoadingContext from '../contexts/LoadingContext';
import { Link as RoutLink } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
 
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `url("https://i.pinimg.com/originals/9e/cf/3f/9ecf3fca683683997eca255fb266d9ab.jpg")`
},
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: "transparent",
    padding: theme.spacing(6),
  },
  header:{
    backgroundColor: "white",
    color: "black",
    boxShadow: "0px 0px 0px 0px"
  },
  center:{
    justifyContent: "center"
  },
  link:{
      marginRight: theme.spacing(2),
      marginTop: '-9px'
  },
  tollbar: {
    flexGrow: 1,
  },
  
}));


const cards = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Galery() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const { setLoading } = useContext(LoadingContext);
  const { setSnackbar } = useContext(SnackbarContext);
  const [data, setData] = useState([]);
  const [apiUrl,setUrl] = useState("https://api.thecatapi.com/v1/images/search?limit=8&page=10&order=Desc");
  const handleLoadMoreData = async (event) => {
    setLoading(true);
        try{
            const elements = await axios.get(apiUrl);
            setData(data.concat(elements.data));
        }catch(error){
            console.error(error);
            setSnackbar({
                open: true,
                message: "Błąd ładowania danych",
                type: "error"
            });
        }
        setLoading(false);
};
  useEffect(() => {
    async function fetchData(){
        setLoading(true);
        try{
            const elements = await axios.get(apiUrl);
            setData(elements.data);
        }catch(error){
            console.error(error);
            setSnackbar({
                open: true,
                message: "Błąd ładowania danych",
                type: "error"
            });
        }
        setLoading(false);
    }

    fetchData();
}, [setData, setLoading, setSnackbar]);
  return (
    <React.Fragment>
          <CssBaseline />
          <AppBar position="relative" className={classes.header}>
              <Toolbar color="inherit" >
                  <Grid container spacing={3}>
                      <Grid item xs item container justify="center">
                      <Avatar variant="square"  src="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco/qntoi4yvbpwz3foxjmv1" />
                      </Grid>
                      <Grid item xs={5}  >
                        <Link href="#" onClick={preventDefault} color="inherit" className={classes.link}> What we do </Link>
                        <Link href="#" onClick={preventDefault} color="inherit" className={classes.link}> Our Projects</Link>
                        <Link href="#" onClick={preventDefault} color="inherit" className={classes.link}> Testimonials </Link>
                        <Link href="#" onClick={preventDefault} color="inherit" className={classes.link}> Blog  </Link>
                        <Link href="#" onClick={preventDefault} color="inherit" > Support  </Link>
                      </Grid>
                      <Grid item xs >
                      <Link href="#" onClick={preventDefault}  className={classes.link}> Log in  </Link>
                      <Button variant="contained" color="primary" className={classes.link}>Register</Button>
                      </Grid>
                  </Grid>
              </Toolbar>
          </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm"  >
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Bartosz Lusztak
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Simple cat api. It is possible  to see cat details and load more.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                   Empty button
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                   Empty button
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
        <Container maxWidth="sm"  >
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Simple Cat Website
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             Simple cat api. It is possible  to see cat details and load more.
            </Typography>
        </Container>
          <Grid container spacing={3}>
            {data.map((cat) => (
              <Grid item key={cat} xs={12} sm={6} md={4} lg={3} >
            <RoutLink to={'/element/' + cat.id}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={cat.url}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Id : {cat.id}
                    </Typography>
                    <Typography>
                      This is a cat. You can load more cats.
                    </Typography>
                  </CardContent>
                </Card>
                </RoutLink>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
      <Button variant="outlined" color="primary" onClick={handleLoadMoreData}>
          Load More
      </Button>
      </footer>
    </React.Fragment>
  );
}
