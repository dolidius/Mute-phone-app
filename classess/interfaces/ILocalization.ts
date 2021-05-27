import ICoordinates from "./ICoordinates";
import IAddress from "./IAddress";

export default interface ILocalization {
    Id: string;
    Name: string;
    Icon: string;
    Address: IAddress;
    Type: string;
    Coordinates: ICoordinates;
    IsMuted: boolean;
}

