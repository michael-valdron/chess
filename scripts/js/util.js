function clone(obj) {
    var copy;
    if (obj == null || typeof obj != "object")
        return obj;

    copy = obj.constructor();

    for (let attr in obj)
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    
    return copy;
}
