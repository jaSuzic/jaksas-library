export interface Rent {
    _id: string;
    idMember: string;
    idBook: string;
    rentDate: Date;
    returnDate: Date | null;
}
