import React, {Component} from 'react';
import {Wrapper, Container} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import CardFormation from './CardFormation';

class ListFormations extends Component {
    render() {
        const {children, fields, name, assetsDirectory, data} = this.props;
        const Template = fields.Template;
        const FlexContainer = fields.FlexContainer;
        const CTA = fields.CTA;
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
                        data.map((formation, i) => {
                            return <CardFormation
                                key={i}
                                config={fields.Formations}
                                configCard={fields.TemplateCard}
                                data={formation} i={i}
                                assetsDirectory={assetsDirectory}
                                CTA={CTA}
                                language={this.props.language}
                            />
                        })
                    }
                    {children}
                </Container>
            </Wrapper>
        );
    }
};

ListFormations.defaultProps = {}

export default ListFormations;