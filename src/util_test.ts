import { expect, assert } from 'chai';
import { Response } from 'node-fetch';
import { CoreV1Api, V1Container, V1Pod } from './api.js';
import {
    normalizeResponseHeaders,
    findSuffix,
    podsForNode,
    quantityToScalar,
    totalCPU,
    totalMemory,
} from './util.js';

describe('Utils', () => {
    it('should get zero pods for a node', async () => {
        const podList = {
            items: [],
        };
        const mockApi = {
            listPodForAllNamespaces: (): Promise<any> => {
                return new Promise<any>((resolve) => {
                    resolve(podList);
                });
            },
        };

        const pods = await podsForNode(mockApi as CoreV1Api, 'foo');
        expect(pods.length).to.equal(0);
    });

    it('should only gets for pods named node', async () => {
        const podList = {
            items: [
                {
                    spec: {
                        nodeName: 'foo',
                    },
                },
                {
                    spec: {
                        nodeName: 'bar',
                    },
                },
            ],
        };
        const mockApi = {
            listPodForAllNamespaces: (): Promise<any> => {
                return new Promise<any>((resolve) => {
                    resolve(podList);
                });
            },
        };

        const pods = await podsForNode(mockApi as CoreV1Api, 'foo');
        expect(pods.length).to.equal(1);
        expect(pods[0].spec!.nodeName).to.equal('foo');
    });

    it('should parse quantities', () => {
        expect(quantityToScalar('')).to.equal(0);

        expect(quantityToScalar('2n')).to.equal(2 / 1_000_000_000);
        expect(quantityToScalar('3u')).to.equal(3 / 1_000_000);
        expect(quantityToScalar('100m')).to.equal(0.1);
        expect(quantityToScalar('3k')).to.equal(BigInt(3000));
        expect(quantityToScalar('3M')).to.equal(BigInt(3 * 1000 * 1000));
        expect(quantityToScalar('3G')).to.equal(BigInt(3 * 1000 * 1000 * 1000));
        expect(quantityToScalar('5T')).to.equal(BigInt(5 * 1000 * 1000 * 1000) * BigInt(1000));
        expect(quantityToScalar('3P')).to.equal(BigInt(3 * 1000 * 1000 * 1000) * BigInt(1000 * 1000));
        expect(quantityToScalar('14E')).to.equal(
            BigInt(14 * 1000 * 1000 * 1000) * BigInt(1000 * 1000 * 1000),
        );

        expect(quantityToScalar('0.2')).to.equal(0.2);
        expect(quantityToScalar('1976m')).to.equal(1.976);

        expect(quantityToScalar('1024')).to.equal(1024);
        expect(quantityToScalar('10e3')).to.equal(10000);

        expect(quantityToScalar('10Ki')).to.equal(BigInt(10240));
        expect(quantityToScalar('20Mi')).to.equal(BigInt(1024 * 1024 * 20));
        expect(quantityToScalar('30Gi')).to.equal(BigInt(1024 * 1024 * 1024 * 30));
        expect(quantityToScalar('40Ti')).to.equal(BigInt(1024 * 1024 * 1024 * 1024 * 40));
        expect(quantityToScalar('50Pi')).to.equal(BigInt(1024 * 1024 * 1024 * 1024 * 1024 * 50));
        expect(quantityToScalar('60Ei')).to.equal(
            BigInt(1024 * 1024 * 1024) * BigInt(1024 * 1024 * 1024 * 60),
        );

        expect(() => quantityToScalar('foobar')).to.throw('Unknown quantity foobar');
        expect(() => quantityToScalar('100foobar')).to.throw('Unknown suffix: foobar');
    });

    it('should get resources for pod', () => {
        const pod = {
            spec: {
                containers: [
                    {
                        name: 'foo',
                        resources: {
                            requests: {
                                cpu: '100m',
                                memory: '10Ki',
                            },
                            limits: {
                                cpu: '200m',
                            },
                        },
                    } as V1Container,
                    {
                        name: 'bar',
                        resources: {
                            requests: {
                                cpu: '1.0',
                            },
                            limits: {
                                memory: '20Ki',
                            },
                        },
                    } as V1Container,
                ] as V1Container[],
            },
        } as V1Pod;

        const cpuResult = totalCPU(pod);
        expect(cpuResult.request).to.equal(1.1);
        expect(cpuResult.limit).to.equal(0.2);

        const memResult = totalMemory(pod);
        expect(memResult.request).to.equal(BigInt(10240));
        expect(memResult.limit).to.equal(BigInt(20480));
    });

    it('should find the suffix correctly', () => {
        expect(findSuffix('1234567')).to.equal('');
        expect(findSuffix('1234asdf')).to.equal('asdf');
        expect(findSuffix('1.0')).to.equal('');
    });

    it('shoult extract the headers for ApiException correctly', () => {
        const response = new Response();
        response.headers.set('foo', 'bar');
        response.headers.set('baz', 'k8s');

        assert.deepEqual(normalizeResponseHeaders(response), { foo: 'bar', baz: 'k8s' });
    });
});
