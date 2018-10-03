import { MatCustomModule } from './mat-custom.module';

describe('MatCustomModule', () => {
  let matCustomModule: MatCustomModule;

  beforeEach(() => {
    matCustomModule = new MatCustomModule();
  });

  it('should create an instance', () => {
    expect(matCustomModule).toBeTruthy();
  });
});
