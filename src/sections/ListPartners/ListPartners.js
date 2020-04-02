import React, {Component} from 'react';
import {
    Wrapper,
    Container
} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import CardPartner from './CardPartner';

class ListPartners extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }


    render() {
        const {children, fields, name, assetsDirectory, data, childProperties} = this.props;
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;

        console.log('data', data)
        console.log('children', children)


        return (
            <Wrapper id={removeSpaces(name)}
                     asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                     assetsDirectory={assetsDirectory}
                     responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                     responsive={Template ? Template.responsiveSettings : null}
                     basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                     border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
            >
                <Container
                    responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                    flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>
                    {
                        data.map((partner, i) => {
                            return <CardPartner
                                key={i}
                                config={fields.Partners}
                                configCard={fields.TemplateCard}
                                partner={partner} i={i}
                                assetsDirectory={assetsDirectory}/>
                        })
                    }
                </Container>
            </Wrapper>
        );
    }
};

ListPartners.defaultProps = {}

export default ListPartners;