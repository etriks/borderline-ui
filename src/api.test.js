import { Observable } from 'rxjs';
import { api } from './api';

it('contains only valid functions', () => {
    Object.keys(api).map((key) => {
        expect(api[key]).toBeInstanceOf(Function);
        return null;
    });
});

describe('returns valid Observables', () => {

    const observable = {};
    it('returns an Observable for each available call', () => {
        Object.keys(api).map((key) => {
            fetch.mockResponseSuccessOnce({});
            observable[key] = api[key]('hello', 'world');
            expect(observable[key]).toBeInstanceOf(Observable);
            return null;
        });
    });

    it('Observables can complete', () => {
        const expectedShape = {
            ok: expect.any(Boolean),
            status: expect.any(Number),
            data: expect.any(Object)
        };
        Object.keys(api).map((key) => {
            expect(observable[key].toPromise()).resolves.toMatchObject(expectedShape);
            return null;
        });
    });
});
