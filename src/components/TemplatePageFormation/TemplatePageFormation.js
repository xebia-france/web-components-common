import React, {Component} from 'react';
import {ContainerCommon, ImageContainerCommon, CTACommon, TextCommon} from "../../styles/common.styled";
import {
    Container,
    Header,
    Content,
    Main,
    Blocks,
    Trainers,TextHeading,
    PartnershipList, PromotionBanner, ContainerBanner, Contain, ArrowContainer, AdditionalInformation, AdditionalToggle
} from './styled';
import {IconContainer} from "./ItemSession/styled";
import {fileNameFromUrl} from "../../utils/functions";
import CardTrainer from './CardTrainer';
import CardPartner from './CardPartner'
import SessionsBlock from './SessionsBlock';
import InsertBlock from './InsertBlock';
import InfoBlock from './InfoBlock';
import CTA from '../../functional/CTA';
import SvgPromo from '../../assets/svg/SvgPromo'
import SvgArrowCentered from '../../assets/svg/SvgArrowCentered'

import {getTemplateProps, getTextProps, getContentProps} from "../../utils/gettersProperties";
import {generatePictureWebP} from "../../utils/gettersCommonElement";

class TemplatePageFormation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayAdditional: false
        };
    }

    getContentProps = (settings) => {
        return {
            responsive: settings.Content.responsiveSettings,
            typography: settings.Content.settings.typography,
            basis: settings.Content.settings.basis,
            typographyBold: settings.ContentBold ? settings.ContentBold.settings.typography : null,
            basisBold: settings.ContentBold ? settings.ContentBold.settings.basis : null,
            typographyLink: settings.ContentLink ? settings.ContentLink.settings.typography : null,
            basisLink: settings.ContentLink ? settings.ContentLink.settings.basis : null,
            typographyHeading1: settings.Heading1.settings.typography,
            basisHeading1: settings.Heading1.settings.basis,
            typographyHeading2: settings.Heading2.settings.typography,
            basisHeading2: settings.Heading2.settings.basis,
            typographyHeading3: settings.Heading3.settings.typography,
            basisHeading3: settings.Heading3.settings.basis,
        }
    }

    getTemplateProps = (settings) => {
        return {
            responsive: settings ? settings.responsiveSettings : [],
            responsiveContent: settings ? settings.responsiveSettings : [],
            basis: settings && settings.settings ? settings.settings.basis : null,
            border: settings && settings.settings && settings.settings.border ? settings.settings.border : null
        }
    }

    getCTAProps = (settings) => {
        return {
            responsive: settings.responsiveSettings,
            basis: settings.settings.basis,
            typography: settings.settings.typography,
            border: settings.settings.border,
            icon: settings.settings.icon
        }
    }

    promoExist = (schedule) => schedule.filter(session => session.promo.available).length !== 0 ? true : false


    render() {
        const {fields, assetsDirectory, data, language} = this.props;

        if (!data) return null;
        const sessions = data && data.sessions && data.sessions.value ? JSON.parse(data.sessions.value) : null;

        const images = {
            M: {
                fileName: fileNameFromUrl(data.smallImage.file.url)
            },
            T: {
                fileName: fileNameFromUrl(data.image.file.url)
            },
            D: {
                fileName: fileNameFromUrl(data.image.file.url)
            }
        }

        const HeaderSettings = {
            Template: fields.HeaderTemplate,
            Title: fields.HeaderTitle,
            Tagline: fields.HeaderTagline
        }

        const MainSettings = {
            Template: fields.MainTemplate,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.MainContent,
            ContentBold: fields.ContentMainBold,
            ContentLink: fields.ContentMainLink
        }
        const PublicSettings = {
            Template: fields.PublicTemplate,
            Title: fields.PublicTitle,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.PublicContent,
            ContentBold: fields.ContentMainBold
        }
        const Prerequisite = {
            Template: fields.PrerequisiteTemplate,
            Title: fields.PrerequisiteTitle,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.PrerequisiteContent,
            ContentBold: fields.ContentMainBold
        }
        const Goal = {
            Template: fields.GoalTemplate,
            Title: fields.GoalTitle,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.GoalContent,
            ContentBold: fields.ContentMainBold
        }
        const Certification = {
            Template: fields.CertificationTemplate,
            Title: fields.CertificationTitle,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.CertificationContent,
            ContentBold: fields.ContentMainBold
        }
        const Validation = {
            Template: fields.ValidationTemplate,
            Title: fields.ValidationTitle,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.ValidationContent,
            ContentBold: fields.ContentMainBold
        }

        const Trainer = {
            Title: fields.TrainerTitle,
            Image: fields.TrainerImage,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.MainContent,
            ContentBold: fields.ContentMainBold,
            ContentLink: fields.ContentMainLink
        }
        const Badges = {
            Template: fields.BadgeTemplate,
            Image: fields.BadgeImage
        }

        const Contact = {
            Template: fields.ContactTemplate,
            Title: fields.ContactTitle,
            CTA: fields.ContactCTA
        }

        const Session = {
            Template: fields.SessionTemplate,
            Title: fields.SessionTitle,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.SessionContent,
            ContentBold: fields.ContentMainBold,
            ContentLink: fields.ContentMainLink
        }
        const Promo = {
            Template: fields.PromoTemplate,
            Title: fields.PromoTitle,
            Tagline: fields.PromoTagline
        }
        const Inscription = {
            CTA: fields.InscriptionCTA
        }


        const PartnerSettings = {
            Template: fields.PartnerTemplate,
            Title: fields.PartnerTitle,
            Image: fields.PartnerImage,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.MainContent,
            ContentBold: fields.ContentMainBold,
            ContentLink: fields.ContentMainLink

        }


        const AdditionalInfoSettings = {
            Template: fields.AdditionalInfoTemplate,
            TemplateSubBlock: fields.AdditionalInfoSubBlockTemplate,
            Title: fields.AdditionalInfoTitle,
            Heading1: fields.MainHeading1,
            Heading2: fields.MainHeading2,
            Heading3: fields.MainHeading3,
            Content: fields.MainContent,
            ContentBold: fields.ContentMainBold,
            ContentLink: fields.ContentMainLink

        }
        return (
            <Container>
                <Header {...this.getTemplateProps(HeaderSettings.Template)} asset={images}
                        assetsDirectory={assetsDirectory}>
                    {
                        sessions && this.promoExist(sessions.schedule) ?
                            <ContainerBanner {...this.getTemplateProps(MainSettings.Template)}
                                             basisHeader={HeaderSettings.Template.settings.basis}>
                                <PromotionBanner  {...getTemplateProps(Promo.Template)} >
                                    <TextCommon {...getTextProps(Promo.Title)} >Promotion</TextCommon>
                                    <IconContainer
                                        responsive={Promo.Title ? Promo.Title.responsiveSettings : []}
                                        typography={Promo.Title && Promo.Title.settings ? Promo.Title.settings.typography : null}>
                                        <SvgPromo/>
                                    </IconContainer>
                                </PromotionBanner>

                            </ContainerBanner>
                            : null
                    }
                    <Contain>

                        <TextHeading {...getTextProps(HeaderSettings.Tagline)}>{data.category[0].name}</TextHeading>
                        <TextHeading {...getTextProps(HeaderSettings.Title)}>{data.name}</TextHeading>
                    </Contain>


                </Header>


                <Main {...this.getTemplateProps(MainSettings.Template)}>
                    <div>
                        <Content {...this.getContentProps(MainSettings)}
                                 dangerouslySetInnerHTML={{
                                     __html: data.presentation && data.presentation.childMarkdownRemark ?
                                         data.presentation.childMarkdownRemark.html
                                         : <p></p>
                                 }}
                        />

                    </div>
                    <div>
                        <ContainerCommon {...this.getTemplateProps(Badges.Template)}>

                            {
                                data.badge && data.badge.length !== 0 ? data.badge.map(b => {
                                    return <ImageContainerCommon
                                        responsive={Badges.Image.responsiveSettings}
                                        basis={Badges.Image.settings.basis}
                                        border={Badges.Image.settings.border}>
                                        {generatePictureWebP(`${assetsDirectory || ''}${ fileNameFromUrl(b.image.file.url) }`, `${b.name}`)}
                                    </ImageContainerCommon>
                                }) : null
                            }
                        </ContainerCommon>

                        <SessionsBlock sessions={sessions} settingsSession={Session} settingsPromo={Promo}
                                       getContentProps={this.getContentProps}/>

                        <InsertBlock settings={Contact}
                                     text={Contact.Title.content.text ? Contact.Title.content.text[language] : ''}>
                            <CTA field={Contact.CTA} language={language}/>
                        </InsertBlock>


                        <CTACommon {...this.getCTAProps(Inscription.CTA)}
                                   className={!data.linkInscription ? 'disabled' : ''}
                                   href={data.linkInscription || ''}
                                   target={'_blank'}
                                   rel={'noopener'}
                                   onClick={(e) => {
                                       if (!data.linkInscription) e.preventDefault();
                                   }}
                        >
                            {
                                Inscription.CTA.content.icon && Inscription.CTA.content.icon[language] ?
                                    <i>{Inscription.CTA.content.icon[language]}</i>
                                    : null
                            }
                            <p> {Inscription.CTA.content.text ? Inscription.CTA.content.text[language] : ''}</p>
                        </CTACommon>
                    </div>
                </Main>
                {
                    data.partnership && data.partnership.length !== 0 ?
                        <ContainerCommon  {...this.getTemplateProps(PartnerSettings.Template)}>
                            <PartnershipList {...this.getTemplateProps(MainSettings.Template)}>
                                {
                                    data.partnership.map(partner => {
                                        return <CardPartner partner={partner} settings={PartnerSettings}
                                                            getContentProps={this.getContentProps}
                                                            assetsDirectory={assetsDirectory}/>
                                    })
                                }
                            </PartnershipList>
                        </ContainerCommon>
                        : null
                }
                <Blocks {...this.getTemplateProps(MainSettings.Template)}>
                    <InfoBlock element={PublicSettings} language={language} data={data.public}
                               getContentProps={this.getContentProps}/>
                    <InfoBlock element={Prerequisite} language={language} data={data.prerequis}
                               getContentProps={this.getContentProps}/>
                    <InfoBlock element={Goal} language={language} data={data.goal}
                               getContentProps={this.getContentProps}/>
                    <InfoBlock element={Certification} language={language} data={data.certification}
                               getContentProps={this.getContentProps}/>
                    <InfoBlock element={Validation} language={language} data={data.validation}
                               getContentProps={this.getContentProps}/>

                    {
                        data.additionalInformation && data.additionalInformation.childMarkdownRemark ?
                            <>
                                <AdditionalToggle  {...this.getTemplateProps(AdditionalInfoSettings.Template)}
                                                   onClick={() => {  this.setState(prevState => ({
                                                       displayAdditional: !prevState.displayAdditional
                                                   })); }}
                                                   displayAdditional={this.state.displayAdditional}
                                >
                                    <TextCommon {...getTextProps(AdditionalInfoSettings.Title)}>
                                        {fields['AdditionalInfoTitle'].content.text ? fields['AdditionalInfoTitle'].content.text[language] : ''}
                                    </TextCommon>
                                    <ArrowContainer {...getContentProps(AdditionalInfoSettings.Title)}><SvgArrowCentered/></ArrowContainer>



                                </AdditionalToggle>
                                <AdditionalInformation displayAdditional={this.state.displayAdditional}  {...this.getTemplateProps(AdditionalInfoSettings.TemplateSubBlock)}>
                                    <Content {...this.getContentProps(AdditionalInfoSettings)}
                                             dangerouslySetInnerHTML={{
                                                 __html: data.additionalInformation && data.additionalInformation.childMarkdownRemark ?
                                                     data.additionalInformation.childMarkdownRemark.html
                                                     : <p></p>
                                             }}
                                    />
                                </AdditionalInformation>
                            </>
                            : null
                    }
                </Blocks>

                {
                    data.trainers && data.trainers.length !== 0 ?
                        <Trainers  {...this.getTemplateProps(MainSettings.Template)}>
                            <TextCommon {...getTextProps(MainSettings.Heading2)}>
                                {fields['TrainersTitle'].content.text ? fields['TrainersTitle'].content.text[language] : ''}
                            </TextCommon>
                            {
                                data.trainers.map(trainer => {
                                    return <CardTrainer trainer={trainer} settings={Trainer}
                                                        getContentProps={this.getContentProps}
                                                        assetsDirectory={assetsDirectory}/>
                                })
                            }
                        </Trainers>
                        : null
                }
            </Container>
        );
    }
}

TemplatePageFormation.defaultProps = {}

export default TemplatePageFormation;
