import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions';
import { IBService, IOptions, IParameters } from './interfaces/IBservice';

const sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time));

class BService implements IBService {
    Options: IOptions;
    checkIfMutedInterval: () => void;
    updateCurrentLocalization: () => void;

    constructor(options: IOptions, updateCurrentLocalization: () => void, checkIfMutedInterval: () => void)
    {
        this.Options = options;
        this.updateCurrentLocalization = updateCurrentLocalization;
        this.checkIfMutedInterval = checkIfMutedInterval
    }

    private VeryIntensiveTask = async (taskDataArguments: IParameters | undefined) => {
        const { delay } = taskDataArguments!;
        await new Promise(async (resolve) => {
            while(true) {
                // this.updateCurrentLocalization();
                this.checkIfMutedInterval();
                await sleep(delay);
            }
        });
    }

    public Start = () => {
        BackgroundService.start(this.VeryIntensiveTask, this.Options);
    }

    public Stop = () => {
        BackgroundService.stop();
    }

}

export default BService;