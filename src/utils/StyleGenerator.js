import {isNumber} from "./functions";

const generatePadding = (prop, size) => {
    return `
    ${ prop[size].padding.top && prop[size].padding.top !== '0' ?
        `padding-top : ${ prop[size].padding.top }px;`
        : ''}
    
      ${ prop[size].padding.bottom && prop[size].padding.bottom !== '0' ?
        `padding-bottom : ${ prop[size].padding.bottom }px;`
        : ''}
    
      ${ prop[size].padding.left && prop[size].padding.left !== '0' ?
        `padding-left : ${ prop[size].padding.left }px;`
        : ''}
    
      ${ prop[size].padding.right && prop[size].padding.right !== '0' ?
        `padding-right : ${ prop[size].padding.right }px;`
        : ''}
    `
}

const generateMargin = (prop, size) => {
    return `
    ${ prop[size].margin.top && prop[size].margin.top !== '0' ?
        `margin-top : ${ prop[size].margin.top }px;`
        : ''}
    
      ${ prop[size].margin.bottom && prop[size].margin.bottom !== '0' ?
        `margin-bottom : ${ prop[size].margin.bottom }px;`
        : ''}
    
      ${ prop[size].margin.left && prop[size].margin.left !== '0' ?
        `margin-left : ${ prop[size].margin.left }px;`
        : ''}
    
      ${ prop[size].margin.right && prop[size].margin.right !== '0' ?
        `margin-right : ${ prop[size].margin.right }px;`
        : ''}
`
}

const generateSize = (prop, size) => {
    return `
    ${ prop[size].size.width && prop[size].size.width !== '' ?
        `width :${ isNumber(prop[size].size.width)
            ? `${ prop[size].size.width }px`
            : prop[size].size.width };`
        : ''}
    
    ${ prop[size].size.height && prop[size].size.height !== '' ?
        `height :${ isNumber(prop[size].size.height)
            ? `${ prop[size].size.height }px`
            : prop[size].size.height };`
        : ''}
        
    ${ prop[size].size.maxWidth && prop[size].size.maxWidth !== '' ?
        `max-width :${ isNumber(prop[size].size.maxWidth)
            ? `${ prop[size].size.maxWidth }px`
            : prop[size].size.maxWidth };`
        : ''}
        
    ${ prop[size].size.maxHeight && prop[size].size.maxHeight !== '' ?
        `max-height :${ isNumber(prop[size].size.maxHeight)
            ? `${ prop[size].size.maxHeight }px`
            : prop[size].size.maxHeight };`
        : ''}
    `
}

const generateFontProperties = (prop, size) => {
    return `
    ${ prop[size].font.size  ?
        `font-size :${ prop[size].font.size  }px`
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
    
    ${ prop[size].text.align  ?
        `text-align : ${ prop[size].text.align };`
        : ''}
    
    ${ prop[size].text.decoration && prop[size].text.decoration !== ''  ?
        `text-decoration : ${ prop[size].text.decoration };`
        : ''}
        
    ${ prop[size].text.transform && prop[size].text.transform !== ''  ?
        `text-transform : ${ prop[size].text.transform };`
        : ''}
   
    `
}


export {
    generatePadding,
    generateMargin,
    generateSize,
    generateFontProperties
}