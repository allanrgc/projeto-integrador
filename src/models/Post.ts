export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface PostModel {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number
    createdAt: string,
    updatedAt: string
}

export class Post{
    constructor(
        private id: string,
        private creator_id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string
    ){}

    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }
    public getCreatorid(): string {
        return this.creator_id;
    }
    public setCreator_id(value: string) {
        this.creator_id = value;
    }
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
    public getDislikes(): number {
        return this.dislikes;
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
            id: this.id,
            creator_id: this.creator_id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            creator_id:this.creator_id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
    
}