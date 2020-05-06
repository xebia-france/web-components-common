import React, {Component} from 'react';
import { InsertBox} from "./styled";
import {getTextProps, getTemplateProps} from "../../../utils/gettersProperties";
import {TextCommon} from "../../../styles/common.styled";

class InsertBlock extends Component {
    render(){
        const {settings, text, children} = this.props;
        return(
            <InsertBox {...getTemplateProps(settings.Template)}>
                <div>
                    <TextCommon {...getTextProps(settings.Title)}>
                        {text}
                    </TextCommon>
                </div>
                <div>
                    { children}
                </div>
            </InsertBox>
        )
    }
}

InsertBlock.propTypes = {};

export default InsertBlock;
