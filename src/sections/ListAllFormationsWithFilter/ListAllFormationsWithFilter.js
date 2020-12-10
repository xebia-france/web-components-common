import React, {useState} from 'react';
import {Wrapper, List, WrapperCategory, Selector} from './styled';
import {getResponsiveKey, removeSpaces} from "../../utils/functions";
import CardFormation from './CardFormation';
import {getTextProps, getTemplateProps, getCTAProps} from "../../utils/gettersProperties";
import {TextCommon} from "../../styles/common.styled";
import SvgArrowSelect from "../../assets/svg/SvgArrowSelect";
import {isOdd} from "../../utils/functions";


const ListAllFormationsWithFilter = ({children, fields, name, assetsDirectory, data, language}) => {

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    let categories = [];
    data.map(formation => {
        formation.category.map(category => {
            if (!categories.some(c => c.slug === category.slug)) {
                categories.push(category);
            }
        })
    })
    categories.sort((a, b) => a.name.localeCompare(b.name));

    let formationsByCategory = {};

    categories.forEach(category => {
        formationsByCategory[category.slug] = data.filter(formation => formation.category.some(c => c.slug === category.slug))
    })

    const Template = fields.Template;
    const FlexContainer = fields.FlexContainer;

    return (
        <Wrapper id={removeSpaces(name)}
                 asset={Template && Template.content.images && Template.content.images[0].asset ? Template.content.images[0].asset : null}
                 assetsDirectory={assetsDirectory}
                 responsiveContent={Template && Template.content.images && Template.content.images[0].asset ? getResponsiveKey(Template.content.images[0].asset) : null}
                 responsive={Template ? Template.responsiveSettings : null}
                 basis={Template && Template.settings && Template.settings.basis ? Template.settings.basis : null}
                 border={Template && Template.settings && Template.settings.border ? Template.settings.border : null}
        >

            <Selector {...getCTAProps(fields.CTASelect)} >
                <SvgArrowSelect/>
                <select value={selectedCategory} onChange={handleChange}>
                    <option value={''}>Toutes nos formations</option>
                    {
                        categories.map((category, i) => <option key={`option-${i}`}
                                                                value={category.slug}>{category.name}</option>)
                    }
                </select>
            </Selector>
            {
                categories.map((category, i) => {
                    const configTemplate = isOdd(i) ? fields.TemplateOdd : fields.TemplateEven;
                    if (selectedCategory === '' || selectedCategory === category.slug) {
                        return <WrapperCategory  {...getTemplateProps(configTemplate)}>
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
                                            configTitle={fields.Title}
                                        />
                                    })
                                }
                            </List>
                        </WrapperCategory>
                    }
                })
            }
        </Wrapper>
    );
};

ListAllFormationsWithFilter.defaultProps = {}

export default ListAllFormationsWithFilter;
