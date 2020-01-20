import React, { Component, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { selectClass } from '../styles'
import { focusElement, getCursorOffset } from '../utils/dom/element'

const focusSelectAll = element => {
    requestAnimationFrame(() => {
        focusElement.select(element)
    })
}

const handleFocus = e => {
    e.stopPropagation()
}

class FilterInput extends Component {
    constructor(props) {
        super(props)

        this.bindElement = this.bindElement.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handlePaste = this.handlePaste.bind(this)

        // for mutiple select
        this.props.setInputReset(this.reset.bind(this))
    }

    componentDidMount() {
        if (this.props.focus) {
            this.props.onInputFocus()
            this.focus()
        }
    }

    shouldComponentUpdate() {
        return this.props.updatAble
    }

    componentDidUpdate(prevProps) {
        if (this.props.focus === prevProps.focus || !this.props.focus) return
        this.props.onInputFocus()

        this.focus()
    }

    getProcessedValue(text) {
        const { trim } = this.props
        if (!trim && this.lastCursorOffset === 0 && /^\u00A0$/.test(text)) return ''
        return trim ? text.trim() : text.replace(/\u00A0/g, ' ')
    }

    reset() {
        if (this.editElement) this.editElement.innerText = ''
        if (this.blurTimer) clearTimeout(this.blurTimer)
    }

    focus() {
        focusSelectAll(this.editElement)
    }

    bindElement(el) {
        this.editElement = el
    }

    handleInput(e) {
        const text = e.target.innerText.replace('\feff ', '')
        this.lastCursorOffset = getCursorOffset(text.length)
        this.props.onFilter(this.getProcessedValue(text))
    }

    handleBlur(e) {
        const text = e.target.innerText.replace('\feff ', '')
        this.props.onInputBlur(this.getProcessedValue(text))
    }

    handlePaste(e) {
        const text = (e.clipboardData || window.clipboardData).getData('text')
        if (!text) return
        e.preventDefault()
        this.editElement.innerText = text
        focusElement.end(this.editElement)
        this.handleInput({ target: { innerText: text } })
    }

    render() {
        const { text, focus, multiple } = this.props
        const value = typeof text === 'string' ? text.replace(/<\/?[^>]*>/g, '') : text

        if (isValidElement(value)) {
            return cloneElement(value, {
                className: selectClass('input', !focus && 'ellipsis', !multiple && 'full'),
                ref: this.bindElement,
                key: 'input',
                onInput: this.handleInput,
                contentEditable: focus,
            })
        }

        return (
            <span
                key="input"
                className={selectClass('input', !focus && 'ellipsis', !multiple && 'full')}
                ref={this.bindElement}
                contentEditable={focus}
                onInput={this.handleInput}
                onFocus={handleFocus}
                onBlur={this.handleBlur}
                onPaste={this.handlePaste}
                dangerouslySetInnerHTML={{ __html: value }}
            />
        )
    }
}

FilterInput.propTypes = {
    focus: PropTypes.bool.isRequired,
    multiple: PropTypes.bool,
    onFilter: PropTypes.func.isRequired,
    onInputBlur: PropTypes.func.isRequired,
    onInputFocus: PropTypes.func.isRequired,
    updatAble: PropTypes.bool,
    setInputReset: PropTypes.func.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    trim: PropTypes.bool,
}

FilterInput.defaultProps = {
    text: '',
    updatAble: false,
}

export default FilterInput
