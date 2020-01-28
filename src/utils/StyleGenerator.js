import {isNumber} from "./functions";

const generatePadding = (prop, size) => {
    return `
    ${ prop[size].padding && prop[size].padding.top && prop[size].padding.top !== '0' ?
        `padding-top : ${ prop[size].padding.top }px;`
        : ''}
    
      ${ prop[size].padding && prop[size].padding.bottom && prop[size].padding.bottom !== '0' ?
        `padding-bottom : ${ prop[size].padding.bottom }px;`
        : ''}
    
      ${ prop[size].padding && prop[size].padding.left && prop[size].padding.left !== '0' ?
        `padding-left : ${ prop[size].padding.left }px;`
        : ''}
    
      ${ prop[size].padding && prop[size].padding.right && prop[size].padding.right !== '0' ?
        `padding-right : ${ prop[size].padding.right }px;`
        : ''}
    `
}

const generateMargin = (prop, size) => {
    return `
    ${ prop[size].margin &&  prop[size].margin.top && prop[size].margin.top !== '0' ?
        `margin-top : ${ prop[size].margin.top }px;`
        : ''}
    
      ${ prop[size].margin && prop[size].margin.bottom && prop[size].margin.bottom !== '0' ?
        `margin-bottom : ${ prop[size].margin.bottom }px;`
        : ''}
    
      ${ prop[size].margin && prop[size].margin.left && prop[size].margin.left !== '0' ?
        `margin-left : ${ prop[size].margin.left }px;`
        : ''}
    
      ${ prop[size].margin && prop[size].margin.right && prop[size].margin.right !== '0' ?
        `margin-right : ${ prop[size].margin.right }px;`
        : ''}
`
}

const generateSize = (prop, size) => {
    return `
    ${prop[size].size &&  prop[size].size.width && prop[size].size.width !== '' ?
        `width :${ isNumber(prop[size].size.width)
            ? `${ prop[size].size.width }px;`
            : prop[size].size.width };`
        : ''}
    
    ${ prop[size].size && prop[size].size.height && prop[size].size.height !== '' ?
        `height :${ isNumber(prop[size].size.height)
            ? `${ prop[size].size.height }px;`
            : prop[size].size.height };`
        : ''}
        
    ${ prop[size].size && prop[size].size.maxWidth && prop[size].size.maxWidth !== '' ?
        `max-width :${ isNumber(prop[size].size.maxWidth)
            ? `${ prop[size].size.maxWidth }px;`
            : prop[size].size.maxWidth };`
        : ''}
        
    ${ prop[size].size && prop[size].size.maxHeight && prop[size].size.maxHeight !== '' ?
        `max-height :${ isNumber(prop[size].size.maxHeight)
            ? `${ prop[size].size.maxHeight }px;`
            : prop[size].size.maxHeight };`
        : ''}
        
    ${ prop[size].size && prop[size].size.minWidth && prop[size].size.minWidth !== '' ?
        `min-width :${ isNumber(prop[size].size.minWidth)
            ? `${ prop[size].size.minWidth }px;`
            : prop[size].size.minWidth };`
        : ''}
        
    ${ prop[size].size && prop[size].size.minHeight && prop[size].size.minHeight !== '' ?
        `min-height :${ isNumber(prop[size].size.minHeight)
            ? `${ prop[size].size.minHeight }px;`
            : prop[size].size.minHeight };`
        : ''}
    `
}

const generateFontProperties = (prop, size) => {
    return `
    ${ prop[size].font.size  ?
        `font-size :${ prop[size].font.size  }px;`
        : ''}
    
    ${ prop[size].font.family  ?
        `font-family :'${ prop[size].font.family }', ${prop[size].font.typeface };`
        : ''}
    
    ${ prop[size].font.style &&  prop[size].font.style !==  ''  ?
        `font-style : ${ prop[size].font.style };`
        : ''}
        
    ${ prop[size].font.weight && prop[size].font.weight[1]  ?
        `font-weight : ${ prop[size].font.weight[1] };`
        : ''}
        
    ${ prop[size].font.letterSpacing && prop[size].font.letterSpacing !== '0'  ?
        `letter-spacing : ${ prop[size].font.letterSpacing }px;`
        : ''}
    
    ${ prop[size].font.lineHeight  ?
        `line-height : ${ prop[size].font.lineHeight }px;`
        : ''}
    
    ${ prop[size].text && prop[size].text.align  ?
        `text-align : ${ prop[size].text.align };`
        : ''}
    
    ${ prop[size].text && prop[size].text.decoration && prop[size].text.decoration !== ''  ?
        `text-decoration : ${ prop[size].text.decoration };`
        : ''}
        
    ${ prop[size].text && prop[size].text.transform && prop[size].text.transform !== ''  ?
        `text-transform : ${ prop[size].text.transform };`
        : ''}
    `
}


