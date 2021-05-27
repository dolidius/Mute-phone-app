import ILocalization from './interfaces/ILocalization';
import ICoordinates from './interfaces/ICoordinates';
import IAddress from './interfaces/IAddress';

export default class Localization implements ILocalization {
    public Id: string;
    public Name: string;
    public Icon: string;
    public Coordinates: ICoordinates;
    public Address: IAddress;
    public IsMuted: boolean;
    public Type: string;

    constructor(
        id: string,
        name: string,
        icon: string,
        coordinates: ICoordinates,
        address: IAddress,
        type: string,
        isMuted: boolean = false
    ) {
        this.Id = id;
        this.Name = name;
        this.Icon = icon;
        this.Address = address;
        this.Coordinates = coordinates;
        this.Type = type;
        this.IsMuted = isMuted;

    }

}
