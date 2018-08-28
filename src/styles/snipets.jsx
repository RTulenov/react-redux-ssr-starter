import { createElement as h } from 'react';
import styled, { css } from 'styled-components';
import { MEDIA_SIZES } from 'styles/constants';

const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null;
};

export const rgba = (hex, alpha) => {
    const color = hexToRgb(hex);
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

export const media = Object.keys(MEDIA_SIZES).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${MEDIA_SIZES[label] / 16}em) {
            ${css(...args)}
        }
    `
    return acc
}, {});


export const withDynamicTag = Component => {
    const bucket = Object.create(null);

    const DynamicTag = props => {
        const { tag } = props;
        
        if (typeof tag !== 'string' || !styled.hasOwnProperty(tag)) {
            return h(Component, props);
        }
        
        if (bucket[tag] === undefined) {
            bucket[tag] = Component.withComponent(tag);
        }

        return h(bucket[tag], props);
    };

    const name = Component.displayName || Component.constructor.name;

    if (name) {
        DynamicTag.displayName = `DynamicTag(${name})`;
    }

    return DynamicTag;
};
