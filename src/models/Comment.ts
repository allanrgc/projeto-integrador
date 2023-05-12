
export interface CommentDB {
    comment_id: string,
    user_id: string,
    post_id: string,
    comment: string,
    created_at: string
}

export interface CommentModel {
    commentId: string,
    userId: string,
    postId: string,
    comment: string,
    createdAt: string
}

export interface TokenPayload {
    id: string
}

export class Comment {
    constructor(
        private commentId: string,
        private userId: string,
        private postId: string,
        private comment: string,
        private createdAt: string
    ){}

    public getCommentId(): string {
        return this.commentId;
    }
    public setCommentId(value: string): void {
        this.commentId = value;
    }
    
    public getUserId(): string {
        return this.userId;
    }
    public setUserId(value: string): void {
        this.userId = value;
    }

    public getPostId(): string {
        return this.postId;
    }
    public setPostId(value: string): void {
        this.postId = value;
    }

    public getComment(): string {
        return this.comment;
    }
    public setComment(value: string): void {
        this.comment = value;
    }

    public getCreatedat(): string {
        return this.createdAt;
    }
    public setCreatedAt(value: string): void {
        this.createdAt = value;
    }

    public toDBModel(): CommentDB {
        return {
            comment_id: this.commentId,
            user_id: this.userId,
            post_id: this.postId,
            comment: this.comment,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): CommentModel {
        return {
            commentId: this.commentId,
            userId: this.userId,
            postId: this.postId,
            comment: this.comment,
            createdAt: this.createdAt
        }
    }
}