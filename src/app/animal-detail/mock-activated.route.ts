import {ActivatedRoute, convertToParamMap, ParamMap, Params} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {MockActivatedRouteSnapshot} from './mock-activated-route.snapshot';

export class MockActivatedRoute extends ActivatedRoute {
  private innerTestParams: Params;
  private testParamsSubject: BehaviorSubject<Params> = new BehaviorSubject(this.testParams);
  private testParamMapSubject: BehaviorSubject<ParamMap> = new BehaviorSubject(convertToParamMap(this.testParams));

  override snapshot: MockActivatedRouteSnapshot;

  constructor(testParams: Params) {
      super();
      this.testParams = testParams;
      this.snapshot = new MockActivatedRouteSnapshot(this.testParams);
      this.innerTestParams = testParams;
  }

  private get testParams() {
    return this.innerTestParams;
  }

  private set testParams(params: Params) {
    this.innerTestParams = params;
    this.testParamsSubject.next(params);
    this.testParamMapSubject.next(convertToParamMap(params));
  }
}
