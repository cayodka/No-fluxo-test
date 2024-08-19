class EventHandlerRegistry {
    #registry = {}
    #eventCount = 0;

    register(element, eventType, callback) {
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
        const uniqueListener = !element.getAttribute(eventType)
        if(!uniqueListener){
            throw Error("Cannot add two listeners of the same type to an element.");            
        }

        element.setAttribute(eventType, this.#eventCount);
        this.#registry[this.#eventCount] = callback;
        this.#eventCount++;
    }
    getCallback(element, eventType) {
        const isElement = element instanceof Element || element instanceof Document;
        if (!isElement) {
            throw Error("Element must be a DOM Element.");
        }
        const isString = typeof eventType === "string"
        if (!isString) {
            throw Error("EventType must be a string.");
        }

        const registerNumber = element.getAttribute(eventType)
        const callback = this.#registry[registerNumber].callback

        return callback;
    }
    remove(element, eventType){
        const registerNumber = element.getAttribute(eventType)
        delete this.#registry[registerNumber]
    }
}
export default EventHandlerRegistry;