const generateBorder = (prop, size) => {
    return `
    border-style : solid;
    ${ prop[size].width.top && prop[size].width.top !== '0'  ?
        `border-top-width :${ isNumber(prop[size].width.top)
            ? `${ prop[size].width.top }px;`
            : `${ prop[size].width.top };`}`
     : ''}
     
    ${ prop[size].width.right && prop[size].width.right !== '0'  ?
        `border-right-width :${ isNumber(prop[size].width.right)
            ? `${ prop[size].width.right }px;`
            : `${ prop[size].width.right };`}`
     : ''}
     
    ${ prop[size].width.bottom && prop[size].width.bottom !== '0'  ?
        `border-bottom-width :${ isNumber(prop[size].width.bottom)
            ? `${ prop[size].width.bottom }px;`
            : `${ prop[size].width.bottom };`}`
     : ''}
     
    ${ prop[size].width.left && prop[size].width.left !== '0'  ?
        `border-left-width :${ isNumber(prop[size].width.left)
            ? `${ prop[size].width.left }px;`
            : `${ prop[size].width.left };`}`
     : ''}
     
    ${ prop[size].radius.topLeft && prop[size].radius.topLeft !== '0'  ?
        `border-top-left-radius :${ isNumber(prop[size].radius.topLeft)
            ? `${ prop[size].radius.topLeft }px;`
            : `${ prop[size].radius.topLeft };`}`
     : ''}
     
    ${ prop[size].radius.topRight && prop[size].radius.topRight !== '0'  ?
        `border-top-right-radius :${ isNumber(prop[size].radius.topRight)
            ? `${ prop[size].radius.topRight }px;`
            : `${ prop[size].radius.topRight };`}`
     : ''}
     
    ${ prop[size].radius.bottomRight && prop[size].radius.bottomRight !== '0'  ?
        `border-bottom-right-radius :${ isNumber(prop[size].radius.bottomRight)
            ? `${ prop[size].radius.bottomRight }px;`
            : `${ prop[size].radius.bottomRight };`}`
     : ''}
     
    ${ prop[size].radius.bottomLeft && prop[size].radius.bottomLeft !== '0'  ?
        `border-bottom-left-radius :${ isNumber(prop[size].radius.bottomLeft)
            ? `${ prop[size].radius.bottomLeft }px;`
            : `${ prop[size].radius.bottomLeft };`}`
     : ''}
       
    `
}

const generateBackgroundImage = (prop, size, assetsDirectory) => {
    return `
    ${ prop[size].fileName ? `
            background-image : url('${  `${assetsDirectory  || ''}${  prop[size].fileName }`}');
            background-size : cover;
            background-position : center;
            
            ` : ''}
    `
}

const getFormatedColor = (color, opacity) => {
    if( color.hex === 'transparent'){
        return color.hex
    }else{
        return  `rgba(${color.rgb},${opacity.value})`
    }
}

const getFormatedSizeProperty = (property, value) => {
    const camelProperty = toCamel(property);
    return `
        ${value[camelProperty] && value[camelProperty] !== '' ?
                `${property} :${ isNumber(value[camelProperty])
                    ? `${ value[camelProperty] }px;`
                    : value[camelProperty] };`
                : ''}
    `
}

const toCamel = (s) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};

export {
    generatePadding,
    generateMargin,
    generateSize,
    generateFontProperties,
    generateBorder,
    generateBackgroundImage,
    getFormatedColor,
    getFormatedSizeProperty
}