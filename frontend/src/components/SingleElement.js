import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import SnackbarContext from '../contexts/SnackbarContext';
import LoadingContext from '../contexts/LoadingContext';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '40%',
    margin: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Element(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {catid} = props;
  const { setLoading } = useContext(LoadingContext);
  const { setSnackbar } = useContext(SnackbarContext);
  const [data, setData] = useState([]);
  const [apiUrl,setUrl] = useState("https://api.thecatapi.com/v1/images/search?id=" + catid);
 
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

 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (

    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            B
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Customized single elements."
        subheader="03.03.2021"
      />
      <CardMedia
        className={classes.media}
        image={data[0] ===undefined ?  "https://cdn2.thecatapi.com/images/x5fqaeXeK.jpg" : data[0].url }
        title="Customized single elements."
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Customized single elements.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}