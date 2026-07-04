import {ActivatedRouteSnapshot, Params} from '@angular/router';

export class MockActivatedRouteSnapshot extends ActivatedRouteSnapshot {
    private innerTestParams: Params;

    constructor(testParams: Params) {
        super();
        this.testParams = testParams;
        this.innerTestParams = testParams;
    }

    private get testParams() {
        return this.innerTestParams;
    }

    private set testParams(params: Params) {
        this.innerTestParams = params;
    }
}
