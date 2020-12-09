import React from 'react';
import {Wrapper, List} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import CardFormation from './CardFormation';
import {getTextProps, getTemplateProps} from "../../utils/gettersProperties";

import {TextCommon, ContainerCommon} from "../../styles/common.styled";

const isOdd = (num) => { return num % 2;}


const ListAllFormationsWithFilter = ({children, fields, name, assetsDirectory, data, language}) => {
    const Template = fields.Template;
    const FlexContainer = fields.FlexContainer;

    let categories = [];
    data.map(formation => {
        formation.category.map( category => {
            if (!categories.some( c => c.slug === category.slug ) ) {
                categories.push(category);


            }
        })
    })

    let formationsByCategory = {};

    categories.forEach(category => {
        formationsByCategory[category.slug] = data.filter(formation => formation.category.some(c => c.slug === category.slug))
    })

    return (
        <Wrapper id={removeSpaces(name)}
                 asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                 assetsDirectory={assetsDirectory}
                 responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                 responsive={Template ? Template.responsiveSettings : null}
                 basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                 border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
        >
                {
                    categories.map((category, i) => {
                        const configTemplate = isOdd(i) ? fields.TemplateEven : fields.TemplateOdd;
                        return <ContainerCommon  {...getTemplateProps(configTemplate)}>
                            <TextCommon {...getTextProps(fields.Title)}>{category.name}</TextCommon>
                            <List
                                responsive={FlexContainer ? FlexContainer.responsiveSettings : []}
                                flex={FlexContainer && FlexContainer.settings ? FlexContainer.settings.flex : {}}>

                                {
                                    formationsByCategory[category.slug].map((formation, j) => {
                                        return <CardFormation
                                            key={`${i}${j}`}
                                            configCard={fields.TemplateCard}
                                            data={formation} i={i}
                                            assetsDirectory={assetsDirectory}
                                            language={language}
                                            CTA={fields.CTA}
                                        />
                                    })
                                }
                            </List>
                        </ContainerCommon>
                    })
                }
        </Wrapper>
    );
};

ListAllFormationsWithFilter.defaultProps = {}

export default ListAllFormationsWithFilter;
