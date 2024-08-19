class ElementManager {
    constructor(eventHandlerRegistry) {
        this.eventHandlerRegistry = eventHandlerRegistry;
    }
    addClasses(element, classNames) {
        const classNamesValid = Array.isArray(classNames) && classNames.every(item => typeof item === "string");
        if (!classNamesValid) {
            throw Error("classNames must be an array filled with strings.");
        }
        element.classList.add(...classNames.filter(name => !!name));
    }
    setValue(element, value) {
        if (typeof value !== "string") {
            throw Error("Value must be a string.");
        }
        element.value = value;
    }
    setTextContent(element, textContent) {
        if (typeof textContent !== "string" && typeof textContent !== "number") {
            throw Error("textContent must be a string.");
        }
        element.appendChild(document.createTextNode(textContent));
    }
    appendToParent(element, parent) {
        const parentIsElement = parent instanceof Element || parent instanceof Document;
        const parentIsString = typeof parent === "string" && parent.length > 0;
        if (!parentIsElement && !parentIsString) {
            throw Error("Parent must be either of string type or a DOM Element.");
        }
        parentIsElement && parent.appendChild(element)
        parentIsString && this.get(parent).appendChild(element)
    }
    create(tagName, classNames = [], value = "", textContent = "", parent = "") {
        if (typeof tagName !== "string") {
            throw Error("Tagname must be a string.");
        }
        const createdElement = document.createElement(tagName);
        this.addClasses(createdElement, classNames);
        this.setValue(createdElement, value);
        this.setTextContent(createdElement, textContent);
        this.appendToParent(createdElement, parent);
        return createdElement;
    }
    get(cssSelector) {
        if (typeof cssSelector != "string") {
            throw Error("The CSS selector must be of string type or else it won't work")
        }
        const caughtElement = document.querySelector(cssSelector);
        if (!caughtElement) {
            throw Error(`You tried to get the element "${cssSelector}" but it didn't work. `);
        }
        return caughtElement
    }
    #getEvents(element) {
        const isElement = element instanceof Element || element instanceof Document;
        if (!isElement) {
            throw Error("Element must be a DOM Element.");
        }
        const click = element.getAttribute("click")
        const input = element.getAttribute("input")
        const events = []
        click && events.push(click)
        input && events.push(input)
        return events;
    }
    addEvent(element, eventType, callback) {
        const isElement = element instanceof Element || element instanceof Document;
        if (!isElement) {
            throw Error("Element must be a DOM Element.");
        }
        const isString = typeof eventType === "string"
        if (!isString) {
            throw Error("EventType must be a string.");
        }
        const isFunction = callback instanceof Function;
        if (!isFunction) {
            throw Error("Callback must be a function.");
        }
        element.addEventListener(eventType, callback)
        this.eventHandlerRegistry.register(element, eventType, callback)
    }
    removeEvent(element, eventType) {
        const isElement = element instanceof Element || element instanceof Document;
        if (!isElement) {
            throw Error("Element must be a DOM Element.");
        }
        const isString = typeof eventType === "string"
        if (!isString) {
            throw Error("EventType must be a string.");
        }
        const hasEvent = !!element.getAttribute(eventType)
        if (!hasEvent) {
            return
        }
        const callback = this.eventHandlerRegistry.getCallback(element, eventType)
        element.removeEventListener(eventType, callback)
        this.eventHandlerRegistry.remove(element, eventType)
        element.removeAttribute(eventType)
    }
    deleteHierarchy(element) {
        if (element.nodeType === 1) {
            const events = this.#getEvents(element)
            events.forEach(event => this.removeEvent(element, event))
        }
        element.childNodes.forEach(node => this.deleteHierarchy(node))
        element.remove()
    }
    deleteChildren(element) {
        element.childNodes.forEach(node => this.deleteHierarchy(node))
    }
}
export default ElementManager;