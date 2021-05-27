import IAddress from "../../classess/interfaces/IAddress";
import Address from "../../classess/Address";

export default function createAddress(addressComponent: any[]): IAddress {
    let country: string;
    let city: string;
    let postalCode: string;
    let street: string | null = null;
    let streetNumber: string | null = null;

    addressComponent.forEach((component: any) => {
        let types: string[] = component.types;
        if(types.includes("street_number")) {
            streetNumber = component.long_name;
        } else if(types.includes("route")) {
            street = component.long_name;
        } else if(types.includes("locality")) {
            city = component.long_name;
        } else if(types.includes("country")) {
            country = component.long_name;
        } else if(types.includes("postal_code")) {
            postalCode = component.long_name;
        }
    })

    return new Address(country!, city!, postalCode!, street, streetNumber);
}