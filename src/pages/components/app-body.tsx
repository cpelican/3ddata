import { type TriangleConf } from './triangle';
import React, { useEffect, useState } from 'react';
import { calculatePointC, generateRGBColors } from './helpers';
import { Figure } from './figure';

export interface DataPoint {
    count: number;
    id: string;
    value?: number;
}

const TRIANGLE_MAX_ACCEPTED_RADIUS = 90;
const TRIANGLE_LENGTH = 100;

export const AppBody = () => {
    const popupRef = React.useRef<BufferGeometry>(null!);
    const fakeData = Array.from({ length: 40 }),
        [data, setData] = useState<DataPoint[] | unknown[]>(fakeData),
        [hoveredData, setHoveredData] = useState<Pick<TriangleConf, 'A' | 'B' | 'C' | 'color'> | {}>({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                'https://api-u.spaziodati.eu/v2/companies/stats/?token=sdu-eeb5c2cc4bf14439879d960b5c0836ad&packages=economics&fields=economics.employees'
            );
            const jsonResponse = await response.json(),
                data = jsonResponse.stats?.economics?.employees?.distribution,
                max = Math.max(...data.map((el: DataPoint) => el.count)),
                distribution = data.map((el: DataPoint) => ({
                    ...el,
                    value: Math.round(
                        (el.count * TRIANGLE_MAX_ACCEPTED_RADIUS) / max
                    ),
                }));

            // setData(distribution);
        }
        fetchData();
    }, []);

    const dataLength = data?.length ?? 0;
    if (data == null || dataLength === 0) {
        return null;
    }

    const colors = generateRGBColors(dataLength),
        triangleConf: TriangleConf[] = data.reduce((acc, el, i) => {
            const pointA = [0, 0, i],
                pointB =
                    i === 0
                        ? [0, TRIANGLE_LENGTH, i]
                        : [acc[i - 1].C[0], acc[i - 1].C[1], i],
                pointC = calculatePointC(pointA, pointB, el?.value ?? 20);
            acc.push({
                A: pointA,
                B: pointB,
                C: pointC,
                color: colors[i],
            });
            return acc;
        }, [] as TriangleConf[]);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    width: '10rem',
                    height: '5rem',
                    margin: '1rem',
                    fontFamily: 'sans-serif',
                    fontSize: '0.7rem',
                }}
            >
                <ul style={{ listStyleType: 'none' }}>
                    {Object.entries(hoveredData ?? {}).map(([key, value]) => {
                        const isPosition = Array.isArray(value);
                        if (isPosition) {
                            return (
                                <li key={key}>
                                    {key}:{' '}
                                    {value
                                        .map((el) => parseInt(el, 10))
                                        .join(', ')}
                                </li>
                            );
                        }
                        return (
                            <li
                                key={key}
                                style={{
                                    backgroundColor: value,
                                    width: '50px',
                                    height: '20px',
                                }}
                            />
                        );
                    })}
                </ul>
            </div>
            <Figure
                onHover={(el) => {
                    setHoveredData(el);
                }}
                data={triangleConf}
            />
        </>
    );
};
