import React, {Component} from 'react';
import {Container,ImageContainer} from './styled';
import PropTypes from 'prop-types';
import {getResponsiveKey} from "../../utils/functions";

let scrollPositions = null;

class ButtonScrollTop extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", this.listener)
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener("scroll", this.listener)
        }
    }

    listener = () => {
        scrollPositions = window.scrollY;
        this.setState({
            scrollY: window.scrollY
        })
    }

    buildComponent = (fields, field, key) => {
        if (!fields[field]) return
        switch (field) {

            case 'Image':
                return this.getImages(fields[field]);

            default :
                return null;
        }
    }


    getImages = field => {
        const responsiveContent = getResponsiveKey(field.content.images[0].asset)[0];
        return field.content.images.map((image, i) => {
            const file = image.asset[responsiveContent].fileName ? image.asset[responsiveContent].fileName : null;
            if (!file) {
                return null
            } else {
                return (
                    <ImageContainer key={i}
                                    responsive={field.responsiveSettings}
                                    basis={field.settings.basis}
                                    border={field.settings.border}>
                        <img src={`${this.props.assetsDirectory || ''}${ file }`}/>
                    </ImageContainer>);
            }
        });
    }

    scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    getWindowHeight = () => {
        if (typeof window !== 'undefined') {
            return  window.innerHeight;
        }else{
            return 0;
        }

    }

    render() {
        const {fields, order, assetsDirectory} = this.props;

        const Template = fields.Template;

        return (
            <Container responsive={Template ? Template.responsiveSettings : []}
                       responsiveContent={getResponsiveKey(Template.content.images[0].asset)}
                       asset={Template.content.images[0].asset || null}
                       assetsDirectory={assetsDirectory}
                       basis={Template && Template.settings ? Template.settings.basis : null}
                       border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
                       onClick={() => { this.scrollToTop()}}
                       className={ this.state.scrollY && this.state.scrollY > this.getWindowHeight() ? 'display' : ''}
            >
                {
                    order ? order.map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                        : ['Image'].map((fieldName, i) => this.buildComponent(fields, fieldName, i))
                }
            </Container>
        );
    }
}


ButtonScrollTop.defaultProps = {};

ButtonScrollTop.propTypes = {
    order: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.shape({
        Template: PropTypes.object,
        Image: PropTypes.object
    }),
    language: PropTypes.number.isRequired,
    assetsDirectory: PropTypes.string
};
export default ButtonScrollTop;
