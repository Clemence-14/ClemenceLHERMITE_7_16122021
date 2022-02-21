import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import CardComments from "./CardComments";
import DeleteCard from "./Deletecard";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        !isEmpty(userData[0]) && setIsLoading(false);
    }, [userData]);

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                <div className="card-left">
                    <img
                    src={
                        !isEmpty(
                            userData[0] &&
                            userData.map((user) => {
                                if (user._id === post.posterId) return user.picture
                                else return null
                            })
                            .join("")
                        )
                    }
                    alt="poster-pic"
                    />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                {
                        !isEmpty(
                            userData[0] &&
                            userData.map((user) => {
                                if (user._id === post.posterId) return user.pseudo
                                else return null
                            })
                            .join("")
                        )
                    }
                                </h3>
                                            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
                                <div className="card-footer">
                                    <div className="comment-icon">
                                        <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="comment" />
                                        <span>{post.comments.length}</span>
                                    </div>
                                    <LikeButton post={post} />
                                    <img onClick={() => setShowComments(!showComments)} src="./img/icons/share.svg" alt="share" />
                                    </div>
                                    {showComments && <CardComments post={post} />}
                        </div>
                    </div>
                    </>
            )}
        </li>
    );
                }



export default Card;