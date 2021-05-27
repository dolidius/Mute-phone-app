export default interface IAddress {
    Country: string;
    City: string;
    PostalCode: string;
    Street: string | null;
    StreetNumber: string | null;
    formatAddress: () => string;

}