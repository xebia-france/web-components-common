import React, {Component} from 'react';
import {ContainerCommon, ImageContainerCommon, CTACommon} from "../../styles/common.styled";
import {
    Container,
    Header,
    Text,
    Content,
    ImageContainer,
    Main,
    Block,
    Blocks,
    ContentBlock,
    Trainers, Partnership, PartnershipList
} from './styled';
import {getResponsiveKey, removeSpaces, fileNameFromUrl} from "../../utils/functions";
import CardTrainer from './CardTrainer';
import CardPartner from './CardPartner'
import ItemSession from './ItemSession'
import SessionsBlock from './SessionsBlock';
import InsertBlock from './InsertBlock';
import CTA from '../../functional/CTA';

import { getTextProps} from "../../utils/gettersProperties";

class TemplatePageFormation extends Component {
/*
    getTextPropsBySettings = (settings) => {
        return {
            responsive: settings ? settings.responsiveSettings : [],
            typography: settings ? settings.settings.typography : null,
            basis: settings ? settings.settings.basis : null,
            border: settings ? settings.settings.border : null,
            as: settings && settings.settings.seo ? settings.settings.seo.tag : 'p'
        }
    }*/

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

    render() {
        const {fields, assetsDirectory, data, language} = this.props;
        console.log('DATA ON TEMPLATE ------>', data)
        console.log('FIELDS ON TEMPLATE ------>', fields)

        const sessions = data.sessions && data.sessions.value  ? JSON.parse(data.sessions.value) : null;
        console.log('session : ', sessions);

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

        console.log('images', images)

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
            //  Title: fields.TitleMain,
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

        return (
            <Container>
                <Header {...this.getTemplateProps(HeaderSettings.Template)} asset={images}
                        assetsDirectory={assetsDirectory}>
                    <div>
                        <Text {...getTextProps(HeaderSettings.Tagline)}>{data.category[0].name}</Text>
                        <Text {...getTextProps(HeaderSettings.Title)}>{data.name}</Text>
                    </div>
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
                                data.badge && data.badge.length !== 0 ?

                                    data.badge.map(b => {
                                        return <ImageContainerCommon
                                            responsive={Badges.Image.responsiveSettings}
                                            basis={Badges.Image.settings.basis}
                                            border={Badges.Image.settings.border}>
                                            <img alt={`${b.name}`}
                                                 src={`${assetsDirectory || ''}${ fileNameFromUrl(b.image.file.url) }`}/>
                                        </ImageContainerCommon>
                                    })
                                    : null
                            }
                        </ContainerCommon>

                        <SessionsBlock sessions={sessions} settingsSession={Session} settingsPromo={Promo} getContentProps={this.getContentProps}/>

                        <InsertBlock settings={Contact} text={Contact.Title.content.text ? Contact.Title.content.text[language] : ''}>
                            <CTA field={Contact.CTA} language={language}/>
                        </InsertBlock>


                        <CTACommon {...this.getCTAProps(Inscription.CTA)}
                             className={!data.linkInscription ? 'disabled' : ''}
                             href={data.linkInscription || ''}
                             target={'_blank'}
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
                        <Partnership  {...this.getTemplateProps(PartnerSettings.Template)}>
                            <PartnershipList {...this.getTemplateProps(MainSettings.Template)}>
                                {
                                    data.partnership.map(partner => {
                                        return <CardPartner partner={partner} settings={PartnerSettings}
                                                            getContentProps={this.getContentProps}
                                                            assetsDirectory={assetsDirectory}/>
                                    })
                                }
                            </PartnershipList>
                        </Partnership>
                        : null
                }
                <Blocks {...this.getTemplateProps(MainSettings.Template)}>
                    <Block {...this.getTemplateProps(PublicSettings.Template)} >
                        <Text {...getTextProps(PublicSettings.Title)}>
                            {PublicSettings.Title.content.text ? PublicSettings.Title.content.text[language] : ''}
                        </Text>
                        <ContentBlock
                            {...this.getContentProps(PublicSettings)}
                            dangerouslySetInnerHTML={{
                                __html: data.public && data.public.childMarkdownRemark ?
                                    data.public.childMarkdownRemark.html
                                    : <p></p>
                            }}
                        />
                    </Block>
                    <Block {...this.getTemplateProps(Prerequisite.Template)} >
                        <Text {...getTextProps(Prerequisite.Title)}>
                            {Prerequisite.Title.content.text ? Prerequisite.Title.content.text[language] : ''}
                        </Text>
                        <ContentBlock
                            {...this.getContentProps(Prerequisite)}
                            dangerouslySetInnerHTML={{
                                __html: data.prerequis && data.prerequis.childMarkdownRemark ?
                                    data.prerequis.childMarkdownRemark.html
                                    : <p></p>
                            }}
                        />
                    </Block>
                    <Block {...this.getTemplateProps(Goal.Template)} >
                        <Text {...getTextProps(Goal.Title)}>
                            {Goal.Title.content.text ? Goal.Title.content.text[language] : ''}
                        </Text>
                        <ContentBlock
                            {...this.getContentProps(Goal)}
                            dangerouslySetInnerHTML={{
                                __html: data.goal && data.goal.childMarkdownRemark ?
                                    data.goal.childMarkdownRemark.html
                                    : <p></p>
                            }}
                        />
                    </Block>
                    <Block {...this.getTemplateProps(Certification.Template)} >
                        <Text {...getTextProps(Certification.Title)}>
                            {Certification.Title.content.text ? Certification.Title.content.text[language] : ''}
                        </Text>
                        <ContentBlock
                            {...this.getContentProps(Certification)}
                            dangerouslySetInnerHTML={{
                                __html: data.certification && data.certification.childMarkdownRemark ?
                                    data.certification.childMarkdownRemark.html
                                    : <p></p>
                            }}
                        />
                    </Block>
                    {
                        !data.validation ? null :
                            <Block {...this.getTemplateProps(Validation.Template)} >
                                <Text {...getTextProps(Validation.Title)}>
                                    {Validation.Title.content.text ? Validation.Title.content.text[language] : ''}
                                </Text>
                                <ContentBlock
                                    {...this.getContentProps(Validation)}
                                    dangerouslySetInnerHTML={{
                                        __html: data.validation && data.validation.childMarkdownRemark ?
                                            data.validation.childMarkdownRemark.html
                                            : <p></p>
                                    }}
                                />
                            </Block>
                    }
                </Blocks>
                <Trainers  {...this.getTemplateProps(MainSettings.Template)}>
                    {
                        data.trainers && data.trainers.length !== 0 ?
                            <Text {...getTextProps(MainSettings.Heading1)}>
                                {fields['TrainersTitle'].content.text ? fields['TrainersTitle'].content.text[language] : ''}
                            </Text>
                            : null
                    }

                    {
                        data.trainers && data.trainers.length !== 0 ?
                            data.trainers.map(trainer => {
                                return <CardTrainer trainer={trainer} settings={Trainer}
                                                    getContentProps={this.getContentProps}
                                                    assetsDirectory={assetsDirectory}/>
                            })
                            : null
                    }
                </Trainers>
            </Container>
        );
    }
}

TemplatePageFormation.defaultProps = {}

export default TemplatePageFormation;
