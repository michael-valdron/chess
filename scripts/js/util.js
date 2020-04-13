function clone(obj) {
    var copy;
    if (obj == null || typeof obj != "object")
        return obj;

    copy = obj.constructor();

    for (let attr in obj)
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    
    return copy;
}

// ref: https://stackoverflow.com/questions/4994201/is-object-empty
function isEmpty(obj) {
    // Speed up calls to hasOwnProperty
    let hasOwnProperty = Object.prototype.hasOwnProperty;

    if (!obj || obj == null) return true;

    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    if (typeof obj !== "object") return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function capitalize(str) {
    let firstChar = str.charAt(0).toUpperCase();
    let rest = str.substr(1, str.length-1)

    return firstChar + rest;
}