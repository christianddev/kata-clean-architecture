import * as readLine from 'readline';
import { UsersViewTerminal } from "./presentation/UsersViewTerminal";

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const view = new UsersViewTerminal(rl);

view.initialize();