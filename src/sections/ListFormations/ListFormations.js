import React, {Component} from 'react';
import {
    Wrapper,
    Container
} from './styled';
import {getResponsiveKey, removeSpaces, fileNameFromUrl} from "../../utils/functions";
import CardFormation from './CardFormation';

class ListFormations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            selectedCard: null,
        };
    }

    componentDidMount(){
        console.log('SPEAKERS ', this.props.speakers)
    }


    render() {
        const {children, fields, name, assetsDirectory, data} = this.props;
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
                        data.map((formation, i) => {
                            return <CardFormation
                                key={i}
                                config={fields.Formations}
                                configCard={fields.TemplateCard}
                                data={formation} i={i}
                                assetsDirectory={assetsDirectory}
                            />
                        })
                    }
                </Container>
            </Wrapper>
        );
    }
};

ListFormations.defaultProps = {}

export default ListFormations;

/*
                        data.map( formation => {
                            const rewritedProps = Object.assign({}, childProps);
                            rewritedProps.fields.Title.content.text[this.props.language] = formation.name
                            rewritedProps.fields.Tagline.content.text[this.props.language] = formation.category.name
                            rewritedProps.fields.Content.content.html[this.props.language] = formation.description.childMarkdownRemark.html

                            Object.keys(rewritedProps.fields.Image.content.images[0].asset).forEach(key => {
                                rewritedProps.fields.Image.content.images[0].asset[key].fileName = fileNameFromUrl(formation.image.file.url);
                            });
                            console.log('REWRITED PROPS',  rewritedProps)
                            return <CardImageLeft
                                        fields={rewritedProps.fields}
                                        order={rewritedProps.order}
                                        assetsDirectory={rewritedProps.assetsDirectory}
                                        language={rewritedProps.language}

                                    />
                        })*/