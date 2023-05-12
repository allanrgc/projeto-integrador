export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    role: USER_ROLES,
    createdAt: string
}

export interface TokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
}

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
        // private post: {
        //     id: string;
        //     creator_id: string;
        //     content: string;
        //     likes: number;
        //     dislikes: number;
        //     createdAt: string;
        //     updatedAt: string;
        // }
    ){}

    public getId(): string {
        return this.id;
    }
    public setId(value: string): void {
        this.id = value;
    }
    
    public getName(): string {
        return this.name;
    }
    public setName(value: string): void {
        this.name = value;
    }

    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string): void {
        this.email = value;
    }

    public getPassword(): string {
        return this.password;
    }
    public setPassword(value: string): void {
        this.password = value;
    }

    public getRole(): USER_ROLES {
        return this.role;
    }
    public setRole(value: USER_ROLES): void {
        this.role = value;
    }

    public getCreatedat(): string {
        return this.createdAt;
    }
    public setCreatedAt(value: string): void {
        this.createdAt = value;
    }

    // public getPost(): {
    //     id: string;
    //     creator_id: string;
    //     content: string;
    //     likes: number;
    //     dislikes: number;
    //     createdAt: string;
    //     updatedAt: string;
    // } {
    //     return this.post;
    // }
    // public setPost(value: {
    //     id: string;
    //     creator_id: string;
    //     content: string;
    //     likes: number;
    //     dislikes: number;
    //     createdAt: string;
    //     updatedAt: string;
    // }) {
    //     this.post = value;
    // }
    public toDBModel(): UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    }

    // para facilitar nossa vida, temos o método que gera um UserModel
    public toBusinessModel(): UserModel {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt
        }
    }
}