import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import React from "react";
import useStyles from './styles';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import {useNavigate}  from 'react-router-dom';



const Post=({post ,setCurrentId})=>{
    const classes=useStyles();
    const user=JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();


    const Likes= () =>{
        // console.log('s')
        if(post.likes.length > 0) {
        return post.likes.find((like)=> like=== (user?.result?.token || user?.result?._id))
        ?(
        
            <><ThumbUpAlt fontSize="small"/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ):(
            <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like':"Likes"}</>
        );
        }

        return <><ThumbUpAlt fontSize='small'/>&nbsp; Like</>
    }
    const dispatch=useDispatch();
    const openPost=()=>{
        navigate(`/posts/${post._id}`);

    }
    
    return(
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
            className={classes.cardAction}
            onClick={openPost}

            >                
                
                    <CardMedia   className={classes.media} image={post.selectedFile} title={post.title}/>

                    <div className={classes.overlay}>
                        <Typography variant="h6">{post.name}</Typography>

                        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>

                    </div>
                    {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator)&&(
                    <div className={classes.overlay2}>

                    <Button style={{color:'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize='medium'/>

                    </Button>

                    </div>)}


                    <div className={classes.details}>
                    <Typography variant="body2" color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>     

                    </div>

                
                    <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography> 

                    <CardContent>
                    <Typography  variant="body2" color="textSecondary" component='p' gutterBottom>{post.message}</Typography>     
                    </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}> 

            <Button color="primary" disabled={!user?.result} size='small' onClick={()=>{dispatch(likePost(post._id))}}>
                <Likes/>


            </Button>            

            {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator)&&(
                <Button color="primary" size='small' onClick={()=>{dispatch(deletePost(post._id))}}>
                <DeleteIcon fontSize="medium"/>
                Delete
                </Button>
            )}
           
            
            </CardActions>           

            </Card>
    )
}

export default Post;