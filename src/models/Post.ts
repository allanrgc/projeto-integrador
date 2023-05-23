export interface PostDB {
    post_id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface PostDBWithCreatorName {
    post_id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_name: string
  }

export interface PostModel {
    postId: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number
    createdAt: string,
    updatedAt: string
}

export interface LikeDislikeDB {
    user_id: string,
    post_id: string,
    like: number
  }
  
  export enum POST_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
  }

export class Post{
    
    constructor(
        private postId: string,
        private creatorId: string,
        // private creatorName: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string
    ){}

    public getPostId(): string {
        return this.postId;
    }
    public setPostId(value: string) {
        this.postId = value;
    }
    public getCreatorId(): string {
        return this.creatorId;
    }
    public setCreatorId(value: string) {
        this.creatorId = value;
    }
    // public getCreatorName(): string {
    //     return this.creatorName
    // }
    // public setCreatorName(value: string) {
    //     this.creatorName = value
    // }
    public getContent(): string {
        return this.content;
    }
    public setContent(value: string) {
        this.content = value;
    }

    public getLikes(): number {
        return this.likes;
    }
    public setLikes(value: number) {
        this.likes = value;
    }
    public addLike = ():void => {
        this.likes++
    }
    public removeLike = (): void => {
        this.likes--
    }
    public getDislikes(): number {
        return this.dislikes;
    }
    public setDislike(value: number) {
        this.dislikes = value
    }
    public addDislike = (): void => {
        this.dislikes++
    }
    public removeDislike = (): void => {
        this.dislikes--
    }

    public setDislikes(value: number) {
        this.dislikes = value;
    }
    public getCreatedAt(): string {
        return this.createdAt;
    }
    public setCreatedAt(value: string) {
        this.createdAt = value;
    }
    public getUpdatedAt(): string {
        return this.updatedAt;
    }
    public setUpdatedAt(value: string) {
        this.updatedAt = value;
    }


    public toDBModel(): PostDB {
        return {
            post_id: this.postId,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): PostModel {
        return {
            postId: this.postId,
            creatorId:this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
    
    
}