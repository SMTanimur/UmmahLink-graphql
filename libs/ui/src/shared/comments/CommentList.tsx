
"use client"

import React, { lazy } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import CommentItem from "./CommentItem";
import { CommentPaginate } from "@social-zone/graphql";



interface IProps {
    comments: CommentPaginate[];

}

const CommentList: React.FC<IProps> = ({ comments,  }) => {
  
 
    return (
        <TransitionGroup component={null}>
            {comments.map(comment => (
                <CSSTransition
                    timeout={500}
                    classNames="fade"
                    key={comment?.id}
                >
                    <CommentItem  comment={comment} />
                </CSSTransition>
            ))}
       
        </TransitionGroup>
    );
};

export default CommentList;
