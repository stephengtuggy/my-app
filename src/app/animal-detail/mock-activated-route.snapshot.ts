import {ActivatedRouteSnapshot, Params} from '@angular/router';

export class MockActivatedRouteSnapshot extends ActivatedRouteSnapshot {
  private innerTestParams?: Params;

  constructor(testParams?: Params) {
    super();
    if (testParams) {
      this.testParams = testParams;
    } else {
      this.testParams = null;
    }
  }

  private get testParams() {
    return this.innerTestParams;
  }

  private set testParams(params: Params) {
    this.innerTestParams = params;
  }
}
