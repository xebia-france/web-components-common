import styled from 'styled-components';
import { device } from '../../styles/constants';
import { isNumber } from '../../utils/functions';

export const ImageCorner = styled.div.attrs(props => ({
    responsive: props.responsive,
    size: props.size
}))`
    position : absolute;
    z-index : 0;
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            width:${ isNumber(props.size[size].width)
        ? `${ props.size[size].width }px`
        : props.size[size].width || '20%' };
            height:${ isNumber(props.size[size].height)
        ? `${ props.size[size].height }px`
        : props.size[size].height || 'auto' };
            max-width: ${ isNumber(props.size[size].maxWidth)
        ? `${ props.size[size].maxWidth }px`
        : props.size[size].maxWidth || '' };
            max-height:${ isNumber(props.size[size].maxHeight)
        ? `${ props.size[size].maxHeight }px`
        : props.size[size].maxHeight || '' };
         }`) }; 
         
   &>img{
        width : 100%; 
   }     
`;

export const Container = styled.div.attrs(props => ({
    responsive: props.responsive,
    color: props.color

}))`
   width : 100%;
   height : 100vh;
   position:relative;
   display : flex;
   flex-direction : column;
   align-items : center;
   justify-content  : center;
   
   & ${ ImageCorner }{
       &:nth-child(1){
           top : 0;
           left: 0;
       }
       &:nth-child(2){
           top : 0;
           right: 0;
       }
       &:nth-child(3){
           bottom : 0;
           left: 0;
       }
       &:nth-child(4){
           bottom : 0;
           right: 0;
       }
   }
   
   ${ props => props.responsive.map((size, i) => `
         @media ${ device[size] } {
             background-color:${ props.color[size].hex };
         }`)
}; 
`;

export const Text = styled.p.attrs(props => ({
    responsive: props.responsive,
    opacity: props.opacity,
    color: props.color,
    font: props.font,
    text: props.text

}))`
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            opacity:${ props.opacity[size].value };
            color:${ props.color[size].hex };
            font-size:${ props.font[size].size }px;
            font-family : '${ props.font[size].family }' };
            font-style: ${ props.font[size].style || '' };
            font-weight: ${ props.font[size].weight[1] };
            letter-spacing: ${ props.font[size].letterSpacing }px;
            line-height: ${ props.font[size].lineHeight }px;
            text-align: ${ props.text[size].align };
            text-decoration: ${ props.text[size].decoration || '' };
            text-transform: ${ props.text[size].transform || '' };
         }`)
};
`;

export const Title = styled(Text)`
    padding : 0;
    margin : 0;
    z-index : 2;
`;
export const Tagline = styled(Text)`
    padding : 0;
    margin : 0;
    z-index : 2;
`;

export const Logo = styled.div.attrs(props => ({
    responsive: props.responsive,
    responsiveContent: props.responsiveContent,
    size: props.size,
    padding: props.padding

}))`
    background-size : 100% auto;
    background-repeat: no-repeat;
    z-index : 2;
    
   ${ props => props.responsive.map(size => `
         @media ${ device[size] } {
            width:${ isNumber(props.size[size].width)
        ? `${ props.size[size].width }px`
        : props.size[size].width || '200px' };
            height:${ isNumber(props.size[size].height)
        ? `${ props.size[size].height }px`
        : props.size[size].height || '200px' };
            max-width: ${ isNumber(props.size[size].maxWidth)
        ? `${ props.size[size].maxWidth }px`
        : props.size[size].maxWidth || '' };
            max-height:${ isNumber(props.size[size].maxHeight)
        ? `${ props.size[size].maxHeight }px`
        : props.size[size].maxHeight || '' };
            padding-top: ${ props.padding[size].top || '' }px ;
            padding-right: ${ props.padding[size].right || '' }px ;
            padding-bottom: ${ props.padding[size].bottom || '' }px ;
            padding-left: ${ props.padding[size].left || '' }px ;
         }`)
    }; 
        
  ${ props => props.responsiveContent.map((size, i) => `
         @media ${ device[size] } {
            background-image : url('${ props.asset[size].fields ? props.asset[size].fields.file[Object.keys(props.asset[size].fields.file)[0]].url : '' }');
         }`)
    };             
`;
