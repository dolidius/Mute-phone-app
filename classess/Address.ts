import IAddress from './interfaces/IAddress';

export default class Address implements IAddress {
    public Country: string;
    public City: string;
    public PostalCode: string;
    public Street: string | null;
    public StreetNumber: string | null;

    constructor(
        country: string,
        city: string,
        postalCode: string,
        street: string | null,
        streetNumber: string | null,
    ) {
        this.Country = country;
        this.City = city;
        this.PostalCode = postalCode;
        this.Street = street;
        this.StreetNumber = streetNumber;
    }

    public formatAddress = (): string => {
        if(!this.Street) {
            return `${this.Country}, ${this.PostalCode} ${this.City}`
        }
        return `${this.StreetNumber} ${this.Street} ${this.PostalCode} ${this.City}`
    }

    
}
