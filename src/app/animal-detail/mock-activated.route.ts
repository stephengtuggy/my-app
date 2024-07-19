import {ActivatedRoute, convertToParamMap, ParamMap, Params} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {MockActivatedRouteSnapshot} from './mock-activated-route.snapshot';

export class MockActivatedRoute extends ActivatedRoute {
  private innerTestParams?: Params;
  private testParamsSubject?: BehaviorSubject<Params> = new BehaviorSubject(this.testParams);
  private testParamMapSubject?: BehaviorSubject<ParamMap> = new BehaviorSubject(convertToParamMap(this.testParams));

  override snapshot: MockActivatedRouteSnapshot = new MockActivatedRouteSnapshot();

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
    this.testParamsSubject.next(params);
    this.testParamMapSubject.next(convertToParamMap(params));
  }
}
