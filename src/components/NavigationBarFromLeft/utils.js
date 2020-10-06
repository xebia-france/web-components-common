const getLocalePath = (locales, locale) => {
    if (locales.length > 1) {
        return `/${locale.split('-')[0]}`
    } else {
        return ``
    }
}

const getUrlWithLocale = (locale, currentPath) => {
    let result = currentPath.split('/');
    result.splice(1, 1, locale.split('-')[0]);
    return result.join('/')
}

const getLinkProps = (field) => {
    return {
        responsive: field ? field.responsiveSettings : [],
        typography: field && field.settings.typography ? field.settings.typography : null,
        basis: field && field.settings.basis ? field.settings.basis : null,
        border: field && field.settings.border ? field.settings.border : null,
    }
}

const onTopPage = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < 100) return true;
    return false;
}

const linkIsOpen = () => {
    if (typeof window !== 'undefined' && typeof document !== `undefined`) {
        if (document.querySelector('li.navigation-link.open') !== null) {
            return true
        } else {
            return false;
        }
    }
    return false;
}

const disableScrolling = () => {
    if (typeof window !== 'undefined' && typeof document !== `undefined`) {
        var y = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${y}px`;
    }
}

const enableScrolling = () => {
    if (typeof window !== 'undefined' && typeof document !== `undefined`) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
}

export {
    getLocalePath,
    getLinkProps,
    onTopPage,
    disableScrolling,
    enableScrolling,
    getUrlWithLocale,
    linkIsOpen
}