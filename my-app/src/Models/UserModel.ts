export class UserModel{
    name: string;
    lastname: string;
    address: string;
    email : string;
    dateOfBirth : Date;
    username : string;
    accountStatus: number = 0;
    accountStatusString: string = "";
    accountImage:string;
    constructor(name:string, lastname:string, address:string, email:string, dateOfBirth:Date, username:string, accountStatus:number, imageUrl:string){
        this.name = name;
        this.lastname = lastname;
        this.address = address;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.username = username;
        this.accountStatus = accountStatus;
        this.accountImage = imageUrl;
    }
}