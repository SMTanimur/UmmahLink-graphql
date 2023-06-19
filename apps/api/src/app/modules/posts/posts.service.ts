/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './entities/post';
import { Model, Types } from 'mongoose';
import { CreatePostInput } from './dto/craete-post-input';
import { UsersService } from '../users/users.service';
import { UpdatePostInput } from './dto/update-post-input';
import { DeletePostInput } from './dto/delete-post-input';
import { MessageResponse } from '@social-zone/common';
import { Like, LikeDocument } from './entities/like';
import { CreatePostOrCommentLikeInput } from './dto/create-post-or-comment-like';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    private readonly userService: UsersService
  ) {}

  async createPost(createPostInput: CreatePostInput) {
    const user = await this.userService.findUserById(
      String(createPostInput.author)
    );
    if (!user) throw new UnauthorizedException('User not found');
    await this.postModel.create(createPostInput);
    return { message: 'Post created successfully' };
  }

  findAll() {
    return `This action returns all posts`;
  }

 async getPostById(postId:string):Promise<Post> {

  const post =  await this.postModel.findById(postId)
  return post
    
  }

  async updatePost(updatePostInput: UpdatePostInput) {
    try {
      const { postId, user } = updatePostInput;
      const postExited = await this.postModel.findOne({ _id: postId });

      if (!postExited) throw new NotFoundException('Post not Found');

      if (String(postExited.author) == String(user)) {
        await this.postModel.findOneAndUpdate(
          { _id: postId },
          updatePostInput,
          { new: true }
        );
      }
      return {
        message: 'post updated successfully',
      };
    } catch (error) {
      throw new BadRequestException('server error');
    }
  }

  async deletePost(deletePostInput:DeletePostInput):Promise<MessageResponse> {
   try {
    const {postId,user}=deletePostInput

    const post =  await this.postModel.findOne({_id:postId})
    if(!post) throw new NotFoundException('Post not found')

    if(String(post.author) == String(user)){
      await this.postModel.findByIdAndDelete(post._id)
    }
    return {message:'Post deleted'}
   } catch (error) {
    throw new BadRequestException()
   }
    
  }

  async likePost(createLikeInput:CreatePostOrCommentLikeInput):Promise<MessageResponse> {
    try {
      const { postId, user: userId ,type} = createLikeInput;

      const post = await this.postModel.findById(postId);
      if (!post) throw new NotFoundException('Post not found');

      const query = {
        target: postId,
        user: userId,
        type
    };
      const like = await this.likeModel.findOne(query)
      if (!like){
        const like = await this.likeModel.create(query);
        post.likes.push(like._id);
        post.save()
        return { message: 'Post liked successfully' };
      } else {
        await this.likeModel.findOneAndDelete(query)
        await this.postModel.findOneAndUpdate({_id:postId},{
          $pull:{likes:like._id}
        })
       return {message:'Post unLiked successfully'}
      }
 
    } catch (error) {
      throw new BadRequestException('server error');
    }
  }
}
