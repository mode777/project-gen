export function template(template: string) {
    return (constructor: Function) => {
        constructor["template"] = template;
    };
}

export function css(css: string) {
    return (constructor: Function) => {
        constructor["css"] = css;
    };
}
