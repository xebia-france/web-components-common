import React, {Component} from 'react';
import {getTextProps, getTemplateProps} from "../../../utils/gettersProperties";
import { ContentBlock} from "./styled";
import {ContainerCommon, TextCommon} from "../../../styles/common.styled";

class InfoBlock extends Component {

    render() {
        const {element, language, data} = this.props;

        if(!data || !data.childMarkdownRemark || !data.childMarkdownRemark.html) return null
        return (
            <ContainerCommon  {...getTemplateProps(element.Template)}>
                <TextCommon {...getTextProps(element.Title)}>
                    {element.Title.content.text ? element.Title.content.text[language] : ''}
                </TextCommon>
                <ContentBlock
                    {...this.props.getContentProps(element)}
                    dangerouslySetInnerHTML={{
                        __html: data && data.childMarkdownRemark ?
                            data.childMarkdownRemark.html
                            : <p></p>
                    }}
                />
            </ContainerCommon>
        )

    }
};

InfoBlock.propTypes = {};

export default InfoBlock;
