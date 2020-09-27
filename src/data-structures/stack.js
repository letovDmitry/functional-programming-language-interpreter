class Stack {
    buffer = [];
    constructor(...values) {
        this.buffer = [...values]
    }

    push = (...values) => {
        this.buffer.push(...values)
    }

    pop = () => {
        return this.buffer.splice(this.buffer.length - 1, 1)
    }

    get getBuffer() {
        return this.buffer
    }
}