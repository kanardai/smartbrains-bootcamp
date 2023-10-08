/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { colors, mediaSize } from './utils/theme'
import { Helmet } from 'react-helmet'
import { Sidebar } from './MainpageComponents/Sidebar'
import arrowThumb from './MainpageComponents/images/arrow-thumb.svg'
import { ADLogo } from './MainpageComponents/ADLogo'
import { Technologies } from './MainpageComponents/Technologies'
import { Apps } from './MainpageComponents/Apps'
import { CV } from './MainpageComponents/CV'
import { urls } from './utils/urls'

export const MainPage = () => {
    return (
        <Div_OuterWrapper>
            <Div_Container>
                <Sidebar />
                <Div_Slide id={urls.mainpageIDHome}>
                    <Helmet>
                        <title>Aneta Daika - React Portfolio</title>
                    </Helmet>

                    <ADLogo />
                </Div_Slide>

                <Div_Slide id={urls.mainpageIDApps}>
                    <Apps />
                </Div_Slide>

                <Div_Slide id={urls.mainpageIDCv}>
                    <CV />
                </Div_Slide>

                <Div_Slide id={urls.mainpageIDTechnologies}>
                    <Technologies />
                </Div_Slide>
            </Div_Container>
        </Div_OuterWrapper>
    )
}

const Div_Container = styled.div`
    @media (${mediaSize.mediaMobile}) and (orientation: portrait) {
    }

    @media (${mediaSize.mediaLaptop}) and (orientation: landscape) {
        display: flex;
        transform: rotate(90deg) translateY(-100vh);
        transform-origin: top left;
    }
    @media (${mediaSize.mediaDesktop}) and (orientation: landscape) {
        display: flex;
        transform: rotate(90deg) translateY(-100vh);
        transform-origin: top left;
    }
`

const Div_OuterWrapper = styled.div`
    @media (${mediaSize.mediaMobile}) and (orientation: portrait) {
    }

    @media (${mediaSize.mediaLaptop}) and (orientation: landscape) {
        scroll-behavior: smooth;
        width: 100vh;
        min-height: 100vw;
        transform: rotate(-90deg) translateX(-100vh);
        transform-origin: top left;

        overflow-x: hidden;
        position: absolute;
        scrollbar-width: thin;
        scrollbar-color: ${colors.highlight} ${colors.primaryDarker};
        ::-webkit-scrollbar {
            width: 18px;
            background-color: ${colors.primaryDarker};
        }
        ::-webkit-scrollbar-thumb {
            background: url(${arrowThumb});
            background-repeat: no-repeat;
            background-position: center;
        }
    }
    @media (${mediaSize.mediaDesktop}) and (orientation: portrait) {
    }

    @media (${mediaSize.mediaDesktop}) and (orientation: landscape) {
        scroll-behavior: smooth;
        width: 100vh;
        min-height: 100vw;
        transform: rotate(-90deg) translateX(-100vh);
        transform-origin: top left;
        overflow-y: scroll;
        overflow-x: hidden;
        position: absolute;
        scrollbar-width: thin;
        scrollbar-color: ${colors.highlight} ${colors.primaryDarker};
        ::-webkit-scrollbar {
            width: 18px;
            background-color: ${colors.primaryDarker};
        }
        ::-webkit-scrollbar-thumb {
            background: url(${arrowThumb});
            background-repeat: no-repeat;
            background-position: center;
        }
    }
`

const Div_Slide = styled.div`
    background: ${colors.primaryDarker};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    scroll-behavior: smooth;
`
