import React, { Component } from 'react';
import {Box, Text, Image, Flexbox, Label} from 'archetype-ui';
import PropTypes from 'prop-types';
import Palette from 'react-palette';
import Styled from 'styled-components';

const TitleText = Styled(Text)``;

const BookWrapper = Styled(Box)`
    cursor: pointer;
    transition: ${props => props.theme.transitions.default};

    &:hover {
        filter: brightness(1.2);

        ${TitleText} {
            text-decoration: underline;
        }
    }
`;

const ShadowImage = Styled(Image)`
    > img {
        -webkit-box-shadow: 6px 7px 14px -4px rgba(40,44,52,0.59);
        -moz-box-shadow: 6px 7px 14px -4px rgba(40,44,52,0.59);
        box-shadow: 6px 7px 14px -4px rgba(40,44,52,0.59);
    }
`;

class Book extends Component {
    render() {
        const { title, cover, author, paletteType, showLabels, labels, showPalette } = this.props;

        return (
            <BookWrapper
                padding={[1,1,1,1]}
            >
                {cover && (
                    <Palette image={cover}>
                        {palette => {
                            return (
                                <Box>
                                    <Flexbox
                                        bg={palette[paletteType]}
                                        padding={[1,1,1,1]}
                                        ai={'center'}
                                        jc={'center'}
                                    >
                                        <ShadowImage margin={[1,1,1,1]} src={cover} />
                                    </Flexbox>
                                    {showPalette && (
                                        <Flexbox ai='center' jc='space-between'>
                                            <Box bg={palette.darkMuted} height={'30px'} width={17}></Box>
                                            <Box bg={palette.darkVibrant} height={'30px'} width={17}></Box>
                                            <Box bg={palette.lightMuted} height={'30px'} width={17}></Box>
                                            <Box bg={palette.lightVibrant} height={'30px'} width={17}></Box>
                                            <Box bg={palette.muted} height={'30px'} width={17}></Box>
                                            <Box bg={palette.vibrant} height={'30px'} width={17}></Box>
                                        </Flexbox>
                                    )}
                                </Box>
                            )
                        }}
                    </Palette>
                )}
                <Box>
                    <TitleText color='text' weight={700}>
                        {title}
                    </TitleText>
                    <Text color='textSecondary' fontStyle='italic'>{author}</Text>
                    {!!(showLabels && labels && labels.length) && (
                        <Flexbox>
                            {labels.map((label, labelIndex) => (
                                <Label
                                    color={'labelFour'}
                                    small
                                    mr={1}
                                    key={labelIndex}
                                    text={label}
                                />
                            ))}
                        </Flexbox>
                    )}
                </Box>
            </BookWrapper>
        )
    }
}

Book.defaultProps = {
    paletteType: 'darkVibrant',
    showLabels: false,
    showPalette: false
};

Book.propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string,
    author: PropTypes.string,
    paletteType: PropTypes.string,
    showLabels: PropTypes.bool,
    labels: PropTypes.arrayOf(PropTypes.string),
    showPalette: PropTypes.bool
};

export default Book;